import { tmdbClient } from "@/shared/api";
import { ApiQueryKeys } from "@/shared/config/api-query-keys";
import { useQuery } from "@tanstack/react-query";
import { Movies } from "../model/movie";
export interface GetMoviesParams {
  query: string;
  include_adult?: boolean;
  language?: string;
  primary_release_year?: string;
  page?: number;
  region?: string;
  year?: string;
}

const getMovies = async (params: GetMoviesParams) => {
  const res = await tmdbClient.get<Movies>("/search/movie", { params });
  return res;
};

export const useGetMovies = (params: GetMoviesParams) => {
  return useQuery({
    queryKey: [ApiQueryKeys.MOVIES, params],
    queryFn: () => getMovies(params),
  });
};
