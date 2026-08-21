import { apiClient } from "@/shared/api";
import { AxiosError } from "axios";
import { RegisterRequest } from "../model/auth";
import { useMutation } from "@tanstack/react-query";
import { ApiQueryKeys } from "@/shared/config/api-query-keys";
import z from "zod";
import { AuthResponse } from "@/entities/user/model/user";
import { setAccessToken } from "@/shared/lib/auth-token";
import { ROUTES } from "@/shared/routes";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/shared/store/auth-store";

export const loginForm = z.object({
  email: z.string().email("Некорректный email"),
  password: z.string().min(6, "Пароль должен быть не менее 6 символов"),
});

export type LoginFormUser = z.infer<typeof loginForm>;
export const login = (data: RegisterRequest) => {
  const res = apiClient.post<AuthResponse>("/login", data);
  return res;
};

export const useLogin = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: ({ email, password }: RegisterRequest) =>
      login({ email, password }),
    mutationKey: [ApiQueryKeys.LOGIN],

    onSuccess: (data) => {
      setAccessToken(data.data.accessToken);
      useAuthStore.getState().setUser(data.data.user);
      router.push(ROUTES.HOME_PAGE);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage =
        error.response?.data?.message || error.message || "Что-то пошло не так";
      console.log(errorMessage);
    },
  });
};
