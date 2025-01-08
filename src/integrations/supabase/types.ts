import { Service } from './database.types';

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      salons: {
        Row: {
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          location: string
          name: string
          rating: number | null
          services: Service[] | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          location: string
          name: string
          rating?: number | null
          services?: Service[] | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          location?: string
          name?: string
          rating?: number | null
          services?: Service[] | null
          updated_at?: string
        }
      }
      bookings: {
        Row: {
          booking_date: string
          created_at: string
          id: string
          salon_id: string | null
          service: string
          status: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          booking_date: string
          created_at?: string
          id?: string
          salon_id?: string | null
          service: string
          status?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          booking_date?: string
          created_at?: string
          id?: string
          salon_id?: string | null
          service?: string
          status?: string | null
          updated_at?: string
          user_id?: string | null
        }
      }
      favorites: {
        Row: {
          created_at: string
          id: string
          salon_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          salon_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          salon_id?: string | null
          user_id?: string | null
        }
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          phone_number: string | null
          role: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          phone_number?: string | null
          role?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          phone_number?: string | null
          role?: string | null
          updated_at?: string
        }
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
