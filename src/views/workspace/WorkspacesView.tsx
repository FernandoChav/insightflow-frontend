// src/views/workspace/WorkspacesView.tsx
"use client";

import React, { useState } from "react";
import { useWorkspaces } from "./hooks/useWorkspaces";
import { Modal } from "@/components/ui/Modal";
import { useAuthContext } from "@/context/AuthContext";

export default function WorkspacesView() {
  const { user } = useAuthContext();
  const { workspaces, loading, error, createWorkspace, deleteWorkspace } = useWorkspaces();

  // Estados Modal Crear
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newTheme, setNewTheme] = useState("Educación");
  const [newIconFile, setNewIconFile] = useState<File | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Estados Modal Eliminar
  const [wsToDelete, setWsToDelete] = useState<string | null>(null);

  // --- HANDLERS ---
  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newIconFile) {
      alert("El nombre y el ícono son obligatorios");
      return;
    }
    setIsCreating(true);
    const success = await createWorkspace(newName, newDesc, newTheme, newIconFile);
    setIsCreating(false);
    if (success) {
      setCreateModalOpen(false);
      setNewName("");
      setNewDesc("");
      setNewIconFile(null);
    }
  };

  return (
    <div className="p-8 w-full max-w-7xl mx-auto">
      {/* HEADER */}
      <header className="mb-8 flex justify-between items-end border-b border-gray-100 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mis Espacios de Trabajo</h1>
          {user && (
            <p className="text-sm text-gray-500 mt-1">
              Usuario: <span className="font-semibold">{user.username}</span> <span className="bg-gray-200 px-2 py-1 rounded font-mono ml-2">ID: {user.id}</span>
            </p>
          )}
        </div>
        <button
          onClick={() => setCreateModalOpen(true)}
          className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition shadow-sm flex items-center gap-2 font-medium"
        >
          <span>+</span> Nuevo Espacio
        </button>
      </header>

      {/* LOADING / ERROR */}
      {loading && (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
        </div>
      )}
      {error && <div className="text-red-500 bg-red-50 p-4 rounded-lg">{error}</div>}

      {/* GRID DE WORKSPACES (Backend Data) */}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {workspaces.map((ws) => (
            <div key={ws.id} className="group relative bg-white border border-gray-200 rounded-xl hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
              
              {/* Imagen desde Cloudinary */}
              <div className="h-32 bg-gray-100 relative overflow-hidden">
                <img 
                    src={ws.iconUrl} 
                    alt={ws.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/400x200?text=No+Icon"; }} 
                />
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-gray-600 shadow-sm">
                  {ws.theme}
                </div>
              </div>

              {/* Info Workspace */}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="font-bold text-xl text-gray-800 mb-2">{ws.name}</h3>
                <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1">
                    {ws.description || "Sin descripción"}
                </p>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                    <span className="text-xs text-gray-400">
                         {/* Asumiendo que members es un array */}
                        {ws.members ? ws.members.length : 1} Miembro(s)
                    </span>
                    {/* Botón Eliminar (Solo Owner) */}
                    {user && ws.ownerId === user.id && (
                        <button 
                            onClick={(e) => { e.stopPropagation(); setWsToDelete(ws.id); }}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                            title="Eliminar Espacio"
                        >
                             🗑️
                        </button>
                    )}
                </div>
              </div>
            </div>
          ))}
          
          {workspaces.length === 0 && (
             <div className="col-span-full py-20 text-center text-gray-400 bg-gray-50/50 rounded-xl border-2 border-dashed border-gray-200">
                No tienes espacios de trabajo. ¡Crea el primero!
             </div>
          )}
        </div>
      )}

      {/* --- MODAL CREAR --- */}
      <Modal isOpen={isCreateModalOpen} onClose={() => setCreateModalOpen(false)} title="Crear Nuevo Espacio">
        <form onSubmit={handleCreateSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre</label>
            <input required type="text" value={newName} onChange={(e) => setNewName(e.target.value)} className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Descripción</label>
            <textarea value={newDesc} onChange={(e) => setNewDesc(e.target.value)} className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Temática</label>
            <select value={newTheme} onChange={(e) => setNewTheme(e.target.value)} className="w-full mt-1 px-3 py-2 border rounded-lg bg-white">
                <option>Educación</option>
                <option>Tecnología</option>
                <option>Negocios</option>
                <option>Personal</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Ícono (Imagen)</label>
            <input required type="file" accept="image/*" onChange={(e) => { if(e.target.files) setNewIconFile(e.target.files[0]); }} className="w-full mt-1 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <button type="button" onClick={() => setCreateModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancelar</button>
            <button type="submit" disabled={isCreating} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">{isCreating ? "Creando..." : "Crear Espacio"}</button>
          </div>
        </form>
      </Modal>

      {/* --- MODAL ELIMINAR --- */}
      <Modal isOpen={!!wsToDelete} onClose={() => setWsToDelete(null)} title="¿Eliminar Espacio?">
        <div className="space-y-4">
            <p className="text-gray-600">Se eliminará lógicamente (Soft Delete).</p>
            <div className="flex justify-end gap-2">
                <button onClick={() => setWsToDelete(null)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancelar</button>
                <button onClick={() => { if(wsToDelete) { deleteWorkspace(wsToDelete); setWsToDelete(null); } }} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Sí, eliminar</button>
            </div>
        </div>
      </Modal>
    </div>
  );
}