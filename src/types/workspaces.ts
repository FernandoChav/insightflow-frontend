// src/types/workspaces.ts

export interface WorkspaceMember {
  userId: string;
  role: string;
}

export interface Workspace {
  id: string;
  name: string;
  description: string;
  theme: string;
  iconUrl: string;
  ownerId: string;
  members: WorkspaceMember[];
  isActive: boolean;
}

export interface ApiResponse<T> {
  // Controller devuelve: return Ok(_service.GetAll()); -> List<Workspace> directo.
}