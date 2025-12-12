import { Workspace } from "@/types/workspaces";

// URL Base del Backend (Render o Localhost)
const BASE_URL = process.env.NEXT_PUBLIC_WORKSPACE_API_BASE_URL;

export const workspacesService = {
  // 1. Obtener Workspaces por Usuario
  getByUser: async (userId: string): Promise<Workspace[]> => {
    const res = await fetch(`${BASE_URL}/user/${userId}`);
    if (!res.ok) throw new Error("Error al obtener workspaces");
    return res.json();
  },

  // 2. Crear Workspace (Manejo de Archivos)
  create: async (data: {
    name: string;
    description: string;
    theme: string;
    userId: string;
    iconFile: File; 
  }): Promise<Workspace> => {
    const formData = new FormData();
    formData.append("Name", data.name);
    formData.append("Description", data.description);
    formData.append("Theme", data.theme);
    formData.append("UserId", data.userId);
    formData.append("Icon", data.iconFile); // Debe coincidir con 'IFormFile Icon' en tu DTO C#

    const res = await fetch(BASE_URL, {
      method: "POST",
      body: formData, // El navegador pone el Content-Type multipart/form-data automáticamente
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || "Error al crear workspace");
    }
    return res.json();
  },

  // 3. Eliminar (Soft Delete)
  delete: async (workspaceId: string, requesterId: string): Promise<void> => {
    const res = await fetch(`${BASE_URL}/${workspaceId}?requesterId=${requesterId}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Error al eliminar workspace");
  },
};
