export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      pending_races: {
        Row: {
          associations: string[] | null
          city: string
          competition: string | null
          contact_email: string | null
          contact_phone: string | null
          country: string
          date: string
          description: string | null
          distances: string[]
          elevation_m: number | null
          end_date: string | null
          flyer_url: string | null
          hyrox_categories: string[] | null
          id: string
          instagram: string | null
          name: string
          notes: string | null
          organizer: string | null
          price_eur: number | null
          price_note: string | null
          region: string
          start_times: string[] | null
          status: string | null
          submitted_at: string | null
          type: string
          venue: string | null
          website: string | null
        }
        Insert: {
          associations?: string[] | null
          city: string
          competition?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          country?: string
          date: string
          description?: string | null
          distances: string[]
          elevation_m?: number | null
          end_date?: string | null
          flyer_url?: string | null
          hyrox_categories?: string[] | null
          id?: string
          instagram?: string | null
          name: string
          notes?: string | null
          organizer?: string | null
          price_eur?: number | null
          price_note?: string | null
          region: string
          start_times?: string[] | null
          status?: string | null
          submitted_at?: string | null
          type: string
          venue?: string | null
          website?: string | null
        }
        Update: {
          associations?: string[] | null
          city?: string
          competition?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          country?: string
          date?: string
          description?: string | null
          distances?: string[]
          elevation_m?: number | null
          end_date?: string | null
          flyer_url?: string | null
          hyrox_categories?: string[] | null
          id?: string
          instagram?: string | null
          name?: string
          notes?: string | null
          organizer?: string | null
          price_eur?: number | null
          price_note?: string | null
          region?: string
          start_times?: string[] | null
          status?: string | null
          submitted_at?: string | null
          type?: string
          venue?: string | null
          website?: string | null
        }
        Relationships: []
      }
      pending_run_clubs: {
        Row: {
          city: string
          contact_email: string | null
          country: string
          days: string[] | null
          description: string | null
          id: string
          instagram: string | null
          level: string[] | null
          name: string
          organizer: string | null
          price_eur: number | null
          region: string
          status: string | null
          strava: string | null
          submitted_at: string | null
          time: string | null
          website: string | null
          whatsapp: string | null
        }
        Insert: {
          city: string
          contact_email?: string | null
          country?: string
          days?: string[] | null
          description?: string | null
          id?: string
          instagram?: string | null
          level?: string[] | null
          name: string
          organizer?: string | null
          price_eur?: number | null
          region: string
          status?: string | null
          strava?: string | null
          submitted_at?: string | null
          time?: string | null
          website?: string | null
          whatsapp?: string | null
        }
        Update: {
          city?: string
          contact_email?: string | null
          country?: string
          days?: string[] | null
          description?: string | null
          id?: string
          instagram?: string | null
          level?: string[] | null
          name?: string
          organizer?: string | null
          price_eur?: number | null
          region?: string
          status?: string | null
          strava?: string | null
          submitted_at?: string | null
          time?: string | null
          website?: string | null
          whatsapp?: string | null
        }
        Relationships: []
      }
      races: {
        Row: {
          associations: string[] | null
          city: string
          competition: string | null
          contact_email: string | null
          contact_phone: string | null
          country: string
          created_at: string | null
          date: string
          description: string | null
          distances: string[]
          elevation_m: number | null
          end_date: string | null
          flyer_url: string | null
          hyrox_categories: string[] | null
          id: string
          instagram: string | null
          name: string
          organizer: string | null
          price_eur: number | null
          price_note: string | null
          private_email: string | null
          region: string
          start_times: string[] | null
          status: string | null
          type: string
          venue: string | null
          website: string | null
        }
        Insert: {
          associations?: string[] | null
          city: string
          competition?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          country?: string
          created_at?: string | null
          date: string
          description?: string | null
          distances: string[]
          elevation_m?: number | null
          end_date?: string | null
          flyer_url?: string | null
          hyrox_categories?: string[] | null
          id?: string
          instagram?: string | null
          name: string
          organizer?: string | null
          price_eur?: number | null
          price_note?: string | null
          private_email?: string | null
          region: string
          start_times?: string[] | null
          status?: string | null
          type: string
          venue?: string | null
          website?: string | null
        }
        Update: {
          associations?: string[] | null
          city?: string
          competition?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          country?: string
          created_at?: string | null
          date?: string
          description?: string | null
          distances?: string[]
          elevation_m?: number | null
          end_date?: string | null
          flyer_url?: string | null
          hyrox_categories?: string[] | null
          id?: string
          instagram?: string | null
          name?: string
          organizer?: string | null
          price_eur?: number | null
          price_note?: string | null
          private_email?: string | null
          region?: string
          start_times?: string[] | null
          status?: string | null
          type?: string
          venue?: string | null
          website?: string | null
        }
        Relationships: []
      }
      run_clubs: {
        Row: {
          city: string
          contact_email: string | null
          country: string
          created_at: string | null
          days: string[] | null
          description: string | null
          id: string
          instagram: string | null
          level: string[]
          name: string
          organizer: string | null
          price_eur: number | null
          region: string
          status: string | null
          strava: string | null
          time: string | null
          website: string | null
          whatsapp: string | null
        }
        Insert: {
          city: string
          contact_email?: string | null
          country?: string
          created_at?: string | null
          days?: string[] | null
          description?: string | null
          id?: string
          instagram?: string | null
          level: string[]
          name: string
          organizer?: string | null
          price_eur?: number | null
          region: string
          status?: string | null
          strava?: string | null
          time?: string | null
          website?: string | null
          whatsapp?: string | null
        }
        Update: {
          city?: string
          contact_email?: string | null
          country?: string
          created_at?: string | null
          days?: string[] | null
          description?: string | null
          id?: string
          instagram?: string | null
          level?: string[]
          name?: string
          organizer?: string | null
          price_eur?: number | null
          region?: string
          status?: string | null
          strava?: string | null
          time?: string | null
          website?: string | null
          whatsapp?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
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
