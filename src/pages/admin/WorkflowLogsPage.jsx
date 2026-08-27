import React, { useState, useEffect } from "react";
import AppLayout from "@/components/layout/AppLayout.jsx";
import HostingPlanService from "@/services/HostingPlanService.js";
import { useToast } from "@/context/ToastContext.jsx";
import { Cpu, CheckCircle2, XCircle, Clock, Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function WorkflowLogsPage() {
  const toast = useToast();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadLogs = async () => {
    setLoading(true);
    try {
      const res = await HostingPlanService.getWorkflowLogs();
      setLogs(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de la récupération des journaux n8n.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLogs();
  }, []);

  return (
    <AppLayout breadcrumbs={[{ label: "Administration" }, { label: "Journaux des workflows" }]}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight flex items-center gap-2">
              <Cpu className="h-7 w-7 text-indigo-500" /> Surveillance des Workflows n8n
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Historique et rapports d'exécution des processus automatisés et intégrations d'assistance IA.
            </p>
          </div>
          <Button variant="outline" onClick={loadLogs} className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" /> Actualiser
          </Button>
        </div>

        <Card className="bg-card border-border shadow-sm">
          <CardContent className="p-0">
            {loading ? (
              <div className="py-20 flex flex-col items-center justify-center text-muted-foreground gap-3">
                <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
                <p className="text-sm font-medium">Chargement des journaux de workflows...</p>
              </div>
            ) : logs.length === 0 ? (
              <div className="py-16 text-center text-muted-foreground space-y-3">
                <Cpu className="h-12 w-12 mx-auto text-muted-foreground/50" />
                <p className="text-base font-semibold text-foreground">Aucun journal d'exécution enregistré</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID Execution</TableHead>
                    <TableHead>Nom du Workflow</TableHead>
                    <TableHead>Statut d'exécution</TableHead>
                    <TableHead>Date d'exécution</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logs.map((log) => {
                    const isSuccess = log.executionStatus === "SUCCESS" || log.executionStatus === "SUCCEEDED";
                    return (
                      <TableRow key={log.id}>
                        <TableCell className="font-mono text-xs text-muted-foreground">#{log.id}</TableCell>
                        <TableCell className="font-bold text-foreground">
                          {log.workflowName || "Workflow d'assistance IA"}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              isSuccess
                                ? "border-emerald-500/30 text-emerald-500 bg-emerald-500/10 flex items-center gap-1 w-fit"
                                : "border-red-500/30 text-red-500 bg-red-500/10 flex items-center gap-1 w-fit"
                            }
                          >
                            {isSuccess ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                            {log.executionStatus || "SUCCESS"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground flex items-center gap-1 mt-2">
                          <Clock className="h-3.5 w-3.5" />
                          {log.executionDate || "Récemment"}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
