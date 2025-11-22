import { useEffect, useState } from "react";
import { documentsService } from "@/services/api/documents";
import { Document } from "@/types/documents";

export function useWorkspaceDocuments(workspaceId: string) {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!workspaceId) return;

    const fetchDocs = async () => {
      try {
        setLoading(true);
        const response = await documentsService.getByWorkspace(workspaceId);
        if (response.success) {
          setDocuments(response.data);
        } else {
          setError(response.message);
        }
      } catch (err) {
        setError("Error al cargar documentos");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDocs();
  }, [workspaceId]);

  return { documents, loading, error };
}
