import { useEffect, useState, useCallback } from "react";
import { documentsService } from "@/services/api/documents";
import { Document } from "@/types/documents";

export function useWorkspaceDocuments(workspaceId: string) {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDocs = useCallback(async () => {
    if (!workspaceId) return;
    try {
      setLoading(true);
      const response = await documentsService.getByWorkspace(workspaceId);
      if (response.success) {
        setDocuments(response.data);
      } else {
        setError(response.message);
      }
    } catch (err) {
      console.error(err);
      setError("Error al cargar documentos");
    } finally {
      setLoading(false);
    }
  }, [workspaceId]);

  useEffect(() => {
    fetchDocs();
  }, [fetchDocs]);

  // --- NUEVA FUNCIÓN: CREAR ---
  const createDocument = async (title: string) => {
    try {
      const res = await documentsService.create({
        workspaceId,
        userId: "user-fer", // Hardcodeado por ahora (taller)
        title,
        icon: "📄",
      });
      if (res.success) {
        fetchDocs(); // Recarga la lista automáticamente
        return true;
      }
    } catch (err) {
      console.error(err);
      alert("Error al crear");
    }
    return false;
  };

  // --- NUEVA FUNCIÓN: ELIMINAR ---
  const deleteDocument = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar este documento?")) return;

    try {
      // Optimistic Update: Lo borramos de la vista inmediatamente para que se sienta rápido
      setDocuments((prev) => prev.filter((d) => d.id !== id));

      await documentsService.delete(id);
    } catch (err) {
      console.error(err);
      alert("Error al eliminar");
      fetchDocs(); // Si falla, recargamos para que vuelva a aparecer
    }
  };

  return { documents, loading, error, createDocument, deleteDocument };
}
