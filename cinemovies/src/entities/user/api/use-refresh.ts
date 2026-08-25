import { AuthResponse } from "@/entities/user/model";
import { apiClient } from "@/shared/api";
import { ApiQueryKeys } from "@/shared/config";
import { useQuery } from "@tanstack/react-query";

export const refresh = async () => {
  const res = await apiClient.get<AuthResponse>("/refresh");
  return res;
};

export const useRefresh = () => {
  return useQuery({
    queryKey: [ApiQueryKeys.REFRESH],
    queryFn: () => refresh(),
    retry: false,
  });
};
