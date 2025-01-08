import { Service } from './database.types';

export interface Salon {
  id: string;
  name: string;
  description: string | null;
  location: string;
  image_url: string | null;
  rating: number | null;
  services: Service[] | null;
  created_at: string;
  updated_at: string;
}

export type SalonInsert = Omit<Salon, 'id' | 'created_at' | 'updated_at'>;
export type SalonUpdate = Partial<SalonInsert>;