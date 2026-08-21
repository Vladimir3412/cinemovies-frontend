import { AuthUser } from "@/entities/user/model";
import { create } from "zustand";

interface AuthStore {
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void;
}
export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
