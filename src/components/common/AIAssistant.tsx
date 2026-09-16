import React, { useState, useEffect, useRef } from "react";
import { aiService } from "../../services/aiService";
import { MessageSquare, X, Send, Loader2, Bot, User } from "lucide-react";
import { InitProgressReport } from "@mlc-ai/web-llm";

interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [progress, setProgress] = useState<InitProgressReport | null>(null);
  
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I am your local Science AI. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && !isReady && !isInitializing) {
      initAI();
    }
  }, [isOpen]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const initAI = async () => {
    setIsInitializing(true);
    try {
      await aiService.initEngine((report) => {
        setProgress(report);
      });
      setIsReady(true);
    } catch (e) {
      console.error("AI init failed", e);
    } finally {
      setIsInitializing(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || !isReady || isGenerating) return;

    const userMessage: Message = { role: "user", content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsGenerating(true);

    try {
      // Add empty assistant message that will be streamed into
      let currentReply = "";
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      await aiService.chat(newMessages, (text) => {
        currentReply = text;
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1].content = currentReply;
          return updated;
        });
      });
    } catch (e) {
      console.error(e);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I encountered an error." }
      ]);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-6 p-4 rounded-full bg-cyan-600 hover:bg-cyan-500 text-white shadow-xl hover:shadow-2xl transition-all z-40 hover:scale-110 active:scale-95 cursor-pointer"
        aria-label="Toggle AI Assistant"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-40 right-6 w-96 max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col z-50 border border-slate-200" style={{ height: "500px", maxHeight: "60vh" }}>
          {/* Header */}
          <div className="bg-cyan-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              <h3 className="font-bold">Local AI Tutor</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-cyan-200">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-4 bg-slate-50 flex flex-col gap-4">
            {!isReady ? (
              <div className="flex flex-col items-center justify-center h-full text-slate-500 space-y-4">
                <Loader2 className="w-8 h-8 animate-spin text-cyan-600" />
                <p className="text-sm font-medium text-center">Loading AI Model...</p>
                {progress && (
                  <div className="w-full max-w-xs space-y-2">
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-cyan-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progress.progress * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-center">{progress.text}</p>
                  </div>
                )}
                <p className="text-xs text-center text-slate-400 mt-4 px-4">
                  First load downloads the model to your browser. This may take a minute but runs 100% offline afterwards.
                </p>
              </div>
            ) : (
              <>
                {messages.map((msg, i) => (
                  <div key={i} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === "user" ? "bg-slate-200 text-slate-600" : "bg-cyan-100 text-cyan-600"}`}>
                      {msg.role === "user" ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                    </div>
                    <div className={`p-3 rounded-2xl max-w-[80%] text-sm ${msg.role === "user" ? "bg-slate-800 text-white rounded-tr-none" : "bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-sm"}`}>
                      {msg.content}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Footer (Input) */}
          <div className="p-3 bg-white border-t border-slate-200">
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a science question..."
                disabled={!isReady || isGenerating}
                className="flex-1 p-2 bg-slate-100 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || !isReady || isGenerating}
                className="p-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-500 disabled:opacity-50 transition-colors"
              >
                {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
