import { AuthResponse } from "@/entities/user/model/user";
import { apiClient } from "@/shared/api";
import { ApiQueryKeys } from "@/shared/config/api-query-keys";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import z from "zod";
import { RegisterRequest } from "../model/auth";

export const registerForm = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

export type RegisterFormUser = z.infer<typeof registerForm>;

export const register = async (data: RegisterRequest) => {
  const res = await apiClient.post<AuthResponse>("/register", data);
  return res.data;
};

export const useRegister = () => {
  return useMutation({
    mutationFn: ({ email, password }: RegisterRequest) => register({ email, password }),
    mutationKey: [ApiQueryKeys.REGISTER],
    onSuccess: () => {
      console.log("success");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage =
        error.response?.data?.message || error.message || "Что-то пошло не так";
      console.log(errorMessage);
    },
  });
};
