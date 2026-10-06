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
      dealer_lots: {
        Row: {
          arrival_date: string
          created_at: string | null
          dealer_name: string
          id: string
          lot_code: string
          notes: string | null
          origin_hub: string
          total_pieces: number
        }
        Insert: {
          arrival_date?: string
          created_at?: string | null
          dealer_name: string
          id?: string
          lot_code: string
          notes?: string | null
          origin_hub: string
          total_pieces?: number
        }
        Update: {
          arrival_date?: string
          created_at?: string | null
          dealer_name?: string
          id?: string
          lot_code?: string
          notes?: string | null
          origin_hub?: string
          total_pieces?: number
        }
        Relationships: []
      }
      products: {
        Row: {
          blouse_details: string
          category: string
          color: string
          created_at: string | null
          description: string
          discount_percent: number | null
          fabric: string
          id: string
          images: string[]
          is_dealer_unique: boolean
          is_featured_showstopper: boolean
          is_published: boolean
          is_silk_mark_certified: boolean
          lot_id: string | null
          name: string
          original_price: number
          price: number
          provenance: string
          sku: string
          stock_count: number
          updated_at: string | null
          zari_type: string
        }
        Insert: {
          blouse_details: string
          category: string
          color: string
          created_at?: string | null
          description: string
          discount_percent?: number | null
          fabric: string
          id?: string
          images?: string[]
          is_dealer_unique?: boolean
          is_featured_showstopper?: boolean
          is_published?: boolean
          is_silk_mark_certified?: boolean
          lot_id?: string | null
          name: string
          original_price: number
          price: number
          provenance: string
          sku: string
          stock_count?: number
          updated_at?: string | null
          zari_type: string
        }
        Update: {
          blouse_details?: string
          category: string
          color?: string
          created_at?: string | null
          description?: string
          discount_percent?: number | null
          fabric?: string
          id?: string
          images?: string[]
          is_dealer_unique?: boolean
          is_featured_showstopper?: boolean
          is_published?: boolean
          is_silk_mark_certified?: boolean
          lot_id?: string | null
          name?: string
          original_price?: number
          price?: number
          provenance?: string
          sku?: string
          stock_count?: number
          updated_at?: string | null
          zari_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_lot_id_fkey"
            columns: ["lot_id"]
            isOneToOne: false
            referencedRelation: "dealer_lots"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string
          full_name: string | null
          id: string
          role: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          full_name?: string | null
          id: string
          role?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          full_name?: string | null
          id?: string
          role?: string
          updated_at?: string | null
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
