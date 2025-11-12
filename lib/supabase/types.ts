export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          extensions?: Json;
          operationName?: string;
          query?: string;
          variables?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      in_process_api_keys: {
        Row: {
          artist_address: string | null;
          created_at: string;
          id: string;
          key_hash: string | null;
          last_used: string | null;
          name: string;
        };
        Insert: {
          artist_address?: string | null;
          created_at?: string;
          id?: string;
          key_hash?: string | null;
          last_used?: string | null;
          name: string;
        };
        Update: {
          artist_address?: string | null;
          created_at?: string;
          id?: string;
          key_hash?: string | null;
          last_used?: string | null;
          name?: string;
        };
        Relationships: [
          {
            foreignKeyName: "in_process_api_keys_artist_address_fkey";
            columns: ["artist_address"];
            isOneToOne: false;
            referencedRelation: "in_process_artists";
            referencedColumns: ["address"];
          },
        ];
      };
      in_process_artist_social_wallets: {
        Row: {
          artist_address: string;
          created_at: string;
          social_wallet: string;
        };
        Insert: {
          artist_address: string;
          created_at?: string;
          social_wallet: string;
        };
        Update: {
          artist_address?: string;
          created_at?: string;
          social_wallet?: string;
        };
        Relationships: [
          {
            foreignKeyName: "in_process_artist_social_wallets_artist_address_fkey";
            columns: ["artist_address"];
            isOneToOne: false;
            referencedRelation: "in_process_artists";
            referencedColumns: ["address"];
          },
        ];
      };
      in_process_artists: {
        Row: {
          address: string;
          bio: string | null;
          farcaster_username: string | null;
          instagram_username: string | null;
          smart_wallet: string | null;
          telegram_username: string | null;
          twitter_username: string | null;
          username: string | null;
        };
        Insert: {
          address: string;
          bio?: string | null;
          farcaster_username?: string | null;
          instagram_username?: string | null;
          smart_wallet?: string | null;
          telegram_username?: string | null;
          twitter_username?: string | null;
          username?: string | null;
        };
        Update: {
          address?: string;
          bio?: string | null;
          farcaster_username?: string | null;
          instagram_username?: string | null;
          smart_wallet?: string | null;
          telegram_username?: string | null;
          twitter_username?: string | null;
          username?: string | null;
        };
        Relationships: [];
      };
      in_process_notifications: {
        Row: {
          artist: string;
          created_at: string | null;
          id: string;
          payment: string;
          viewed: boolean;
        };
        Insert: {
          artist: string;
          created_at?: string | null;
          id?: string;
          payment: string;
          viewed?: boolean;
        };
        Update: {
          artist?: string;
          created_at?: string | null;
          id?: string;
          payment?: string;
          viewed?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: "in_process_notifications_artist_fkey";
            columns: ["artist"];
            isOneToOne: false;
            referencedRelation: "in_process_artists";
            referencedColumns: ["address"];
          },
          {
            foreignKeyName: "in_process_notifications_payment_fkey";
            columns: ["payment"];
            isOneToOne: false;
            referencedRelation: "in_process_payments";
            referencedColumns: ["id"];
          },
        ];
      };
      in_process_payments: {
        Row: {
          amount: number | null;
          block: number | null;
          buyer: string | null;
          hash: string | null;
          id: string;
          token: string;
        };
        Insert: {
          amount?: number | null;
          block?: number | null;
          buyer?: string | null;
          hash?: string | null;
          id?: string;
          token: string;
        };
        Update: {
          amount?: number | null;
          block?: number | null;
          buyer?: string | null;
          hash?: string | null;
          id?: string;
          token?: string;
        };
        Relationships: [
          {
            foreignKeyName: "in_process_payments_buyer_fkey";
            columns: ["buyer"];
            isOneToOne: false;
            referencedRelation: "in_process_artists";
            referencedColumns: ["address"];
          },
          {
            foreignKeyName: "in_process_payments_token_fkey";
            columns: ["token"];
            isOneToOne: false;
            referencedRelation: "in_process_tokens";
            referencedColumns: ["id"];
          },
        ];
      };
      in_process_token_admins: {
        Row: {
          artist_address: string | null;
          created_at: string;
          id: string;
          token_id: string | null;
        };
        Insert: {
          artist_address?: string | null;
          created_at?: string;
          id?: string;
          token_id?: string | null;
        };
        Update: {
          artist_address?: string | null;
          created_at?: string;
          id?: string;
          token_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "in_process_token_admins_artist_address_fkey";
            columns: ["artist_address"];
            isOneToOne: false;
            referencedRelation: "in_process_artists";
            referencedColumns: ["address"];
          },
          {
            foreignKeyName: "in_process_token_admins_token_id_fkey";
            columns: ["token_id"];
            isOneToOne: false;
            referencedRelation: "in_process_tokens";
            referencedColumns: ["id"];
          },
        ];
      };
      in_process_tokens: {
        Row: {
          address: string;
          chainId: number;
          createdAt: string;
          defaultAdmin: string;
          hidden: boolean;
          id: string;
          payoutRecipient: string | null;
          tokenId: number;
          uri: string;
        };
        Insert: {
          address?: string;
          chainId: number;
          createdAt: string;
          defaultAdmin?: string;
          hidden?: boolean;
          id?: string;
          payoutRecipient?: string | null;
          tokenId: number;
          uri?: string;
        };
        Update: {
          address?: string;
          chainId?: number;
          createdAt?: string;
          defaultAdmin?: string;
          hidden?: boolean;
          id?: string;
          payoutRecipient?: string | null;
          tokenId?: number;
          uri?: string;
        };
        Relationships: [
          {
            foreignKeyName: "fk_defaultadmin_artist";
            columns: ["defaultAdmin"];
            isOneToOne: false;
            referencedRelation: "in_process_artists";
            referencedColumns: ["address"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_in_process_tokens: {
        Args: {
          p_addresses?: string[];
          p_artist?: string;
          p_chainid?: number;
          p_hidden?: boolean;
          p_latest?: boolean;
          p_limit?: number;
          p_page?: number;
          p_tokenids?: number[];
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const;
