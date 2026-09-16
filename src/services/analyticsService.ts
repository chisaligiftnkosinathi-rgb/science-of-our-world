import { AnalyticsEvent, storage } from "./storage";

export const TELEMETRY_EVENTS = {
  SESSION_STARTED: "SESSION_STARTED",
  LESSON_STARTED: "LESSON_STARTED",
  LESSON_COMPLETED: "LESSON_COMPLETED",
  MASTERY_ACHIEVED: "MASTERY_ACHIEVED",
  QUIZ_ATTEMPTED: "QUIZ_ATTEMPTED",
  EXPERIMENT_COMPLETED: "EXPERIMENT_COMPLETED",
  LAB_OPENED: "LAB_OPENED",
  DETECTIVE_CASE_COMPLETED: "DETECTIVE_CASE_COMPLETED",
  CAPSTONE_COMPLETED: "CAPSTONE_COMPLETED",
  TERMS_ACCEPTED: "TERMS_ACCEPTED",
} as const;

class EducationalAnalyticsService {
  private events: AnalyticsEvent[] = [];

  constructor() {
    this.loadLocalEvents();
  }

  private loadLocalEvents() {
    try {
      const stored = localStorage.getItem("nexus_science_analytics_v1");
      if (stored) {
        this.events = JSON.parse(stored);
      }
    } catch {
      this.events = [];
    }
  }

  private saveLocalEvents() {
    try {
      if (this.events.length > 200) {
        this.events = this.events.slice(-200);
      }
      localStorage.setItem("nexus_science_analytics_v1", JSON.stringify(this.events));
    } catch {
      // Storage quota fallback
    }
  }

  public async trackEvent(
    eventType: AnalyticsEvent["eventType"],
    moduleId?: string,
    metadata?: Record<string, any>
  ): Promise<AnalyticsEvent> {
    const profile = await storage.getProfile();
    const event: AnalyticsEvent = {
      id: "evt_" + Math.random().toString(36).substring(2, 9),
      installationId: profile.installationId || "inst_anonymous",
      eventType,
      moduleId,
      metadata: {
        gradeLevel: profile.gradeLevel,
        accountMode: profile.accountMode || "guest",
        language: profile.language,
        ...metadata,
      },
      timestamp: new Date().toISOString(),
    };

    this.events.push(event);
    this.saveLocalEvents();
    return event;
  }

  public getEventsSummary() {
    const totalEvents = this.events.length;
    const lessonsCompletedCount = this.events.filter(
      (e) => e.eventType === "LESSON_COMPLETED" || e.eventType === "MASTERY_ACHIEVED"
    ).length;
    const quizzesCount = this.events.filter((e) => e.eventType === "QUIZ_ATTEMPTED").length;
    const experimentsCount = this.events.filter((e) => e.eventType === "EXPERIMENT_COMPLETED").length;

    return {
      totalEvents,
      lessonsCompletedCount,
      quizzesCount,
      experimentsCount,
      events: [...this.events],
    };
  }
}

export const analyticsService = new EducationalAnalyticsService();
