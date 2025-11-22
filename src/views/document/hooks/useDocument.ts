import { useEffect, useState } from "react";
import { documentsService } from "@/services/api/documents";
import { Document } from "@/types/documents";

export function useDocument(id: string) {
  const [document, setDocument] = useState<Document | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 1. Cargar el documento al entrar
  useEffect(() => {
    if (!id) return;
    const fetchDoc = async () => {
      try {
        setLoading(true);
        const res = await documentsService.getById(id);
        if (res.success) {
          setDocument(res.data);
        } else {
          setError(res.message);
        }
      } catch (err) {
        console.error("Error al cargar el documento", err);
        setError("Error al cargar el documento");
      } finally {
        setLoading(false);
      }
    };
    fetchDoc();
  }, [id]);

  // 2. Función para guardar cambios (PATCH)
  const saveChanges = async (updates: { title?: string; icon?: string }) => {
    if (!document) return;

    // Optimistic UI: Actualizamos la vista antes de que responda el servidor
    setDocument((prev) => (prev ? { ...prev, ...updates } : null));
    setSaving(true);

    try {
      await documentsService.update(id, updates);
    } catch (err) {
      console.error("Error guardando", err);
      // Aquí podrías revertir el cambio si falla
    } finally {
      setSaving(false);
    }
  };

  return { document, loading, error, saving, saveChanges };
}
