import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout.jsx";
import TicketService from "@/services/TicketService.js";
import MessageService from "@/services/MessageService.js";
import AiService from "@/services/AiService.js";
import { useAuth } from "@/context/AuthContext.jsx";
import { useToast } from "@/context/ToastContext.jsx";
import {
  Send,
  Sparkles,
  User,
  ShieldCheck,
  ArrowLeft,
  Loader2,
  BookmarkPlus,
  Bot,
  Pencil,
  Check,
  X
} from "lucide-react";
import Button from "@/components/ui/button";

export default function TicketDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const toast = useToast();
  const messagesEndRef = useRef(null);

  const [ticket, setTicket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);

  // Inline Message Edit State
  const [editingMsgId, setEditingMsgId] = useState(null);
  const [editMsgContent, setEditMsgContent] = useState("");
  const [updatingMsg, setUpdatingMsg] = useState(false);

  const [aiSuggestion, setAiSuggestion] = useState(null);
  const [loadingAi, setLoadingAi] = useState(false);

  const loadTicketAndMessages = async () => {
    try {
      const [ticketRes, messagesRes] = await Promise.all([
        TicketService.getTicketById(id),
        MessageService.getMessagesByTicket(id).catch(() => ({ data: [] }))
      ]);
      setTicket(ticketRes.data);
      setMessages(Array.isArray(messagesRes.data) ? messagesRes.data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTicketAndMessages();
    const interval = setInterval(loadTicketAndMessages, 5000);
    return () => clearInterval(interval);
  }, [id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setSending(true);
    try {
      const senderRole = user?.role === "ADMIN" || user?.role === "ROLE_ADMIN" ? "ADMIN" : "USER";
      const rawUserId = Number(user?.id);
      const validUserId = (!isNaN(rawUserId) && rawUserId > 0) ? rawUserId : null;

      await MessageService.sendMessage({
        ticketId: Number(id),
        content: newMessage.trim(),
        sender: senderRole,
        ...(validUserId ? { userId: validUserId } : {})
      });
      setNewMessage("");
      loadTicketAndMessages();
      toast.success("Message envoyé avec succès");
    } catch (err) {
      console.error("Erreur lors de l'envoi du message:", err);
      toast.error("Échec de l'envoi du message");
    } finally {
      setSending(false);
    }
  };

  const handleStartEditMessage = (msg) => {
    setEditingMsgId(msg.id);
    setEditMsgContent(msg.content);
  };

  const handleCancelEditMessage = () => {
    setEditingMsgId(null);
    setEditMsgContent("");
  };

  const handleSaveEditMessage = async (msgId) => {
    if (!editMsgContent.trim()) return;

    setUpdatingMsg(true);
    try {
      await MessageService.updateMessage(msgId, {
        content: editMsgContent.trim(),
        ticketId: Number(id)
      });
      toast.success("Message mis à jour avec succès");
      setEditingMsgId(null);
      setEditMsgContent("");
      loadTicketAndMessages();
    } catch (err) {
      console.error("Erreur mise à jour message:", err);
      toast.error("Erreur lors de la modification du message");
    } finally {
      setUpdatingMsg(false);
    }
  };

  const handleFetchAiSuggestion = async () => {
    setLoadingAi(true);
    try {
      const res = await AiService.generateAiSuggestion(Number(id), ticket?.subject);
      setAiSuggestion(res.data);
      toast.info("Suggestion IA générée avec succès");
    } catch (err) {
      console.error(err);
      toast.error("Impossible de générer la suggestion IA");
    } finally {
      setLoadingAi(false);
    }
  };

  const handleInsertAiReply = () => {
    if (aiSuggestion?.response) {
      setNewMessage(aiSuggestion.response);
      toast.success("Réponse IA insérée dans le composeur");
    }
  };

  const handleSaveAsFaq = async () => {
    if (!aiSuggestion) return;
    try {
      await AiService.createFaq({
        question: ticket?.subject || "Question Ticket #" + id,
        answer: aiSuggestion.response,
        category: ticket?.category || "GENERAL"
      });
      toast.success("Ajouté aux FAQs de la plateforme!");
    } catch (err) {
      toast.error("Erreur lors de l'enregistrement en FAQ");
    }
  };

  if (loading) {
    return (
      <AppLayout breadcrumbs={[{ label: "Tickets", href: "/tickets" }, { label: `#${id}` }]}>
        <div className="py-20 flex flex-col items-center justify-center text-slate-400 gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          <p className="text-sm">Chargement de la conversation...</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout breadcrumbs={[{ label: "Tickets Support", href: "/tickets" }, { label: `Ticket #${id}` }]}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <Link to="/tickets" className="inline-flex items-center gap-2 text-xs font-semibold text-blue-400 hover:underline mb-2">
            <ArrowLeft className="h-3.5 w-3.5" /> Retour à la liste
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            <span>{ticket?.subject || `Ticket #${id}`}</span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
              {ticket?.status || "OUVERT"}
            </span>
          </h1>
        </div>

        <Button onClick={handleFetchAiSuggestion} disabled={loadingAi} variant="outline" className="flex items-center gap-2">
          {loadingAi ? <Loader2 className="h-4 w-4 animate-spin text-blue-400" /> : <Sparkles className="h-4 w-4 text-amber-400" />}
          <span>Générer Assistance IA</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 space-y-4 max-h-[500px] overflow-y-auto">
            {messages.length === 0 ? (
              <div className="text-center py-10 text-slate-500 text-sm">
                Aucun message dans ce fil. Rédigez une réponse ci-dessous.
              </div>
            ) : (
              messages.map((msg, index) => {
                const isSupport = msg.sender === "SUPPORT" || msg.sender === "ADMIN";
                const isEditing = editingMsgId === msg.id;

                return (
                  <div
                    key={msg.id || index}
                    className={`flex items-start gap-3 ${isSupport ? "flex-row-reverse" : ""}`}
                  >
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 ${isSupport ? "bg-blue-600" : "bg-slate-700"}`}>
                      {isSupport ? <ShieldCheck className="h-4 w-4" /> : <User className="h-4 w-4" />}
                    </div>

                    <div className={`group relative max-w-md rounded-2xl p-4 space-y-2 ${isSupport ? "bg-blue-600 text-white rounded-tr-none" : "bg-slate-800 text-slate-100 rounded-tl-none border border-slate-700/60"}`}>
                      <div className="flex items-center justify-between gap-4 text-xs opacity-75">
                        <span className="font-semibold">{isSupport ? "Équipe Vala Support" : "Vous"}</span>
                        <div className="flex items-center gap-2">
                          <span>{msg.sentAt ? new Date(msg.sentAt).toLocaleTimeString("fr-FR", { hour: '2-digit', minute: '2-digit' }) : "À l'instant"}</span>
                          {!isEditing && msg.id && (
                            <button
                              onClick={() => handleStartEditMessage(msg)}
                              title="Modifier le message"
                              className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 hover:bg-black/20 rounded"
                            >
                              <Pencil className="h-3 w-3" />
                            </button>
                          )}
                        </div>
                      </div>

                      {isEditing ? (
                        <div className="space-y-2 pt-1">
                          <textarea
                            rows={2}
                            value={editMsgContent}
                            onChange={(e) => setEditMsgContent(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-sm text-slate-100 focus:outline-none focus:border-blue-400 resize-none"
                          />
                          <div className="flex items-center justify-end gap-2">
                            <button
                              type="button"
                              onClick={handleCancelEditMessage}
                              className="p-1 text-slate-400 hover:text-white hover:bg-slate-700 rounded"
                            >
                              <X className="h-4 w-4" />
                            </button>
                            <button
                              type="button"
                              disabled={updatingMsg || !editMsgContent.trim()}
                              onClick={() => handleSaveEditMessage(msg.id)}
                              className="p-1 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-900/40 rounded"
                            >
                              {updatingMsg ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                      )}
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
            <textarea
              rows={3}
              placeholder="Rédigez votre réponse..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 resize-none"
            />
            <div className="flex justify-end">
              <Button type="submit" disabled={sending || !newMessage.trim()} className="flex items-center gap-2">
                {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                <span>Envoyer</span>
              </Button>
            </div>
          </form>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-amber-500/30 rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <Bot className="h-5 w-5" />
              <span>Assistance IA Vala AI</span>
            </div>

            {aiSuggestion ? (
              <div className="space-y-4">
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Fournisseur: {aiSuggestion.provider || "OpenAI"}</span>
                    <span className="text-emerald-400 font-semibold">{(aiSuggestion.confidenceScore * 100 || 95)}% confiance</span>
                  </div>
                  <p className="text-slate-200 text-sm leading-relaxed font-normal">{aiSuggestion.response}</p>
                </div>

                <div className="flex flex-col gap-2">
                  <Button size="sm" onClick={handleInsertAiReply} className="w-full flex items-center justify-center gap-2">
                    <Send className="h-3.5 w-3.5" /> Insérer dans la réponse
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleSaveAsFaq} className="w-full flex items-center justify-center gap-2">
                    <BookmarkPlus className="h-3.5 w-3.5 text-amber-400" /> Enregistrer en FAQ
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-xs text-slate-400 leading-relaxed text-center py-6 space-y-3">
                <p>Cliquez ci-dessous pour analyser le ticket et générer une suggestion de réponse intelligente.</p>
                <Button size="sm" variant="outline" onClick={handleFetchAiSuggestion} disabled={loadingAi} className="mx-auto">
                  Générer Réponse IA
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
