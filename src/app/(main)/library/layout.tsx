"use client";

import React from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { ExplorerSidebar } from "@/components/ExplorerComponents/ExplorerSidebar"; // New sidebar component

export default function LibraryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen={false}>
      <ExplorerSidebar />
      <SidebarInset className="p-1 flex-col w-full">{children}</SidebarInset>
    </SidebarProvider>
  );
}
