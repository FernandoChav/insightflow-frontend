import { apiClient } from "./apiClient";
import {
  ApiResponse,
  Document,
  UpdateDocumentRequest,
} from "@/types/documents";

const BASE_URL = process.env.NEXT_PUBLIC_API_DOCUMENTS_URL;

export const documentsService = {
  // GET: Obtener todos los docs de un workspace
  getByWorkspace: async (workspaceId: string) => {
    const url = `${BASE_URL}/api/documents/workspace/${workspaceId}`;
    return apiClient.get<ApiResponse<Document[]>>(url);
  },

  // GET: Obtener un doc por ID
  getById: async (id: string) => {
    const url = `${BASE_URL}/api/documents/${id}`;
    return apiClient.get<ApiResponse<Document>>(url);
  },

  // POST: Crear documento
  create: async (data: {
    workspaceId: string;
    userId: string;
    title: string;
    icon?: string;
  }) => {
    const url = `${BASE_URL}/api/documents`;
    return apiClient.post<ApiResponse<Document>>(url, data);
  },

  // DELETE: Borrar documento
  delete: async (id: string) => {
    const url = `${BASE_URL}/api/documents/${id}`;
    return apiClient.delete<ApiResponse<boolean>>(url);
  },
  update: async (id: string, data: UpdateDocumentRequest) => {
    const url = `${BASE_URL}/api/documents/${id}`;
    return apiClient.patch<ApiResponse<Document>>(url, data);
  },
};
