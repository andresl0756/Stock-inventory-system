export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      actividad_tiempo_real: {
        Row: {
          datos_adicionales: Json | null
          departamento_id: string | null
          descripcion: string
          entidad_id: string | null
          entidad_tipo: string | null
          id: string
          timestamp: string | null
          tipo_actividad: string
          usuario_id: string | null
        }
        Insert: {
          datos_adicionales?: Json | null
          departamento_id?: string | null
          descripcion: string
          entidad_id?: string | null
          entidad_tipo?: string | null
          id?: string
          timestamp?: string | null
          tipo_actividad: string
          usuario_id?: string | null
        }
        Update: {
          datos_adicionales?: Json | null
          departamento_id?: string | null
          descripcion?: string
          entidad_id?: string | null
          entidad_tipo?: string | null
          id?: string
          timestamp?: string | null
          tipo_actividad?: string
          usuario_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "actividad_tiempo_real_departamento_id_fkey"
            columns: ["departamento_id"]
            isOneToOne: false
            referencedRelation: "departamentos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "actividad_tiempo_real_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      categorias: {
        Row: {
          activa: boolean | null
          color: string | null
          departamento_id: string
          descripcion: string | null
          icono: string | null
          id: string
          nombre: string
          orden: number | null
        }
        Insert: {
          activa?: boolean | null
          color?: string | null
          departamento_id: string
          descripcion?: string | null
          icono?: string | null
          id?: string
          nombre: string
          orden?: number | null
        }
        Update: {
          activa?: boolean | null
          color?: string | null
          departamento_id?: string
          descripcion?: string | null
          icono?: string | null
          id?: string
          nombre?: string
          orden?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "categorias_departamento_id_fkey"
            columns: ["departamento_id"]
            isOneToOne: false
            referencedRelation: "departamentos"
            referencedColumns: ["id"]
          },
        ]
      }
      configuracion_departamento: {
        Row: {
          color_primario: string | null
          color_secundario: string | null
          departamento_id: string
          habilitar_qr: boolean | null
          id: string
          nombre_herramientas: string | null
          nombre_inventario: string | null
          nombre_materiales: string | null
          termino_egreso: string | null
          termino_ingreso: string | null
          updated_at: string | null
        }
        Insert: {
          color_primario?: string | null
          color_secundario?: string | null
          departamento_id: string
          habilitar_qr?: boolean | null
          id?: string
          nombre_herramientas?: string | null
          nombre_inventario?: string | null
          nombre_materiales?: string | null
          termino_egreso?: string | null
          termino_ingreso?: string | null
          updated_at?: string | null
        }
        Update: {
          color_primario?: string | null
          color_secundario?: string | null
          departamento_id?: string
          habilitar_qr?: boolean | null
          id?: string
          nombre_herramientas?: string | null
          nombre_inventario?: string | null
          nombre_materiales?: string | null
          termino_egreso?: string | null
          termino_ingreso?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "configuracion_departamento_departamento_id_fkey"
            columns: ["departamento_id"]
            isOneToOne: true
            referencedRelation: "departamentos"
            referencedColumns: ["id"]
          },
        ]
      }
      departamentos: {
        Row: {
          activo: boolean | null
          configuracion: Json | null
          created_at: string | null
          descripcion: string | null
          id: string
          nombre: string
          prefijo_codigo: string
          sede_id: string
        }
        Insert: {
          activo?: boolean | null
          configuracion?: Json | null
          created_at?: string | null
          descripcion?: string | null
          id?: string
          nombre: string
          prefijo_codigo: string
          sede_id: string
        }
        Update: {
          activo?: boolean | null
          configuracion?: Json | null
          created_at?: string | null
          descripcion?: string | null
          id?: string
          nombre?: string
          prefijo_codigo?: string
          sede_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "departamentos_sede_id_fkey"
            columns: ["sede_id"]
            isOneToOne: false
            referencedRelation: "sedes"
            referencedColumns: ["id"]
          },
        ]
      }
      herramientas: {
        Row: {
          activa: boolean | null
          codigo: string
          created_at: string | null
          created_by: string | null
          departamento_id: string
          descripcion: string | null
          estado: string | null
          fecha_compra: string | null
          id: string
          marca: string | null
          nombre: string
          numero_serie: string | null
          qr_code: string | null
          ubicacion: string | null
        }
        Insert: {
          activa?: boolean | null
          codigo: string
          created_at?: string | null
          created_by?: string | null
          departamento_id: string
          descripcion?: string | null
          estado?: string | null
          fecha_compra?: string | null
          id?: string
          marca?: string | null
          nombre: string
          numero_serie?: string | null
          qr_code?: string | null
          ubicacion?: string | null
        }
        Update: {
          activa?: boolean | null
          codigo?: string
          created_at?: string | null
          created_by?: string | null
          departamento_id?: string
          descripcion?: string | null
          estado?: string | null
          fecha_compra?: string | null
          id?: string
          marca?: string | null
          nombre?: string
          numero_serie?: string | null
          qr_code?: string | null
          ubicacion?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "herramientas_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "herramientas_departamento_id_fkey"
            columns: ["departamento_id"]
            isOneToOne: false
            referencedRelation: "departamentos"
            referencedColumns: ["id"]
          },
        ]
      }
      materiales: {
        Row: {
          activo: boolean | null
          categoria_id: string | null
          codigo: string
          created_at: string | null
          created_by: string | null
          departamento_id: string
          descripcion: string | null
          id: string
          marca: string | null
          nombre: string
          precio: number | null
          qr_code: string | null
          stock_actual: number | null
          stock_maximo: number | null
          stock_minimo: number | null
          ubicacion: string | null
          unidad: string
        }
        Insert: {
          activo?: boolean | null
          categoria_id?: string | null
          codigo: string
          created_at?: string | null
          created_by?: string | null
          departamento_id: string
          descripcion?: string | null
          id?: string
          marca?: string | null
          nombre: string
          precio?: number | null
          qr_code?: string | null
          stock_actual?: number | null
          stock_maximo?: number | null
          stock_minimo?: number | null
          ubicacion?: string | null
          unidad: string
        }
        Update: {
          activo?: boolean | null
          categoria_id?: string | null
          codigo?: string
          created_at?: string | null
          created_by?: string | null
          departamento_id?: string
          descripcion?: string | null
          id?: string
          marca?: string | null
          nombre?: string
          precio?: number | null
          qr_code?: string | null
          stock_actual?: number | null
          stock_maximo?: number | null
          stock_minimo?: number | null
          ubicacion?: string | null
          unidad?: string
        }
        Relationships: [
          {
            foreignKeyName: "materiales_categoria_id_fkey"
            columns: ["categoria_id"]
            isOneToOne: false
            referencedRelation: "categorias"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "materiales_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "materiales_departamento_id_fkey"
            columns: ["departamento_id"]
            isOneToOne: false
            referencedRelation: "departamentos"
            referencedColumns: ["id"]
          },
        ]
      }
      materials: {
        Row: {
          brand: string | null
          category: string
          code: string
          created_at: string | null
          current_stock: number
          description: string | null
          id: string
          location: string
          max_stock: number
          min_stock: number
          name: string
          price: number
          unit: string
        }
        Insert: {
          brand?: string | null
          category: string
          code: string
          created_at?: string | null
          current_stock: number
          description?: string | null
          id?: string
          location: string
          max_stock: number
          min_stock: number
          name: string
          price: number
          unit: string
        }
        Update: {
          brand?: string | null
          category?: string
          code?: string
          created_at?: string | null
          current_stock?: number
          description?: string | null
          id?: string
          location?: string
          max_stock?: number
          min_stock?: number
          name?: string
          price?: number
          unit?: string
        }
        Relationships: []
      }
      movimientos_stock: {
        Row: {
          cantidad: number
          fecha: string | null
          id: string
          material_id: string
          motivo: string | null
          notas: string | null
          stock_anterior: number
          stock_nuevo: number
          tipo: string | null
          usuario_id: string
        }
        Insert: {
          cantidad: number
          fecha?: string | null
          id?: string
          material_id: string
          motivo?: string | null
          notas?: string | null
          stock_anterior: number
          stock_nuevo: number
          tipo?: string | null
          usuario_id: string
        }
        Update: {
          cantidad?: number
          fecha?: string | null
          id?: string
          material_id?: string
          motivo?: string | null
          notas?: string | null
          stock_anterior?: number
          stock_nuevo?: number
          tipo?: string | null
          usuario_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "movimientos_stock_material_id_fkey"
            columns: ["material_id"]
            isOneToOne: false
            referencedRelation: "materiales"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "movimientos_stock_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      prestamos: {
        Row: {
          departamento_id: string
          estado: string | null
          fecha_devolucion_programada: string
          fecha_devolucion_real: string | null
          fecha_prestamo: string | null
          herramienta_id: string
          id: string
          observaciones: string | null
          receptor_info: string
          usuario_autoriza_id: string
        }
        Insert: {
          departamento_id: string
          estado?: string | null
          fecha_devolucion_programada: string
          fecha_devolucion_real?: string | null
          fecha_prestamo?: string | null
          herramienta_id: string
          id?: string
          observaciones?: string | null
          receptor_info: string
          usuario_autoriza_id: string
        }
        Update: {
          departamento_id?: string
          estado?: string | null
          fecha_devolucion_programada?: string
          fecha_devolucion_real?: string | null
          fecha_prestamo?: string | null
          herramienta_id?: string
          id?: string
          observaciones?: string | null
          receptor_info?: string
          usuario_autoriza_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "prestamos_departamento_id_fkey"
            columns: ["departamento_id"]
            isOneToOne: false
            referencedRelation: "departamentos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "prestamos_herramienta_id_fkey"
            columns: ["herramienta_id"]
            isOneToOne: false
            referencedRelation: "herramientas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "prestamos_usuario_autoriza_id_fkey"
            columns: ["usuario_autoriza_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      sedes: {
        Row: {
          activa: boolean | null
          ciudad: string | null
          created_at: string | null
          direccion: string | null
          fecha_vencimiento: string | null
          id: string
          nombre: string
          plan: string | null
          region: string | null
        }
        Insert: {
          activa?: boolean | null
          ciudad?: string | null
          created_at?: string | null
          direccion?: string | null
          fecha_vencimiento?: string | null
          id?: string
          nombre: string
          plan?: string | null
          region?: string | null
        }
        Update: {
          activa?: boolean | null
          ciudad?: string | null
          created_at?: string | null
          direccion?: string | null
          fecha_vencimiento?: string | null
          id?: string
          nombre?: string
          plan?: string | null
          region?: string | null
        }
        Relationships: []
      }
      tool_loans: {
        Row: {
          created_at: string
          estimated_return_date: string
          id: string
          loan_date: string
          return_date: string | null
          tool_id: string
          user: string
        }
        Insert: {
          created_at?: string
          estimated_return_date: string
          id?: string
          loan_date?: string
          return_date?: string | null
          tool_id: string
          user: string
        }
        Update: {
          created_at?: string
          estimated_return_date?: string
          id?: string
          loan_date?: string
          return_date?: string | null
          tool_id?: string
          user?: string
        }
        Relationships: [
          {
            foreignKeyName: "tool_loans_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "tools"
            referencedColumns: ["id"]
          },
        ]
      }
      tools: {
        Row: {
          brand: string
          code: string
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          name: string
          status: string
        }
        Insert: {
          brand: string
          code: string
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          name: string
          status?: string
        }
        Update: {
          brand?: string
          code?: string
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          name?: string
          status?: string
        }
        Relationships: []
      }
      usuarios: {
        Row: {
          activo: boolean | null
          created_at: string | null
          departamento_id: string | null
          email: string
          id: string
          nombre_completo: string
          rol: string | null
          sede_id: string | null
          ultimo_acceso: string | null
        }
        Insert: {
          activo?: boolean | null
          created_at?: string | null
          departamento_id?: string | null
          email: string
          id: string
          nombre_completo: string
          rol?: string | null
          sede_id?: string | null
          ultimo_acceso?: string | null
        }
        Update: {
          activo?: boolean | null
          created_at?: string | null
          departamento_id?: string | null
          email?: string
          id?: string
          nombre_completo?: string
          rol?: string | null
          sede_id?: string | null
          ultimo_acceso?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "usuarios_departamento_id_fkey"
            columns: ["departamento_id"]
            isOneToOne: false
            referencedRelation: "departamentos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "usuarios_sede_id_fkey"
            columns: ["sede_id"]
            isOneToOne: false
            referencedRelation: "sedes"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_department: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_user_role: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      is_super_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
