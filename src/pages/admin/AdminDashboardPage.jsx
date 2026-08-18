import React from "react";
import AppLayout from "@/components/layout/AppLayout.jsx";
import { ChartAreaInteractive } from "./components/chart-area-interactive";
import { DataTable } from "./components/data-table";
import { SectionCards } from "./components/section-cards";
import data from "./data.json";

export default function AdminDashboardPage() {
  return (
    <AppLayout breadcrumbs={[{ label: "Dashboard" }]}>
      <SectionCards />
      <ChartAreaInteractive />
      <DataTable data={data} />
    </AppLayout>
  );
}
