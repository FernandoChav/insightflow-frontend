"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useWorkspaceDocuments } from "./hooks/useWorkspaceDocuments";
import { Modal } from "@/components/ui/Modal";

// ID temporal para probar (Es el que pusimos en el Seeder del Backend)
const DEMO_WORKSPACE_ID = "ws-seed-001";

export default function WorkspaceView() {
  // Traemos la lógica del Hook
  const { documents, loading, error, createDocument, deleteDocument } =
    useWorkspaceDocuments(DEMO_WORKSPACE_ID);

  // --- ESTADOS PARA EL MODAL DE CREAR ---
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [newDocTitle, setNewDocTitle] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  // --- ESTADOS PARA EL MODAL DE ELIMINAR ---
  const [docToDelete, setDocToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // --- MANEJADORES (HANDLERS) ---

  // Crear Documento
  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocTitle.trim()) return;

    setIsCreating(true);
    await createDocument(newDocTitle);
    setIsCreating(false);

    // Limpieza
    setNewDocTitle("");
    setCreateModalOpen(false);
  };

  // Abrir Modal de Eliminar
  const promptDelete = (id: string) => {
    setDocToDelete(id);
  };

  // Confirmar Eliminación
  const handleConfirmDelete = async () => {
    if (!docToDelete) return;

    setIsDeleting(true);
    await deleteDocument(docToDelete);
    setIsDeleting(false);
    setDocToDelete(null); // Cierra el modal
  };

  return (
    <div className="p-8 w-full max-w-7xl mx-auto">
      {/* HEADER */}
      <header className="mb-8 flex justify-between items-end border-b border-gray-100 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mis Documentos</h1>
          <p className="text-sm text-gray-500 mt-1">
            Espacio de trabajo: {DEMO_WORKSPACE_ID}
          </p>
        </div>
        <button
          onClick={() => setCreateModalOpen(true)}
          className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition shadow-sm flex items-center gap-2 font-medium"
        >
          <span>+</span> Nuevo
        </button>
      </header>

      {/* ESTADOS DE CARGA / ERROR */}
      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-100 mb-6">
          {error}
        </div>
      )}

      {/* GRID DE DOCUMENTOS */}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="group relative bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
            >
              {/* Enlace principal */}
              <Link href={`/document/${doc.id}`} className="block p-6 h-full">
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-200">
                  {doc.icon || "📄"}
                </div>
                <h3 className="font-semibold text-lg text-gray-900 mb-1 truncate group-hover:text-blue-600">
                  {doc.title}
                </h3>
                <p className="text-xs text-gray-400">
                  {new Date(doc.createdAt).toLocaleDateString()}
                </p>
              </Link>

              {/* Botón de Eliminar (Flotante) */}
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Evita entrar al documento
                  promptDelete(doc.id);
                }}
                className="absolute top-3 right-3 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full opacity-0 group-hover:opacity-100 transition-all z-10"
                title="Eliminar documento"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  <line x1="10" y1="11" x2="10" y2="17"></line>
                  <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
              </button>
            </div>
          ))}

          {/* Estado Vacío */}
          {documents.length === 0 && (
            <div
              onClick={() => setCreateModalOpen(true)}
              className="col-span-full py-16 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50/30 transition-colors cursor-pointer"
            >
              <span className="text-4xl mb-2">✨</span>
              <p>Tu espacio está vacío. ¡Crea el primer documento!</p>
            </div>
          )}
        </div>
      )}

      {/* --- MODAL 1: CREAR DOCUMENTO --- */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setCreateModalOpen(false)}
        title="Crear Nuevo Documento"
      >
        <form onSubmit={handleCreateSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Título
            </label>
            <input
              type="text"
              value={newDocTitle}
              onChange={(e) => setNewDocTitle(e.target.value)}
              placeholder="Ej: Resumen de Reunión"
              autoFocus
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setCreateModalOpen(false)}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isCreating || !newDocTitle.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium transition-colors"
            >
              {isCreating ? "Creando..." : "Crear Documento"}
            </button>
          </div>
        </form>
      </Modal>

      {/* --- MODAL 2: ELIMINAR DOCUMENTO (DANGER) --- */}
      <Modal
        isOpen={!!docToDelete}
        onClose={() => setDocToDelete(null)}
        title="¿Eliminar documento?"
      >
        <div className="space-y-4">
          <div className="flex items-start gap-4 bg-red-50 p-4 rounded-lg border border-red-100">
            <div className="text-2xl">⚠️</div>
            <div>
              <p className="text-sm text-red-800 font-medium">
                Esta acción no se puede deshacer.
              </p>
              <p className="text-sm text-red-600 mt-1">
                El documento se moverá a la papelera y dejará de estar visible
                para el equipo.
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-50">
            <button
              onClick={() => setDocToDelete(null)}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirmDelete}
              disabled={isDeleting}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 font-medium shadow-sm flex items-center gap-2 transition-all"
            >
              {isDeleting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Eliminando...
                </>
              ) : (
                "Sí, eliminar"
              )}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
