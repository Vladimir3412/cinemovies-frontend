"use client";
import { useEffect } from "react";
import { useAuthStore } from "../store/auth-store";
import { useRefresh } from "@/entities/user/api/use-refresh";
import { setAccessToken } from "../lib/auth-token";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { setUser } = useAuthStore();
  const { data } = useRefresh();

  useEffect(() => {
    if (data) {
      setUser(data.data.user);
      setAccessToken(data.data.accessToken);
    }
  }, [data]);
  return <>{children}</>;
};
