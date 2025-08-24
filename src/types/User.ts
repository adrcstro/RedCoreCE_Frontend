import type { Role } from "./Role";

export interface User {
  id?: number;
  name: string;
  email: string;
  password?: string;
  password_confirmation?: string;
  role_id: number;
  role?: Role;
  created_at?: string;
  updated_at?: string;
}

export interface LoginData {
  email: string;
  password: string;
}