import { apiClient } from "@/shared/api";
import { AuthResponse } from "@/entities/user/model";
import { useMutation } from "@tanstack/react-query";
import { ApiQueryKeys } from "@/shared/config";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { ROUTES } from "@/shared/routes";
import { removeAccessToken } from "@/shared/lib/auth-token";
import { useAuthStore } from "@/shared/store/auth-store";

export const logout = async () => {
  const res = await apiClient.post<AuthResponse>("/logout");
  return res;
};

export const useLogout = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: () => logout(),
    mutationKey: [ApiQueryKeys.LOGOUT],
    onSuccess: () => {
      removeAccessToken();
      useAuthStore.getState().setUser(null);
      router.push(ROUTES.LOGIN_PAGE);
    },

    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage =
        error.response?.data?.message || error.message || "Что-то пошло не так";
      console.log(errorMessage);
    },
  });
};
