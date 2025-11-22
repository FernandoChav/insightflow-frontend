// src/types/documents.ts

// Esta estructura debe coincidir con tu Entidad Block en C#
export interface Block {
  id: string;
  type: string;
  data: Record<string, unknown>;
}

// Esta estructura coincide con DocumentResponse de tu API
export interface Document {
  id: string;
  workspaceId: string;
  ownerId: string;
  title: string;
  icon: string;
  content: Block[];
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
}
export interface UpdateDocumentRequest {
  title?: string;
  icon?: string;
  content?: Block[]; // La lista de bloques actualizada
}
// El Wrapper que creamos en el backend (ApiResponse<T>)
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  errors: string[];
  data: T;
}
