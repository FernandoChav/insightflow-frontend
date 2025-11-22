"use client";

import React from "react";
import Link from "next/link";
import { useDocument } from "./hooks/useDocument";
import { BlockEditor } from "./components/BlockEditor";
import { EmojiSelector } from "./components/EmojiSelector";

interface Props {
  documentId: string;
}

export default function DocumentEditor({ documentId }: Props) {
  // Traemos todas las funciones del hook vitaminado
  const {
    document,
    loading,
    error,
    saving,
    saveChanges,
    addBlock,
    updateBlock,
    removeBlock,
  } = useDocument(documentId);

  // Estados de carga y error
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-400 animate-pulse">
        Cargando lienzo...
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto mt-20 p-6 bg-red-50 border border-red-100 rounded-xl text-red-600">
        Error: {error}
      </div>
    );
  }

  if (!document) return null;

  return (
    <div className="max-w-3xl mx-auto py-16 px-8 animate-in fade-in duration-500 pb-40">
      {/* 1. BARRA DE NAVEGACIÓN SUPERIOR */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-12 transition-colors hover:text-gray-600">
        <Link href="/workspace" className="hover:underline hover:text-gray-900">
          Workspaces
        </Link>
        <span>/</span>
        <span className="truncate font-medium text-gray-900 max-w-[200px]">
          {document.title}
        </span>
        {saving && (
          <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full animate-pulse">
            Guardando...
          </span>
        )}
      </nav>

      {/* 2. CABECERA DEL DOCUMENTO */}

      {/* Selector de Ícono */}
      <div className="mb-6 group">
        <EmojiSelector
          currentIcon={document.icon}
          onChange={(icon) => saveChanges({ icon })}
        />
      </div>

      {/* Título Principal */}
      <input
        type="text"
        value={document.title}
        onChange={(e) => saveChanges({ title: e.target.value })}
        placeholder="Sin título"
        className="text-5xl font-extrabold text-gray-900 w-full border-none focus:outline-none focus:ring-0 placeholder:text-gray-200 bg-transparent leading-tight mb-8"
      />

      <hr className="border-gray-100 mb-10" />

      {/* 3. ÁREA DE CONTENIDO EDITABLE */}
      <div className="space-y-1 min-h-[150px]">
        {document.content && document.content.length > 0 ? (
          document.content.map((block) => (
            <BlockEditor
              key={block.id}
              block={block}
              onUpdate={(data) => updateBlock(block.id, data)}
              onDelete={() => removeBlock(block.id)}
            />
          ))
        ) : (
          <div className="text-gray-300 italic text-lg py-10 text-center border-2 border-dashed border-gray-50 rounded-xl select-none cursor-default">
            El lienzo está vacío. Empieza a escribir abajo.
          </div>
        )}
      </div>

      {/* 4. BOTONERA FLOTANTE (Sticky Bottom) */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-md border border-gray-200 shadow-2xl rounded-full px-6 py-3 flex gap-4 items-center z-50 transition-transform hover:scale-105">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mr-1">
          Insertar
        </span>

        <button
          onClick={() => addBlock("h2", "Nuevo Subtítulo")}
          className="flex flex-col items-center gap-1 text-gray-500 hover:text-blue-600 transition-colors group"
          title="Título H2"
        >
          <span className="font-serif font-bold text-lg group-hover:-translate-y-0.5 transition-transform">
            H2
          </span>
        </button>

        <div className="w-px h-5 bg-gray-200"></div>

        <button
          onClick={() => addBlock("paragraph", "")}
          className="flex flex-col items-center gap-1 text-gray-500 hover:text-blue-600 transition-colors group"
          title="Párrafo de texto"
        >
          <span className="font-serif text-lg group-hover:-translate-y-0.5 transition-transform">
            ¶
          </span>
        </button>

        <div className="w-px h-5 bg-gray-200"></div>

        <button
          onClick={() => addBlock("todo", "Nueva tarea")}
          className="flex flex-col items-center gap-1 text-gray-500 hover:text-blue-600 transition-colors group"
          title="Lista de tareas"
        >
          <span className="text-lg group-hover:-translate-y-0.5 transition-transform">
            ☑
          </span>
        </button>
      </div>
    </div>
  );
}
