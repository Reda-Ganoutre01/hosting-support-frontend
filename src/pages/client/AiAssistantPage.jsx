import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout.jsx";
import AiService from "@/services/AiService.js";
import { useToast } from "@/context/ToastContext.jsx";
import { Bot, Send, User, Sparkles, HelpCircle, AlertCircle, ArrowRight, Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/Badge";

const SUGGESTED_QUESTIONS = [
  "Comment connecter mon domaine ?",
  "Comment installer WordPress ?",
  "Comment accéder à cPanel ?",
  "Comment réinitialiser mon mot de passe ?",
  "Mon site web est hors ligne."
];

export default function AiAssistantPage() {
  const navigate = useNavigate();
  const toast = useToast();
  const chatEndRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ai",
      text: "Bonjour ! Je suis votre Assistant IA Support Vala Hosting. Comment puis-je vous aider aujourd'hui ?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      confidenceScore: 1.0,
    },
  ]);

  const [inputPrompt, setInputPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSendMessage = async (textToSend) => {
    const query = (textToSend || inputPrompt).trim();
    if (!query) return;

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
      // Send request to Spring Boot backend AI endpoint
      const res = await AiService.generateAiSuggestion(0, query);
      const aiData = res.data;

      // Check confidence score
      const confidence = aiData?.confidenceScore ?? 0.95;
      const isLowConfidence = confidence < 0.6;

      const aiMessage = {
        id: Date.now() + 1,
        sender: "ai",
        text: isLowConfidence
          ? "Nous ne sommes pas suffisamment certains de la réponse à votre question. Votre demande a été transmise à notre équipe de support."
          : aiData?.response || "Voici les démarches recommandées pour résoudre votre problème technique.",
        confidenceScore: confidence,
        isFallback: isLowConfidence,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error(err);
      const errorMessage = {
        id: Date.now() + 1,
        sender: "ai",
        text: "Une erreur est survenue lors du traitement de votre demande par l'assistant. Vous pouvez créer un ticket de support directement.",
        isFallback: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout breadcrumbs={[{ label: "Assistant IA" }]}>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight flex items-center gap-2">
              <Bot className="h-7 w-7 text-purple-500" /> Assistant IA Support 24/7
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Posez vos questions techniques et obtenez une aide immédiate propulsée par notre intelligence artificielle.
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={() => setMessages([messages[0]])} className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" /> Effacer la discussion
          </Button>
        </div>

        {/* Suggested Questions */}
        <div className="space-y-2">
          <div className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-purple-500" /> Questions fréquemment posées :
          </div>
          <div className="flex flex-wrap gap-2">
            {SUGGESTED_QUESTIONS.map((q, idx) => (
              <Button
                key={idx}
                variant="outline"
                size="sm"
                onClick={() => handleSendMessage(q)}
                className="text-xs rounded-full bg-card border-border hover:border-purple-500/50 hover:bg-purple-500/5"
              >
                {q}
              </Button>
            ))}
          </div>
        </div>

        {/* Chat Area Card */}
        <Card className="bg-card border-border shadow-sm flex flex-col h-[550px]">
          <CardHeader className="py-3 px-4 border-b border-border flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold text-foreground">Assistant Vala IA en ligne</span>
            </div>
            <Badge variant="outline" className="text-xs text-purple-500 border-purple-500/20 bg-purple-500/10">
              GPT-4 / Gemini
            </Badge>
          </CardHeader>

          {/* Messages Container */}
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => {
              const isUser = msg.sender === "user";
              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}
                >
                  <div
                    className={`h-8 w-8 rounded-xl flex items-center justify-center shrink-0 ${
                      isUser
                        ? "bg-blue-600 text-white"
                        : "bg-purple-500/10 border border-purple-500/20 text-purple-500"
                    }`}
                  >
                    {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  </div>

                  <div className={`space-y-1.5 max-w-[80%] ${isUser ? "items-end text-right" : "items-start"}`}>
                    <div
                      className={`p-3.5 rounded-2xl text-sm ${
                        isUser
                          ? "bg-blue-600 text-white rounded-tr-none"
                          : "bg-background border border-border text-foreground rounded-tl-none"
                      }`}
                    >
                      <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>

                      {/* Fallback button if low confidence */}
                      {msg.isFallback && (
                        <div className="mt-3 pt-3 border-t border-border/50 flex flex-col gap-2">
                          <div className="text-xs text-amber-500 flex items-center gap-1.5">
                            <AlertCircle className="h-4 w-4" /> Confiance IA insuffisante
                          </div>
                          <Button
                            size="sm"
                            onClick={() => navigate("/client/tickets/new")}
                            className="bg-amber-600 hover:bg-amber-700 text-white text-xs flex items-center justify-center gap-1.5 w-full"
                          >
                            Créer un ticket de support humain <ArrowRight className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      )}
                    </div>

                    <div className="text-[10px] text-muted-foreground px-1">{msg.timestamp}</div>
                  </div>
                </div>
              );
            })}

            {loading && (
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-500">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="p-3 rounded-2xl bg-background border border-border text-xs text-muted-foreground flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin text-purple-500" />
                  L'assistant rédige sa réponse...
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </CardContent>

          {/* Input Box */}
          <div className="p-4 border-t border-border bg-background/50">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <Input
                placeholder="Posez votre question à l'assistant IA..."
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                disabled={loading}
                className="bg-card border-border"
              />
              <Button type="submit" disabled={loading || !inputPrompt.trim()} className="bg-purple-600 hover:bg-purple-700 text-white">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
}
