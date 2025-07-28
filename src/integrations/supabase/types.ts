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
      classified_posts: {
        Row: {
          action_type: string | null
          area: string | null
          city: string | null
          created_at: string | null
          group_url: string | null
          heat_score: number | null
          id: string
          intent: string | null
          original_post_id: number | null
          original_text: string | null
          post_url: string | null
          poster_profile: string | null
          summary: string | null
          tags: string[] | null
        }
        Insert: {
          action_type?: string | null
          area?: string | null
          city?: string | null
          created_at?: string | null
          group_url?: string | null
          heat_score?: number | null
          id?: string
          intent?: string | null
          original_post_id?: number | null
          original_text?: string | null
          post_url?: string | null
          poster_profile?: string | null
          summary?: string | null
          tags?: string[] | null
        }
        Update: {
          action_type?: string | null
          area?: string | null
          city?: string | null
          created_at?: string | null
          group_url?: string | null
          heat_score?: number | null
          id?: string
          intent?: string | null
          original_post_id?: number | null
          original_text?: string | null
          post_url?: string | null
          poster_profile?: string | null
          summary?: string | null
          tags?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "classified_posts_original_post_id_fkey"
            columns: ["original_post_id"]
            isOneToOne: false
            referencedRelation: "real_estate_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      Client_post_match: {
        Row: {
          clicked: boolean | null
          client_id: number | null
          created_at: string
          id: number
          is_relevant: boolean | null
          post_id: number | null
        }
        Insert: {
          clicked?: boolean | null
          client_id?: number | null
          created_at?: string
          id?: number
          is_relevant?: boolean | null
          post_id?: number | null
        }
        Update: {
          clicked?: boolean | null
          client_id?: number | null
          created_at?: string
          id?: number
          is_relevant?: boolean | null
          post_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "Client_post_match_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "Clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Client_post_match_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "Group_Posts"
            referencedColumns: ["id"]
          },
        ]
      }
      Clients: {
        Row: {
          active: boolean | null
          business_description: string | null
          email: string | null
          email_updates: boolean | null
          filter_request: string | null
          id: number
          joined_at: string
          name: string
          Paid: boolean | null
          password: string | null
          Profession: string | null
          requests: string | null
          telegram_id: string | null
        }
        Insert: {
          active?: boolean | null
          business_description?: string | null
          email?: string | null
          email_updates?: boolean | null
          filter_request?: string | null
          id?: number
          joined_at?: string
          name: string
          Paid?: boolean | null
          password?: string | null
          Profession?: string | null
          requests?: string | null
          telegram_id?: string | null
        }
        Update: {
          active?: boolean | null
          business_description?: string | null
          email?: string | null
          email_updates?: boolean | null
          filter_request?: string | null
          id?: number
          joined_at?: string
          name?: string
          Paid?: boolean | null
          password?: string | null
          Profession?: string | null
          requests?: string | null
          telegram_id?: string | null
        }
        Relationships: []
      }
      Feedback: {
        Row: {
          Cancel: string | null
          Client_id: string | null
          created_at: string
          id: number
          text: string | null
        }
        Insert: {
          Cancel?: string | null
          Client_id?: string | null
          created_at?: string
          id?: number
          text?: string | null
        }
        Update: {
          Cancel?: string | null
          Client_id?: string | null
          created_at?: string
          id?: number
          text?: string | null
        }
        Relationships: []
      }
      Group_Posts: {
        Row: {
          category: string | null
          comments_count: string | null
          created_at: string | null
          group_url: string | null
          id: number
          poster_profile: string | null
          scanned_at: string
          text: string | null
          url: string | null
        }
        Insert: {
          category?: string | null
          comments_count?: string | null
          created_at?: string | null
          group_url?: string | null
          id?: number
          poster_profile?: string | null
          scanned_at?: string
          text?: string | null
          url?: string | null
        }
        Update: {
          category?: string | null
          comments_count?: string | null
          created_at?: string | null
          group_url?: string | null
          id?: number
          poster_profile?: string | null
          scanned_at?: string
          text?: string | null
          url?: string | null
        }
        Relationships: []
      }
      Groups: {
        Row: {
          active: boolean
          category: string | null
          created_at: string
          id: number
          name: string
          url: string
        }
        Insert: {
          active?: boolean
          category?: string | null
          created_at?: string
          id?: number
          name: string
          url: string
        }
        Update: {
          active?: boolean
          category?: string | null
          created_at?: string
          id?: number
          name?: string
          url?: string
        }
        Relationships: []
      }
      Posts: {
        Row: {
          created_at: string
          url: string
          userID: string
        }
        Insert: {
          created_at?: string
          url: string
          userID: string
        }
        Update: {
          created_at?: string
          url?: string
          userID?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          business_description: string | null
          business_type: string | null
          created_at: string
          current_leads: number | null
          email_updates: boolean | null
          filter_request: string | null
          id: string
          name: string
          profession: string | null
          specific_requests: string | null
          target_area: string | null
          target_leads: number | null
          telegram_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          business_description?: string | null
          business_type?: string | null
          created_at?: string
          current_leads?: number | null
          email_updates?: boolean | null
          filter_request?: string | null
          id?: string
          name: string
          profession?: string | null
          specific_requests?: string | null
          target_area?: string | null
          target_leads?: number | null
          telegram_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          business_description?: string | null
          business_type?: string | null
          created_at?: string
          current_leads?: number | null
          email_updates?: boolean | null
          filter_request?: string | null
          id?: string
          name?: string
          profession?: string | null
          specific_requests?: string | null
          target_area?: string | null
          target_leads?: number | null
          telegram_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      real_estate_groups: {
        Row: {
          active: boolean
          category: string | null
          city: string | null
          created_at: string
          id: number
          name: string
          region: string | null
          url: string
        }
        Insert: {
          active?: boolean
          category?: string | null
          city?: string | null
          created_at?: string
          id?: number
          name: string
          region?: string | null
          url: string
        }
        Update: {
          active?: boolean
          category?: string | null
          city?: string | null
          created_at?: string
          id?: number
          name?: string
          region?: string | null
          url?: string
        }
        Relationships: []
      }
      real_estate_posts: {
        Row: {
          category: string | null
          comments_count: string | null
          created_at: string | null
          group_url: string | null
          id: number
          poster_profile: string | null
          scanned_at: string
          text: string | null
          url: string | null
        }
        Insert: {
          category?: string | null
          comments_count?: string | null
          created_at?: string | null
          group_url?: string | null
          id?: number
          poster_profile?: string | null
          scanned_at?: string
          text?: string | null
          url?: string | null
        }
        Update: {
          category?: string | null
          comments_count?: string | null
          created_at?: string | null
          group_url?: string | null
          id?: number
          poster_profile?: string | null
          scanned_at?: string
          text?: string | null
          url?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      user_post_counts: {
        Row: {
          total_urls: number | null
          userID: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      get_unmatched_group_posts: {
        Args: { client_id_input: number }
        Returns: {
          category: string | null
          comments_count: string | null
          created_at: string | null
          group_url: string | null
          id: number
          poster_profile: string | null
          scanned_at: string
          text: string | null
          url: string | null
        }[]
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
