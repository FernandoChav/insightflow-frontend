import { useEffect, useState } from "react";
import { documentsService } from "@/services/api/documents";
import { Document, Block } from "@/types/documents";

export function useDocument(id: string) {
  const [document, setDocument] = useState<Document | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cargar documento
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
        console.error("Error cargando documento", err);
        setError("Error al cargar el documento");
      } finally {
        setLoading(false);
      }
    };
    fetchDoc();
  }, [id]);

  // Guardar cambios (Genérico)
  const saveChanges = async (updates: {
    title?: string;
    icon?: string;
    content?: Block[];
  }) => {
    if (!document) return;

    // Optimistic Update
    setDocument((prev) => (prev ? { ...prev, ...updates } : null));
    setSaving(true);

    try {
      await documentsService.update(id, updates);
    } catch (err) {
      console.error("Error guardando", err);
    } finally {
      setSaving(false);
    }
  };

  // --- NUEVA FUNCIÓN: AGREGAR BLOQUE ---
  const addBlock = (type: string, text: string = "") => {
    if (!document) return;

    const newBlock: Block = {
      id: crypto.randomUUID(), // Genera ID único en el navegador
      type,
      data: {
        text,
        checked: false, // Por defecto para todos
      },
    };

    // Creamos el nuevo array de contenido
    const newContent = [...(document.content || []), newBlock];

    // Guardamos usando la función existente
    saveChanges({ content: newContent });
  };

  const updateBlock = (blockId: string, newData: Partial<Block["data"]>) => {
    if (!document?.content) return;

    const newContent = document.content.map((block) =>
      block.id === blockId
        ? { ...block, data: { ...block.data, ...newData } } // Fusionamos los datos nuevos
        : block
    );

    // Guardamos sin llamar a la API en cada tecla (debounce lo ideal, pero esto sirve por ahora)
    // Para producción real usaríamos un debounce, aquí actualizamos el estado local rápido
    setDocument((prev) => (prev ? { ...prev, content: newContent } : null));

    // Guardamos en segundo plano (puedes comentar esto si es muy lento y guardar solo al salir)
    documentsService.update(id, { content: newContent });
  };

  // --- NUEVA: BORRAR BLOQUE ---
  const removeBlock = (blockId: string) => {
    if (!document?.content) return;
    const newContent = document.content.filter((b) => b.id !== blockId);
    saveChanges({ content: newContent });
  };

  return {
    document,
    loading,
    error,
    saving,
    saveChanges,
    addBlock,
    updateBlock,
    removeBlock,
  };
}
