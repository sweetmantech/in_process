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
      in_process_admins: {
        Row: {
          artist_address: string;
          collection: string;
          granted_at: string;
          hidden: boolean;
          id: string;
          token_id: number;
        };
        Insert: {
          artist_address: string;
          collection: string;
          granted_at: string;
          hidden?: boolean;
          id?: string;
          token_id: number;
        };
        Update: {
          artist_address?: string;
          collection?: string;
          granted_at?: string;
          hidden?: boolean;
          id?: string;
          token_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "in_process_admins_artist_address_fkey";
            columns: ["artist_address"];
            isOneToOne: false;
            referencedRelation: "in_process_artists";
            referencedColumns: ["address"];
          },
          {
            foreignKeyName: "in_process_admins_collection_fkey";
            columns: ["collection"];
            isOneToOne: false;
            referencedRelation: "in_process_collections";
            referencedColumns: ["id"];
          },
        ];
      };
      in_process_airdrops: {
        Row: {
          amount: number;
          artist_address: string;
          id: string;
          moment: string;
          updated_at: string;
        };
        Insert: {
          amount: number;
          artist_address: string;
          id?: string;
          moment?: string;
          updated_at: string;
        };
        Update: {
          amount?: number;
          artist_address?: string;
          id?: string;
          moment?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "in_process_airdrops_artist_address_fkey";
            columns: ["artist_address"];
            isOneToOne: false;
            referencedRelation: "in_process_artists";
            referencedColumns: ["address"];
          },
          {
            foreignKeyName: "in_process_airdrops_moment_fkey";
            columns: ["moment"];
            isOneToOne: false;
            referencedRelation: "in_process_moments";
            referencedColumns: ["id"];
          },
        ];
      };
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
      in_process_artist_phones: {
        Row: {
          artist_address: string;
          created_at: string;
          id: string;
          phone_number: string;
          verified: boolean;
        };
        Insert: {
          artist_address: string;
          created_at?: string;
          id?: string;
          phone_number: string;
          verified?: boolean;
        };
        Update: {
          artist_address?: string;
          created_at?: string;
          id?: string;
          phone_number?: string;
          verified?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: "in_process_artist_phones_artist_address_fkey";
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
      in_process_collections: {
        Row: {
          address: string;
          chain_id: number;
          created_at: string;
          default_admin: string;
          id: string;
          name: string;
          payout_recipient: string;
          updated_at: string;
          uri: string;
        };
        Insert: {
          address: string;
          chain_id: number;
          created_at: string;
          default_admin: string;
          id?: string;
          name?: string;
          payout_recipient: string;
          updated_at: string;
          uri: string;
        };
        Update: {
          address?: string;
          chain_id?: number;
          created_at?: string;
          default_admin?: string;
          id?: string;
          name?: string;
          payout_recipient?: string;
          updated_at?: string;
          uri?: string;
        };
        Relationships: [
          {
            foreignKeyName: "in_process_collections_default_admin_fkey";
            columns: ["default_admin"];
            isOneToOne: false;
            referencedRelation: "in_process_artists";
            referencedColumns: ["address"];
          },
        ];
      };
      in_process_moment_comments: {
        Row: {
          artist_address: string;
          comment: string | null;
          commented_at: string;
          id: string;
          moment: string;
        };
        Insert: {
          artist_address: string;
          comment?: string | null;
          commented_at?: string;
          id?: string;
          moment: string;
        };
        Update: {
          artist_address?: string;
          comment?: string | null;
          commented_at?: string;
          id?: string;
          moment?: string;
        };
        Relationships: [
          {
            foreignKeyName: "in_process_moment_comments_artist_address_fkey";
            columns: ["artist_address"];
            isOneToOne: false;
            referencedRelation: "in_process_artists";
            referencedColumns: ["address"];
          },
          {
            foreignKeyName: "in_process_moment_comments_moment_fkey";
            columns: ["moment"];
            isOneToOne: false;
            referencedRelation: "in_process_moments";
            referencedColumns: ["id"];
          },
        ];
      };
      in_process_moment_fee_recipients: {
        Row: {
          artist_address: string;
          created_at: string;
          id: string;
          moment: string;
          percent_allocation: number;
        };
        Insert: {
          artist_address: string;
          created_at?: string;
          id?: string;
          moment: string;
          percent_allocation: number;
        };
        Update: {
          artist_address?: string;
          created_at?: string;
          id?: string;
          moment?: string;
          percent_allocation?: number;
        };
        Relationships: [
          {
            foreignKeyName: "in_process_moment_fee_recipients_artist_address_fkey";
            columns: ["artist_address"];
            isOneToOne: false;
            referencedRelation: "in_process_artists";
            referencedColumns: ["address"];
          },
          {
            foreignKeyName: "in_process_moment_fee_recipients_moment_fkey";
            columns: ["moment"];
            isOneToOne: false;
            referencedRelation: "in_process_moments";
            referencedColumns: ["id"];
          },
        ];
      };
      in_process_moments: {
        Row: {
          collection: string;
          created_at: string;
          id: string;
          max_supply: number;
          token_id: number;
          updated_at: string;
          uri: string;
        };
        Insert: {
          collection: string;
          created_at: string;
          id?: string;
          max_supply: number;
          token_id: number;
          updated_at: string;
          uri: string;
        };
        Update: {
          collection?: string;
          created_at?: string;
          id?: string;
          max_supply?: number;
          token_id?: number;
          updated_at?: string;
          uri?: string;
        };
        Relationships: [
          {
            foreignKeyName: "in_process_moments_collection_fkey";
            columns: ["collection"];
            isOneToOne: false;
            referencedRelation: "in_process_collections";
            referencedColumns: ["id"];
          },
        ];
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
          amount: number;
          buyer: string;
          id: string;
          moment: string;
          transaction_hash: string;
          transferred_at: string;
        };
        Insert: {
          amount: number;
          buyer: string;
          id?: string;
          moment: string;
          transaction_hash: string;
          transferred_at: string;
        };
        Update: {
          amount?: number;
          buyer?: string;
          id?: string;
          moment?: string;
          transaction_hash?: string;
          transferred_at?: string;
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
            foreignKeyName: "in_process_payments_moment_fkey";
            columns: ["moment"];
            isOneToOne: false;
            referencedRelation: "in_process_moments";
            referencedColumns: ["id"];
          },
        ];
      };
      in_process_sales: {
        Row: {
          created_at: string;
          currency: string;
          funds_recipient: string;
          id: string;
          max_tokens_per_address: number;
          moment: string;
          price_per_token: number;
          sale_end: number;
          sale_start: number;
        };
        Insert: {
          created_at?: string;
          currency: string;
          funds_recipient: string;
          id?: string;
          max_tokens_per_address: number;
          moment: string;
          price_per_token: number;
          sale_end: number;
          sale_start: number;
        };
        Update: {
          created_at?: string;
          currency?: string;
          funds_recipient?: string;
          id?: string;
          max_tokens_per_address?: number;
          moment?: string;
          price_per_token?: number;
          sale_end?: number;
          sale_start?: number;
        };
        Relationships: [
          {
            foreignKeyName: "in_process_sales_moment_fkey";
            columns: ["moment"];
            isOneToOne: true;
            referencedRelation: "in_process_moments";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_artist_timeline: {
        Args: {
          p_artist: string;
          p_chainid?: number;
          p_hidden?: boolean;
          p_limit?: number;
          p_page?: number;
          p_type?: string;
        };
        Returns: Json;
      };
      get_collection_timeline: {
        Args: {
          p_chainid?: number;
          p_collection: string;
          p_hidden?: boolean;
          p_limit?: number;
          p_page?: number;
        };
        Returns: Json;
      };
      get_in_process_payments: {
        Args: {
          p_artists?: string[];
          p_chainid?: number;
          p_collectors?: string[];
          p_limit?: number;
          p_page?: number;
        };
        Returns: Json;
      };
      get_in_process_timeline: {
        Args: {
          p_chainid?: number;
          p_hidden?: boolean;
          p_limit?: number;
          p_page?: number;
        };
        Returns: Json;
      };
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
          p_type?: string;
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
