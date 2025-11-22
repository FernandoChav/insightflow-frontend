// src/views/workspace/WorkspaceView.tsx
"use client"; // Obligatorio porque usamos Hooks (useState, useEffect)

import React from "react";
import Link from "next/link";
import { useWorkspaceDocuments } from "./hooks/useWorkspaceDocuments";

// ID temporal para probar (Es el que pusimos en el Seeder del Backend)
const DEMO_WORKSPACE_ID = "ws-seed-001";

export default function WorkspaceView() {
  // 1. Usamos el Hook (Feature Pattern)
  const { documents, loading, error } =
    useWorkspaceDocuments(DEMO_WORKSPACE_ID);

  return (
    <div className="p-8 w-full">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Mis Documentos</h1>
          <p className="text-gray-500">Espacio: {DEMO_WORKSPACE_ID}</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition flex items-center gap-2">
          <span>+</span> Nuevo Documento
        </button>
      </header>

      {/* 2. Estado de Carga */}
      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      )}

      {/* 3. Estado de Error */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* 4. Lista de Documentos (Datos Reales) */}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Mapeamos los documentos que vienen de la API */}
          {documents.map((doc) => (
            <Link
              key={doc.id}
              href={`/document/${doc.id}`} // En el futuro crearemos esta ruta
              className="group block border border-gray-200 bg-white rounded-xl p-5 hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-200">
                {doc.icon || "📄"}
              </div>
              <h3 className="font-semibold text-lg text-gray-800 mb-1 group-hover:text-blue-600">
                {doc.title}
              </h3>
              <p className="text-xs text-gray-400">
                Creado: {new Date(doc.createdAt).toLocaleDateString()}
              </p>
            </Link>
          ))}

          {/* Tarjeta vacía si no hay documentos */}
          {documents.length === 0 && (
            <div className="col-span-full text-center py-12 bg-gray-50 rounded-xl border border-dashed">
              <p className="text-gray-500">
                No hay documentos en este espacio aún.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
