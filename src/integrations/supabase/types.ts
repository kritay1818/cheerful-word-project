export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      Client_post_match: {
        Row: {
          client_id: number | null
          created_at: string
          id: number
          is_relevant: boolean | null
          post_id: number | null
        }
        Insert: {
          client_id?: number | null
          created_at?: string
          id?: number
          is_relevant?: boolean | null
          post_id?: number | null
        }
        Update: {
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
          email: string | null
          filter_request: string | null
          id: number
          joined_at: string
          name: string
          password: string | null
          Profession: string | null
          telegram_id: string | null
        }
        Insert: {
          active?: boolean | null
          email?: string | null
          filter_request?: string | null
          id?: number
          joined_at?: string
          name: string
          password?: string | null
          Profession?: string | null
          telegram_id?: string | null
        }
        Update: {
          active?: boolean | null
          email?: string | null
          filter_request?: string | null
          id?: number
          joined_at?: string
          name?: string
          password?: string | null
          Profession?: string | null
          telegram_id?: string | null
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
          active: boolean | null
          category: string | null
          created_at: string
          id: number
          name: string
          url: string
        }
        Insert: {
          active?: boolean | null
          category?: string | null
          created_at?: string
          id?: number
          name: string
          url: string
        }
        Update: {
          active?: boolean | null
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
