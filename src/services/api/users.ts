import { apiClient } from "./apiClient";
import { User } from "../../types/users";

const BASE_URL = process.env.NEXT_PUBLIC_USERS_API_BASE_URL;

export const getUsers = async () => {
  return apiClient.get<User[]>(`${BASE_URL}/api/users`);
}

export const createUser = async (userData: Partial<User>) => {
  return apiClient.post<User>(`${BASE_URL}/api/users`, userData);
}

export const getUserById = async (userId: string) => {
  return apiClient.get<User>(`${BASE_URL}/api/users/${userId}`);
}

export const updateUser = async (userId: string, userData: Partial<User>) => {
  return apiClient.patch<User>(`${BASE_URL}/api/users/${userId}`, userData);
}

export const deleteUser = async (userId: string): Promise<void> => {
  return apiClient.delete<void>(`${BASE_URL}/api/users/${userId}`);
}