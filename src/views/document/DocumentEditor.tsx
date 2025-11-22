"use client";

import React from "react";
import Link from "next/link";
import { useDocument } from "./hooks/useDocument";
import { BlockRenderer } from "./components/BlockRenderer"; // <--- IMPORTAMOS EL RENDERIZADOR

interface Props {
  documentId: string;
}

export default function DocumentEditor({ documentId }: Props) {
  const { document, loading, error, saving, saveChanges } =
    useDocument(documentId);

  if (loading)
    return (
      <div className="flex h-full items-center justify-center text-gray-400 animate-pulse">
        Cargando lienzo...
      </div>
    );
  if (error)
    return (
      <div className="p-10 text-red-500 bg-red-50 rounded-lg m-8">
        Error: {error}
      </div>
    );
  if (!document) return null;

  return (
    <div className="max-w-3xl mx-auto py-16 px-8 animate-in fade-in duration-500">
      {/* Barra de navegación superior (Breadcrumbs) */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-12 transition-colors hover:text-gray-600">
        <Link href="/workspace" className="hover:underline hover:text-gray-900">
          Workspaces
        </Link>
        <span>/</span>
        <span className="truncate font-medium text-gray-900">
          {document.title}
        </span>
        {saving && (
          <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
            Guardando...
          </span>
        )}
      </nav>

      {/* --- CABECERA DEL DOCUMENTO --- */}

      {/* 1. Icono (Emoji) */}
      <div className="group relative w-20 h-20 mb-6 transition-transform hover:scale-105">
        <input
          type="text"
          value={document.icon}
          onChange={(e) => saveChanges({ icon: e.target.value })}
          className="text-7xl bg-transparent border-none focus:outline-none cursor-pointer w-full h-full p-0 m-0"
          maxLength={2}
        />
        {/* Tooltip visual al hacer hover */}
        <div className="absolute -right-24 top-6 opacity-0 group-hover:opacity-100 text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded transition-opacity">
          Clic para cambiar
        </div>
      </div>

      {/* 2. Título Principal */}
      <input
        type="text"
        value={document.title}
        onChange={(e) => saveChanges({ title: e.target.value })}
        placeholder="Sin título"
        className="text-5xl font-extrabold text-gray-900 w-full border-none focus:outline-none focus:ring-0 placeholder:text-gray-200 bg-transparent leading-tight mb-8"
      />

      <hr className="border-gray-100 mb-10" />

      {/* --- CONTENIDO REAL (Renderizado) --- */}
      <div className="space-y-2 min-h-[200px]">
        {document.content && document.content.length > 0 ? (
          document.content.map((block) => (
            <BlockRenderer key={block.id} block={block} />
          ))
        ) : (
          <div className="text-gray-300 italic text-lg">
            Escribe algo aquí... (o agrega bloques desde el Backend)
          </div>
        )}
      </div>
    </div>
  );
}
