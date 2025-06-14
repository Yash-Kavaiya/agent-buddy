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
      conversation_logs: {
        Row: {
          confidence_scores: Json | null
          created_at: string
          detected_entities: Json | null
          id: string
          language: string | null
          missing_entities: Json | null
          processed: boolean | null
          user_id: string | null
          user_input: string
        }
        Insert: {
          confidence_scores?: Json | null
          created_at?: string
          detected_entities?: Json | null
          id?: string
          language?: string | null
          missing_entities?: Json | null
          processed?: boolean | null
          user_id?: string | null
          user_input: string
        }
        Update: {
          confidence_scores?: Json | null
          created_at?: string
          detected_entities?: Json | null
          id?: string
          language?: string | null
          missing_entities?: Json | null
          processed?: boolean | null
          user_id?: string | null
          user_input?: string
        }
        Relationships: []
      }
      entities: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          display_name: string
          entity_type: string
          id: string
          is_composite: boolean | null
          language: string | null
          name: string
          parent_entity_id: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          display_name: string
          entity_type: string
          id?: string
          is_composite?: boolean | null
          language?: string | null
          name: string
          parent_entity_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          display_name?: string
          entity_type?: string
          id?: string
          is_composite?: boolean | null
          language?: string | null
          name?: string
          parent_entity_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "entities_parent_entity_id_fkey"
            columns: ["parent_entity_id"]
            isOneToOne: false
            referencedRelation: "entities"
            referencedColumns: ["id"]
          },
        ]
      }
      entity_analytics: {
        Row: {
          accuracy_score: number | null
          created_at: string
          date_tracked: string
          entity_id: string | null
          id: string
          last_used_at: string | null
          performance_data: Json | null
          usage_count: number | null
        }
        Insert: {
          accuracy_score?: number | null
          created_at?: string
          date_tracked?: string
          entity_id?: string | null
          id?: string
          last_used_at?: string | null
          performance_data?: Json | null
          usage_count?: number | null
        }
        Update: {
          accuracy_score?: number | null
          created_at?: string
          date_tracked?: string
          entity_id?: string | null
          id?: string
          last_used_at?: string | null
          performance_data?: Json | null
          usage_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "entity_analytics_entity_id_fkey"
            columns: ["entity_id"]
            isOneToOne: false
            referencedRelation: "entities"
            referencedColumns: ["id"]
          },
        ]
      }
      entity_relationships: {
        Row: {
          child_entity_id: string | null
          created_at: string
          id: string
          parent_entity_id: string | null
          relationship_type: string
          strength: number | null
        }
        Insert: {
          child_entity_id?: string | null
          created_at?: string
          id?: string
          parent_entity_id?: string | null
          relationship_type: string
          strength?: number | null
        }
        Update: {
          child_entity_id?: string | null
          created_at?: string
          id?: string
          parent_entity_id?: string | null
          relationship_type?: string
          strength?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "entity_relationships_child_entity_id_fkey"
            columns: ["child_entity_id"]
            isOneToOne: false
            referencedRelation: "entities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "entity_relationships_parent_entity_id_fkey"
            columns: ["parent_entity_id"]
            isOneToOne: false
            referencedRelation: "entities"
            referencedColumns: ["id"]
          },
        ]
      }
      entity_synonyms: {
        Row: {
          auto_generated: boolean | null
          confidence_score: number | null
          created_at: string
          entity_id: string | null
          id: string
          language: string | null
          synonym: string
        }
        Insert: {
          auto_generated?: boolean | null
          confidence_score?: number | null
          created_at?: string
          entity_id?: string | null
          id?: string
          language?: string | null
          synonym: string
        }
        Update: {
          auto_generated?: boolean | null
          confidence_score?: number | null
          created_at?: string
          entity_id?: string | null
          id?: string
          language?: string | null
          synonym?: string
        }
        Relationships: [
          {
            foreignKeyName: "entity_synonyms_entity_id_fkey"
            columns: ["entity_id"]
            isOneToOne: false
            referencedRelation: "entities"
            referencedColumns: ["id"]
          },
        ]
      }
      intents: {
        Row: {
          complexity: string | null
          created_at: string
          description: string | null
          display_name: string
          domain: string | null
          entity_types: string[] | null
          id: string
          include_entities: boolean | null
          include_negatives: boolean | null
          include_variations: boolean | null
          language: string | null
          phrase_count: number | null
          tone: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          complexity?: string | null
          created_at?: string
          description?: string | null
          display_name: string
          domain?: string | null
          entity_types?: string[] | null
          id?: string
          include_entities?: boolean | null
          include_negatives?: boolean | null
          include_variations?: boolean | null
          language?: string | null
          phrase_count?: number | null
          tone?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          complexity?: string | null
          created_at?: string
          description?: string | null
          display_name?: string
          domain?: string | null
          entity_types?: string[] | null
          id?: string
          include_entities?: boolean | null
          include_negatives?: boolean | null
          include_variations?: boolean | null
          language?: string | null
          phrase_count?: number | null
          tone?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      phrase_entities: {
        Row: {
          created_at: string
          end_index: number
          entity_type: string
          id: string
          phrase_id: string
          start_index: number
          value: string
        }
        Insert: {
          created_at?: string
          end_index: number
          entity_type: string
          id?: string
          phrase_id: string
          start_index: number
          value: string
        }
        Update: {
          created_at?: string
          end_index?: number
          entity_type?: string
          id?: string
          phrase_id?: string
          start_index?: number
          value?: string
        }
        Relationships: [
          {
            foreignKeyName: "phrase_entities_phrase_id_fkey"
            columns: ["phrase_id"]
            isOneToOne: false
            referencedRelation: "training_phrases"
            referencedColumns: ["id"]
          },
        ]
      }
      training_phrases: {
        Row: {
          confidence: number | null
          created_at: string
          id: string
          intent_id: string
          text: string
        }
        Insert: {
          confidence?: number | null
          created_at?: string
          id?: string
          intent_id: string
          text: string
        }
        Update: {
          confidence?: number | null
          created_at?: string
          id?: string
          intent_id?: string
          text?: string
        }
        Relationships: [
          {
            foreignKeyName: "training_phrases_intent_id_fkey"
            columns: ["intent_id"]
            isOneToOne: false
            referencedRelation: "intents"
            referencedColumns: ["id"]
          },
        ]
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
