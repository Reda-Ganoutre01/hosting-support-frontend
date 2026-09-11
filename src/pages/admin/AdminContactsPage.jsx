import { useState, useEffect } from "react";
import AppLayout from "@/components/layout/AppLayout.jsx";
import { Card, CardContent } from "@/components/ui/Card.jsx";
import { Button } from "@/components/ui/Button.jsx";
import { Badge } from "@/components/ui/Badge.jsx";
import { Input } from "@/components/ui/Input.jsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table.jsx";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog.jsx";
import { Search, Trash2, Eye, Mail, Loader2, RefreshCw } from "lucide-react";
import { useToast } from "@/context/ToastContext.jsx";
import { ContactService } from "@/services/ContactService.js";

export default function AdminContactsPage() {
  const toast = useToast();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState(null);

  const loadContacts = () =>
    ContactService.getContacts()
      .then((data) => setContacts(Array.isArray(data) ? data : []))
      .catch((err) => toast.error(err?.response?.data?.message || "Impossible de charger les messages."))
      .finally(() => setLoading(false));

  useEffect(() => {
    loadContacts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRefresh = async () => {
    setLoading(true);
    await loadContacts();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce message de contact ?")) return;
    try {
      await ContactService.deleteContact(id);
      setContacts((prev) => prev.filter((c) => c.id !== id));
      toast.success("Message supprimé avec succès.");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Erreur lors de la suppression.");
    }
  };

  const filtered = contacts.filter((c) =>
    [c.name, c.email, c.subject].some((v) => (v || "").toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <AppLayout breadcrumbs={[{ label: "Administration" }, { label: "Messages de contact" }]}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight flex items-center gap-2">
            <Mail className="h-7 w-7 text-blue-500" /> Messages de Contact
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Consultez les messages envoyés par les visiteurs via le formulaire de contact et répondez à leurs demandes.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-card p-4 rounded-xl border border-border">
          <div className="relative sm:col-span-2">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher par nom, email ou sujet..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-background"
            />
          </div>
          <Button
            variant="outline"
            onClick={handleRefresh}
            disabled={loading}
            className="sm:justify-self-stretch"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Actualiser
          </Button>
        </div>

        <Card className="bg-card border-border shadow-sm">
          <CardContent className="p-0">
            {loading ? (
              <div className="py-20 flex flex-col items-center justify-center text-muted-foreground gap-3">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                <p className="text-sm font-medium">Chargement des messages de contact...</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="py-16 text-center text-muted-foreground space-y-3">
                <Mail className="h-12 w-12 mx-auto text-muted-foreground/50" />
                <p className="text-base font-semibold text-foreground">
                  {contacts.length === 0 ? "Aucun message de contact" : "Aucun résultat trouvé"}
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>Sujet</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((c) => (
                    <TableRow key={c.id}>
                      <TableCell>
                        <p className="font-semibold text-foreground">{c.name}</p>
                        <p className="text-xs text-muted-foreground">{c.email}</p>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="max-w-[200px] truncate">{c.subject}</Badge>
                      </TableCell>
                      <TableCell className="max-w-[280px]">
                        <p className="truncate text-sm text-muted-foreground">{c.message}</p>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                        {c.createdAt ? new Date(c.createdAt).toLocaleDateString("fr-FR") : "Récemment"}
                      </TableCell>
                      <TableCell className="text-right space-x-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setSelected(c)}
                          className="text-xs text-blue-500 hover:text-blue-600"
                        >
                          <Eye className="h-4 w-4 mr-1 text-blue-500" /> Voir
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(c.id)}
                          className="text-xs text-red-500 hover:text-red-600"
                        >
                          <Trash2 className="h-3.5 w-3.5 mr-1" /> Supprimer
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      {/* View message dialog */}
      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        {selected && (
          <DialogContent className="sm:max-w-lg bg-card border-border">
            <DialogHeader>
              <DialogTitle>{selected.subject || "Message de contact"}</DialogTitle>
              <DialogDescription>
                {selected.name} · {selected.email}
              </DialogDescription>
            </DialogHeader>
            <div className="max-h-[50vh] overflow-y-auto rounded-lg bg-muted p-4 text-sm text-foreground whitespace-pre-wrap">
              {selected.message}
            </div>
            {selected.createdAt && (
              <p className="text-xs text-muted-foreground text-right">
                Reçu le {new Date(selected.createdAt).toLocaleString("fr-FR")}
              </p>
            )}
          </DialogContent>
        )}
      </Dialog>
    </AppLayout>
  );
}