import type { User } from "./auth";

export type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => boolean;
  signup: (username: string, email: string, password: string) => boolean;
  logout: () => void;
  isLoading: boolean;
};
