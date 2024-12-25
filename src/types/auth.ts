export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'salon_owner';
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: 'user' | 'salon_owner') => Promise<void>;
  signup: (name: string, email: string, password: string, role: 'user' | 'salon_owner') => Promise<void>;
  logout: () => void;
}