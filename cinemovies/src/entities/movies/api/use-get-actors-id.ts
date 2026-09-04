import { Actors } from "@/entities/movies/model/actors";
import { tmdbClient } from "@/shared/api";
import { ApiQueryKeys } from "@/shared/config";
import { useQuery } from "@tanstack/react-query";

const getActorsId = async (id: number) => {
  const res = await tmdbClient.get<Actors>(`/movie/${id}/credits`, {
    params: { language: "ru-RU" },
  });
  return res.data;
};

export const useGetActorsId = (id: number) => {
  return useQuery({
    queryFn: () => getActorsId(id),
    queryKey: [ApiQueryKeys.Actors, id],
    enabled: !!id,
  });
};
