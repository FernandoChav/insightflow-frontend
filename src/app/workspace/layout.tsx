import React from "react";
import Sidebar from "@/components/layout/Sidebar";

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50/50">
      {/* 1. El Sidebar fijo a la izquierda */}
      <Sidebar />

      {/* 2. El contenido principal a la derecha */}
      <main className="flex-1 relative overflow-y-auto h-screen">
        {/* Un header superior sutil dentro del contenido */}
        <header className="sticky top-0 z-20 bg-white/50 backdrop-blur-md border-b border-gray-100 px-8 py-4 flex justify-between items-center">
          <h2 className="text-sm font-medium text-gray-500">
            Taller de Arquitectura / Grupo 3
          </h2>
          <div className="w-8 h-8 rounded-full bg-linear-to-tr from-blue-500 to-purple-500 border-2 border-white shadow-md"></div>
        </header>

        {/* Aquí se renderiza la page.tsx */}
        {children}
      </main>
    </div>
  );
}
