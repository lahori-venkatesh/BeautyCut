export interface Service {
  name: string;
  price: number;
  duration: number;
  description?: string;
  experts?: string[];
}

export interface DatabaseTypes {
  public: {
    Tables: {
      bookings: {
        Row: {
          booking_date: string;
          created_at: string;
          id: string;
          salon_id: string | null;
          service: string;
          status: string | null;
          updated_at: string;
          user_id: string | null;
        };
        Insert: {
          booking_date: string;
          created_at?: string;
          id?: string;
          salon_id?: string | null;
          service: string;
          status?: string | null;
          updated_at?: string;
          user_id?: string | null;
        };
        Update: {
          booking_date?: string;
          created_at?: string;
          id?: string;
          salon_id?: string | null;
          service?: string;
          status?: string | null;
          updated_at?: string;
          user_id?: string | null;
        };
      };
    };
  };
}