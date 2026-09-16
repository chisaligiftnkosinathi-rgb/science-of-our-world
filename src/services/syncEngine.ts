import { storage, SyncQueueItem, LearnerProfile } from "./storage";
import { mergeMonotonicMastery, mergeIdempotentEvents } from "../utils/progressionEngine";
import { analyticsService } from "./analyticsService";
import { supabase } from "./supabaseClient";

export interface CloudSyncResult {
  success: boolean;
  mergedCompletedCount: number;
  syncedQueueCount: number;
  timestamp: string;
}

class LocalCloudSyncEngine {
  private isSyncing = false;

  /**
   * Queue an idempotent progress change for cloud synchronization.
   */
  public async queueEvent(
    action: SyncQueueItem["action"],
    payload: any
  ): Promise<SyncQueueItem> {
    const item: SyncQueueItem = {
      id: "sync_" + Math.random().toString(36).substring(2, 9),
      action,
      payload,
      timestamp: Date.now(),
      synced: false,
    };

    await storage.addToSyncQueue(action, payload);
    return item;
  }

  /**
   * Synchronize local IndexedDB state with cloud remote state.
   * Uses Monotonic Mastery Merge: MASTERED state is irreversible and never downgraded.
   */
  public async performSync(remoteCompletedModules: string[] = []): Promise<CloudSyncResult> {
    if (this.isSyncing) {
      return {
        success: false,
        mergedCompletedCount: 0,
        syncedQueueCount: 0,
        timestamp: new Date().toISOString(),
      };
    }

    this.isSyncing = true;
    try {
      const localCompleted = await storage.getCompletedModules();
      const mergedCompleted = mergeMonotonicMastery(localCompleted, remoteCompletedModules);

      // Persist merged monotonic mastery locally
      for (const modId of mergedCompleted) {
        if (!localCompleted.includes(modId)) {
          await storage.markModuleComplete(modId);
        }
      }

      const pendingCount = await storage.getPendingSyncCount();
      await analyticsService.trackEvent("SESSION_STARTED", undefined, {
        syncExecuted: true,
        mergedCompletedCount: mergedCompleted.length,
      });

      this.isSyncing = false;
      return {
        success: true,
        mergedCompletedCount: mergedCompleted.length,
        syncedQueueCount: pendingCount,
        timestamp: new Date().toISOString(),
      };
    } catch (e) {
      console.error("LocalCloudSyncEngine error:", e);
      this.isSyncing = false;
      return {
        success: false,
        mergedCompletedCount: 0,
        syncedQueueCount: 0,
        timestamp: new Date().toISOString(),
      };
    }
  }

  /**
   * Perform live Cloud Synchronisation with Supabase PostgreSQL database.
   * Enforces Monotonic Mastery Merge: MASTERED + anything -> MASTERED
   */
  public async syncWithSupabaseCloud(childId: string): Promise<CloudSyncResult> {
    if (!supabase || !childId) {
      return this.performSync([]);
    }

    try {
      // 1. Fetch remote learner_progress rows from Supabase
      const { data: remoteRows, error: fetchErr } = await supabase
        .from("learner_progress")
        .select("module_id, state")
        .eq("learner_id", childId);

      if (fetchErr) {
        console.warn("Could not fetch remote progress:", fetchErr.message);
      }

      const remoteCompleted = (remoteRows || [])
        .filter((r) => r.state === "MASTERED")
        .map((r) => r.module_id);

      // 2. Perform Monotonic Mastery Merge
      const localCompleted = await storage.getCompletedModules();
      const mergedCompleted = mergeMonotonicMastery(localCompleted, remoteCompleted);

      // 3. Update local IndexedDB with merged state
      for (const modId of mergedCompleted) {
        if (!localCompleted.includes(modId)) {
          await storage.markModuleComplete(modId);
        }
      }

      // 4. Upsert merged state back to Supabase PostgreSQL table
      const upsertRows = mergedCompleted.map((modId) => ({
        learner_id: childId,
        module_id: modId,
        state: "MASTERED",
        mastery_at: new Date().toISOString(),
      }));

      if (upsertRows.length > 0) {
        const { error: upsertErr } = await supabase
          .from("learner_progress")
          .upsert(upsertRows, { onConflict: "learner_id,module_id" });

        if (upsertErr) {
          console.warn("Could not upsert progress to Supabase:", upsertErr.message);
        }
      }

      return {
        success: true,
        mergedCompletedCount: mergedCompleted.length,
        syncedQueueCount: 0,
        timestamp: new Date().toISOString(),
      };
    } catch (e) {
      console.error("syncWithSupabaseCloud error:", e);
      return this.performSync([]);
    }
  }

  /**
   * Local Data Purge / Cloud Deletion Workflow Stub.
   * Wipes local IndexedDB database stores, offline queues, and resets local device installation identity.
   * Note: In Stage 1.5-B, this method sends POST /api/account/delete to trigger authenticated PostgreSQL purge.
   */
  public async purgeAllAccountData(): Promise<boolean> {
    try {
      // 1. Wipe IndexedDB database stores
      await storage.clearAllData();

      // 2. Clear local storage keys
      if (typeof window !== "undefined") {
        localStorage.removeItem("nexus_science_analytics_v1");
        localStorage.removeItem("science_of_our_world_data_v2");
      }

      // 3. Reset installation identity & learner profile
      await storage.getProfile(); // Re-initializes fresh DEFAULT_LEARNER_PROFILE

      return true;
    } catch (e) {
      console.error("Failed to purge account data:", e);
      return false;
    }
  }
}

export const syncEngine = new LocalCloudSyncEngine();
