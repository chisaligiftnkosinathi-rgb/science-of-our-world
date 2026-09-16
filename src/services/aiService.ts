import { CreateWebWorkerMLCEngine, InitProgressReport, MLCEngineInterface } from "@mlc-ai/web-llm";

// We use Qwen2 0.5B because it's small (~400MB) and very fast to load for testing
export const DEFAULT_MODEL = "Qwen2-0.5B-Instruct-q4f16_1-MLC";

class AIService {
  private engine: MLCEngineInterface | null = null;
  private isInitializing = false;

  /**
   * Initializes the WebLLM Engine in a Web Worker
   */
  public async initEngine(
    onProgress?: (progress: InitProgressReport) => void
  ): Promise<void> {
    if (this.engine || this.isInitializing) return;
    this.isInitializing = true;

    try {
      // Create the worker
      const worker = new Worker(new URL("./aiWorker.ts", import.meta.url), {
        type: "module",
      });

      // Create and initialize the engine
      this.engine = await CreateWebWorkerMLCEngine(
        worker,
        DEFAULT_MODEL,
        {
          initProgressCallback: onProgress,
        }
      );
    } catch (error) {
      console.error("Failed to initialize WebLLM engine", error);
      this.engine = null;
    } finally {
      this.isInitializing = false;
    }
  }

  /**
   * Generates a chat completion
   */
  public async chat(
    messages: { role: "system" | "user" | "assistant"; content: string }[],
    onUpdate?: (text: string) => void
  ): Promise<string> {
    if (!this.engine) {
      throw new Error("AI Engine not initialized");
    }

    try {
      const chunks = await this.engine.chat.completions.create({
        messages,
        temperature: 0.7,
        stream: true,
      });

      let reply = "";
      for await (const chunk of chunks) {
        const delta = chunk.choices[0]?.delta.content || "";
        reply += delta;
        if (onUpdate) {
          onUpdate(reply);
        }
      }
      
      const fullReply = await this.engine.getMessage();
      return fullReply;
    } catch (error) {
      console.error("Chat completion failed", error);
      throw error;
    }
  }
}

export const aiService = new AIService();
