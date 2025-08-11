// src/types/user.ts
import { Session } from '@supabase/supabase-js';

export interface UserProfile {
  id: string;
  email: string;
  nombre_completo: string;
  // --- FIX: Se usan los roles correctos de la base de datos ---
  rol: 'super_admin' | 'admin_departamento' | 'usuario'; 
  sede_id: string | null;
  departamento_id: string | null;
  activo: boolean;
}

export interface AuthContextType {
  session: Session | null;
  user: UserProfile | null;
  logout: () => Promise<void>;
  loading: boolean;
  isAuthenticated: boolean;
}