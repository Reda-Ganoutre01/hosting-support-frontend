import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MessageSquare, X, Send, Bot, User, ArrowRight, Loader2, Home, Sparkles, RefreshCw, AlertCircle, ChevronDown } from "lucide-react";
import AiService from "@/services/AiService.js";
import api from "@/lib/axios";
import { useAuth } from "@/context/AuthContext.jsx";

export default function AiChatWidget() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const chatEndRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home"); // "home" or "chat"
  const [inputPrompt, setInputPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [faqs, setFaqs] = useState([]);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ai",
      text: "Bonjour ! Je suis l'Assistant Virtuel Vala Creative Internet Solutions. Comment puis-je vous aider aujourd'hui ?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  // Fetch FAQ questions & answers from Spring Boot backend MySQL DB
  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await api.get("/faqs");
        if (Array.isArray(res.data) && res.data.length > 0) {
          setFaqs(res.data);
        }
      } catch (err) {
        console.warn("Could not load backend FAQs, using defaults:", err);
      }
    };
    fetchFaqs();
  }, []);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen && activeTab === "chat") {
      scrollToBottom();
    }
  }, [messages, loading, isOpen, activeTab]);

  const findMatchingAnswerFromBackend = (query) => {
    if (!faqs || faqs.length === 0) return null;
    const lowerQuery = query.toLowerCase().trim();

    // 1. Direct question match
    const directMatch = faqs.find(
      (f) => f.question && (f.question.toLowerCase().includes(lowerQuery) || lowerQuery.includes(f.question.toLowerCase()))
    );
    if (directMatch) return directMatch.answer;

    // 2. Keyword match
    const words = lowerQuery.split(/\s+/).filter((w) => w.length > 2);
    let bestFaq = null;
    let maxHits = 0;

    for (const faq of faqs) {
      const targetText = `${faq.question || ""} ${faq.answer || ""} ${faq.category || ""}`.toLowerCase();
      let hits = 0;
      for (const w of words) {
        if (targetText.includes(w)) hits++;
      }
      if (hits > maxHits) {
        maxHits = hits;
        bestFaq = faq;
      }
    }

    return maxHits > 0 ? bestFaq.answer : null;
  };

  const handleSendMessage = async (textToSend) => {
    const query = (textToSend || inputPrompt).trim();
    if (!query) return;

    setActiveTab("chat");

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInputPrompt("");
    setLoading(true);

    try {
      // 1. First check if backend API returns an AIResponse
      const res = await AiService.generateAiSuggestion(0, query);
      const aiData = res.data;

      let answerText = aiData?.response;

      // 2. Cross-check with fetched backend MySQL FAQ answers if available
      const backendAnswer = findMatchingAnswerFromBackend(query);
      if (backendAnswer) {
        answerText = backendAnswer;
      }

      const confidence = aiData?.confidenceScore ?? 0.95;
      const isLowConfidence = confidence < 0.6 && !backendAnswer;

      const aiMessage = {
        id: Date.now() + 1,
        sender: "ai",
        text: isLowConfidence
          ? "Nous ne sommes pas suffisamment certains de la réponse. Vous pouvez transmettre votre demande au support technique."
          : answerText || "Voici les démarches recommandées pour votre demande technique.",
        isFallback: isLowConfidence,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.warn("Backend AI endpoint notice, fetching from loaded FAQ database:", err);
      
      const backendAnswer = findMatchingAnswerFromBackend(query);
      const fallbackText = backendAnswer || "Merci pour votre question ! Je peux vous aider sur la gestion de vos hébergements, noms de domaine, configurations DNS, cPanel et WordPress. Vous pouvez également ouvrir un ticket support.";

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "ai",
          text: fallbackText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const startNewConversation = () => {
    setMessages([
      {
        id: Date.now(),
        sender: "ai",
        text: "Bonjour ! Je suis l'Assistant Virtuel Vala Creative Internet Solutions. Comment puis-je vous aider aujourd'hui ?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setActiveTab("chat");
  };

  // Questions suggestions loaded from MySQL backend FAQ table or default fallbacks
  const displaySuggestions = faqs.length > 0
    ? faqs.slice(0, 5).map((f) => f.question)
    : [
        "Comment changer d'offre d'hébergement ?",
        "Comment réinitialiser mon mot de passe ?",
        "Puis-je migrer mon nom de domaine ?",
        "Que comprend le certificat SSL inclus ?",
        "Comment créer un compte e-mail ?"
      ];

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {/* Pop-up Live Chat Card */}
      {isOpen && (
        <div className="w-[340px] sm:w-[380px] h-[520px] rounded-3xl shadow-2xl border border-emerald-500/20 bg-background overflow-hidden flex flex-col mb-4 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4">
          
          {/* Green Header */}
          <div className="bg-emerald-600 p-5 text-white relative flex flex-col justify-between shrink-0 min-h-[160px]">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/10 hover:bg-black/20 rounded-full p-1 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="h-2 w-2 rounded-full bg-emerald-300 animate-pulse" />
                <span className="text-xs font-semibold text-emerald-100 uppercase tracking-wider">Assistant Vala IA</span>
              </div>
              <p className="text-sm font-semibold leading-snug">
                Bonjour et bienvenue chez Vala Creative Internet Solutions, comment puis-je vous aider ?
              </p>
            </div>

            {/* White Action Box inside Header */}
            {activeTab === "home" && (
              <div
                onClick={startNewConversation}
                className="mt-3 bg-white text-slate-900 rounded-2xl p-3.5 shadow-lg flex items-center justify-between cursor-pointer hover:bg-emerald-50 transition-all group"
              >
                <div>
                  <h4 className="font-bold text-sm text-slate-900 group-hover:text-emerald-700">Nouvelle conversation</h4>
                  <p className="text-[11px] text-slate-500">Nous répondons généralement en quelques minutes</p>
                </div>
                <div className="bg-emerald-100 text-emerald-600 p-2 rounded-full group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <Send className="h-4 w-4" />
                </div>
              </div>
            )}
          </div>

          {/* Main Body */}
          <div className="flex-1 flex flex-col min-h-0 bg-slate-50 dark:bg-slate-950">
            {activeTab === "home" ? (
              <div className="p-4 space-y-4 overflow-y-auto flex-1">
                <div className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-emerald-600" /> Questions fréquemment posées (BDD) :
                </div>

                <div className="space-y-2">
                  {displaySuggestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(q)}
                      className="w-full text-left p-3 rounded-xl bg-card border border-border hover:border-emerald-500 text-xs text-foreground font-medium flex items-center justify-between group transition-all"
                    >
                      <span className="line-clamp-2">{q}</span>
                      <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-emerald-600 shrink-0 transition-colors" />
                    </button>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-border text-center">
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      navigate("/client/tickets/new");
                    }}
                    className="text-xs text-emerald-600 font-semibold hover:underline"
                  >
                    Besoin d'un support humain ? Ouvrir un ticket →
                  </button>
                </div>
              </div>
            ) : (
              /* Chat Tab */
              <div className="flex flex-col flex-1 min-h-0">
                {/* Messages List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {messages.map((msg) => {
                    const isUser = msg.sender === "user";
                    return (
                      <div
                        key={msg.id}
                        className={`flex items-start gap-2.5 ${isUser ? "flex-row-reverse" : "flex-row"}`}
                      >
                        <div
                          className={`h-7 w-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                            isUser
                              ? "bg-blue-600 text-white"
                              : "bg-emerald-600 text-white"
                          }`}
                        >
                          {isUser ? <User className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5" />}
                        </div>

                        <div className={`space-y-1 max-w-[80%] ${isUser ? "items-end text-right" : "items-start"}`}>
                          <div
                            className={`p-3 rounded-2xl text-xs ${
                              isUser
                                ? "bg-blue-600 text-white rounded-tr-none"
                                : "bg-card border border-border text-foreground rounded-tl-none shadow-sm"
                            }`}
                          >
                            <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>

                            {msg.isFallback && (
                              <div className="mt-2 pt-2 border-t border-border/40 flex flex-col gap-1.5">
                                <div className="text-[10px] text-amber-500 font-medium flex items-center gap-1">
                                  <AlertCircle className="h-3 w-3" /> Transmettre à l'équipe support
                                </div>
                                <button
                                  onClick={() => {
                                    setIsOpen(false);
                                    navigate("/client/tickets/new");
                                  }}
                                  className="bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-semibold py-1 px-2.5 rounded-lg flex items-center justify-center gap-1 w-full transition-colors"
                                >
                                  Créer un ticket support <ArrowRight className="h-3 w-3" />
                                </button>
                              </div>
                            )}
                          </div>

                          <div className="text-[9px] text-muted-foreground px-1">{msg.timestamp}</div>
                        </div>
                      </div>
                    );
                  })}

                  {loading && (
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                        <Bot className="h-3.5 w-3.5" />
                      </div>
                      <div className="p-2.5 rounded-xl bg-card border border-border text-xs text-muted-foreground flex items-center gap-2 shadow-sm">
                        <Loader2 className="h-3.5 w-3.5 animate-spin text-emerald-600" />
                        Réponse en cours...
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                {/* Chat Form */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="p-2.5 border-t border-border bg-card flex items-center gap-2"
                >
                  <input
                    type="text"
                    placeholder="Posez votre question..."
                    value={inputPrompt}
                    onChange={(e) => setInputPrompt(e.target.value)}
                    disabled={loading}
                    className="flex-1 bg-background border border-border rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                  <button
                    type="submit"
                    disabled={loading || !inputPrompt.trim()}
                    className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white p-2 rounded-xl transition-colors"
                  >
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Footer Bar */}
          <div className="bg-card border-t border-border px-4 py-2 flex items-center justify-between text-xs text-muted-foreground shrink-0">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setActiveTab("home")}
                className={`flex items-center gap-1 ${activeTab === "home" ? "text-emerald-600 font-bold" : "hover:text-foreground"}`}
              >
                <Home className="h-4 w-4" />
              </button>
              <button
                onClick={() => setActiveTab("chat")}
                className={`flex items-center gap-1 ${activeTab === "chat" ? "text-emerald-600 font-bold" : "hover:text-foreground"}`}
              >
                <MessageSquare className="h-4 w-4" />
              </button>
            </div>
            <div className="text-[10px] text-slate-400 font-medium">
              Propulsé par <span className="text-emerald-600 font-bold">Vala IA</span>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Trigger Button (Bottom Right Green Circle) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-emerald-600 hover:bg-emerald-700 text-white h-14 w-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none ring-4 ring-emerald-600/20"
        aria-label="Ouvrir le chat assistant"
      >
        {isOpen ? (
          <ChevronDown className="h-7 w-7 text-white" />
        ) : (
          <MessageSquare className="h-6 w-6 text-white" />
        )}
      </button>
    </div>
  );
}
