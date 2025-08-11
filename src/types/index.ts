// src/types/index.ts

import { Database } from './supabase';

// --- TIPOS PRINCIPALES DE LA BASE DE DATOS ---
export type Material = Database['public']['Tables']['materiales']['Row'];
export type Categoria = Database['public']['Tables']['categorias']['Row'];
export type Herramienta = Database['public']['Tables']['herramientas']['Row'];
export type Sede = Database['public']['Tables']['sedes']['Row'];
export type Departamento = Database['public']['Tables']['departamentos']['Row'];
export type MovimientoStock = Database['public']['Tables']['movimientos_stock']['Row'];
export type Prestamo = Database['public']['Tables']['prestamos']['Row'];

// --- TIPOS PARA FORMULARIOS (INSERT Y UPDATE) ---
export type MaterialInsert = Database['public']['Tables']['materiales']['Insert'];
export type MaterialUpdate = Database['public']['Tables']['materiales']['Update'];