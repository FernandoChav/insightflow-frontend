import { useEffect, useState, useCallback } from "react";
import { workspacesService } from "@/services/api/workspaces";
import { Workspace } from "@/types/workspaces";

// ID de userA (Propietario en tu seeder)
const CURRENT_USER_ID = "11111111-1111-1111-1111-111111111111";

export function useWorkspaces() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWorkspaces = useCallback(async () => {
    try {
      setLoading(true);
      // Llama a tu endpoint GET /user/{id}
      const data = await workspacesService.getByUser(CURRENT_USER_ID);
      setWorkspaces(data);
    } catch (err) {
      console.error(err);
      setError("Error al cargar tus espacios de trabajo");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWorkspaces();
  }, [fetchWorkspaces]);

  const createWorkspace = async (name: string, desc: string, theme: string, icon: File) => {
    try {
      await workspacesService.create({
        name,
        description: desc,
        theme,
        userId: CURRENT_USER_ID,
        iconFile: icon
      });
      fetchWorkspaces(); 
      return true;
    } catch (err) {
      console.error(err);
      alert("Error al crear workspace");
      return false;
    }
  };

  const deleteWorkspace = async (id: string) => {
    try {
      await workspacesService.delete(id, CURRENT_USER_ID);
      fetchWorkspaces(); // Refresca la lista tras borrar
    } catch (err) {
      console.error(err);
      alert("Error al eliminar");
    }
  };

  return { workspaces, loading, error, createWorkspace, deleteWorkspace, currentUserId: CURRENT_USER_ID };
}