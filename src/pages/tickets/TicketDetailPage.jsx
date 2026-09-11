import { useState, useEffect, useRef } from "react";
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
  X,
  MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/card";

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
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
    } catch {
      toast.error("Erreur lors de l'enregistrement en FAQ");
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "OPEN":
        return <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/30 dark:text-blue-400">Ouvert</Badge>;
      case "IN_PROGRESS":
        return <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/30 dark:text-amber-400">En cours</Badge>;
      case "RESOLVED":
        return <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/30 dark:text-emerald-400">Résolu</Badge>;
      case "CLOSED":
        return <Badge className="bg-slate-500/10 text-slate-600 border-slate-500/30 dark:text-slate-400">Fermé</Badge>;
      default:
        return <Badge variant="secondary">{status || "Ouvert"}</Badge>;
    }
  };

  if (loading) {
    return (
      <AppLayout breadcrumbs={[{ label: "Tickets", href: "/tickets" }, { label: `#${id}` }]}>
        <div className="py-20 flex flex-col items-center justify-center text-muted-foreground gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 dark:text-blue-400" />
          <p className="text-sm font-medium">Chargement de la conversation...</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout breadcrumbs={[{ label: "Tickets Support", href: "/tickets" }, { label: `Ticket #${id}` }]}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border pb-4">
          <div>
            <Link to="/tickets" className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline mb-2">
              <ArrowLeft className="h-3.5 w-3.5" /> Retour à la liste
            </Link>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-xl sm:text-2xl font-bold text-foreground">{ticket?.subject || `Ticket #${id}`}</h1>
              {getStatusBadge(ticket?.status)}
            </div>
          </div>

          <Button onClick={handleFetchAiSuggestion} disabled={loadingAi} variant="outline" className="flex items-center gap-2">
            {loadingAi ? <Loader2 className="h-4 w-4 animate-spin text-blue-600 dark:text-blue-400" /> : <Sparkles className="h-4 w-4 text-amber-500" />}
            <span>Générer Assistance IA</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2 space-y-6">
            {/* Conversation */}
            <Card className="bg-card border-border max-h-[500px] overflow-y-auto">
              <div className="p-4 sm:p-6 space-y-5">
                {messages.length === 0 ? (
                  <div className="text-center py-10 text-muted-foreground text-sm space-y-3">
                    <MessageSquare className="h-8 w-8 mx-auto text-muted-foreground/50" />
                    <p>Aucun message dans ce fil. Rédigez une réponse ci-dessous.</p>
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
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${isSupport ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground border border-border"}`}>
                          {isSupport ? <ShieldCheck className="h-4 w-4" /> : <User className="h-4 w-4" />}
                        </div>

                        <div className={`group relative max-w-md rounded-2xl p-4 space-y-2 shadow-sm ${isSupport ? "bg-primary text-primary-foreground rounded-tr-none" : "bg-muted text-foreground rounded-tl-none border border-border"}`}>
                          <div className="flex items-center justify-between gap-4 text-xs opacity-75">
                            <span className="font-semibold">{isSupport ? "Équipe Vala Support" : "Vous"}</span>
                            <div className="flex items-center gap-2">
                              <span>{msg.sentAt ? new Date(msg.sentAt).toLocaleTimeString("fr-FR", { hour: '2-digit', minute: '2-digit' }) : "À l'instant"}</span>
                              {!isEditing && msg.id && (
                                <button
                                  onClick={() => handleStartEditMessage(msg)}
                                  title="Modifier le message"
                                  className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 rounded hover:bg-slate-900/20 dark:hover:bg-white/20"
                                >
                                  <Pencil className="h-3 w-3" />
                                </button>
                              )}
                            </div>
                          </div>

                          {isEditing ? (
                            <div className="space-y-2 pt-1">
                              <Textarea
                                rows={2}
                                value={editMsgContent}
                                onChange={(e) => setEditMsgContent(e.target.value)}
                                className="bg-background text-foreground border-border min-h-[60px]"
                              />
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  type="button"
                                  onClick={handleCancelEditMessage}
                                  className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-slate-900/10 dark:hover:bg-white/10 rounded-md"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                                <button
                                  type="button"
                                  disabled={updatingMsg || !editMsgContent.trim()}
                                  onClick={() => handleSaveEditMessage(msg.id)}
                                  className="p-1.5 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 rounded-md disabled:opacity-50"
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
            </Card>

            {/* Composer */}
            <Card className="bg-card border-border">
              <div className="p-4 space-y-3">
                <form onSubmit={handleSendMessage} className="space-y-3">
                  <Textarea
                    rows={3}
                    placeholder="Rédigez votre réponse..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="bg-background text-foreground border-border"
                  />
                  <div className="flex justify-end">
                    <Button type="submit" disabled={sending || !newMessage.trim()} className="flex items-center gap-2">
                      {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                      <span>Envoyer</span>
                    </Button>
                  </div>
                </form>
              </div>
            </Card>
          </div>

          {/* AI Assistance */}
          <div className="space-y-6">
            <Card className="bg-card border border-amber-500/40 shadow-sm overflow-hidden">
              <div className="border-b border-amber-500/30 bg-amber-500/5 px-5 py-4 flex items-center gap-2">
                <Bot className="h-5 w-5 text-amber-500" />
                <span className="font-bold text-sm text-amber-700 dark:text-amber-400">Assistance IA Vala AI</span>
              </div>

              <div className="p-5">
                {aiSuggestion ? (
                  <div className="space-y-4">
                    <div className="bg-muted border border-border rounded-xl p-3.5 space-y-2 text-xs">
                      <div className="flex items-center justify-between text-muted-foreground">
                        <span>Fournisseur: {aiSuggestion.provider || "OpenAI"}</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{(aiSuggestion.confidenceScore * 100 || 95)}% confiance</span>
                      </div>
                      <p className="text-foreground text-sm leading-relaxed font-normal">{aiSuggestion.response}</p>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Button size="sm" onClick={handleInsertAiReply} className="w-full flex items-center justify-center gap-2">
                        <Send className="h-3.5 w-3.5" /> Insérer dans la réponse
                      </Button>
                      <Button size="sm" variant="outline" onClick={handleSaveAsFaq} className="w-full flex items-center justify-center gap-2">
                        <BookmarkPlus className="h-3.5 w-3.5 text-amber-500" /> Enregistrer en FAQ
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-xs text-muted-foreground leading-relaxed text-center py-6 space-y-3">
                    <p>Cliquez ci-dessous pour analyser le ticket et générer une suggestion de réponse intelligente.</p>
                    <Button size="sm" variant="outline" onClick={handleFetchAiSuggestion} disabled={loadingAi} className="mx-auto flex items-center gap-2">
                      {loadingAi ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Sparkles className="h-3.5 w-3.5 text-amber-500" />}
                      Générer Réponse IA
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}