"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  // Helper para saber si el link está activo
  const isActive = (path: string) => pathname.startsWith(path);

  const menuItems = [
    { name: "Mis Espacios", href: "/workspace", icon: "🚀" },
    { name: "Documentos", href: "/documents", icon: "📄" }, // Placeholder visual
    { name: "Favoritos", href: "/favorites", icon: "⭐" }, // Placeholder visual
    { name: "Configuración", href: "/settings", icon: "⚙️" }, // Placeholder visual
  ];

  return (
    <aside className="w-64 h-screen sticky top-0 flex flex-col border-r border-gray-200 bg-white/80 backdrop-blur-xl shadow-xl z-10 transition-all duration-300">
      {/* Header del Sidebar */}
      <div className="p-6 flex items-center gap-2 border-b border-gray-100/50">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/30">
          IF
        </div>
        <span className="font-bold text-gray-800 text-lg tracking-tight">
          InsightFlow
        </span>
      </div>

      {/* Navegación */}
      <nav className="flex-1 py-6 px-3 space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
              isActive(item.href)
                ? "bg-blue-50 text-blue-700 shadow-sm font-medium"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:pl-4"
            }`}
          >
            <span
              className={`text-lg group-hover:scale-110 transition-transform ${
                isActive(item.href)
                  ? ""
                  : "grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100"
              }`}
            >
              {item.icon}
            </span>
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Footer del Sidebar (Volver al Home) */}
      <div className="p-4 border-t border-gray-100">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2 text-sm text-gray-500 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
        >
          <span>🚪</span> Salir al Inicio
        </Link>
      </div>
    </aside>
  );
}
