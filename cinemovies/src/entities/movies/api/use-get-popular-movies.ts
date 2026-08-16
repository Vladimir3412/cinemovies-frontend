import { tmdbClient } from "@/shared/api";
import { ApiQueryKeys } from "@/shared/config/api-query-keys";
import { useQuery } from "@tanstack/react-query";
import { Movies } from "../model/movie";

export interface GetPopularMoviesParams {
  language?: string;
  page?: number;
  region?: string;
}

export interface MoviesPopular extends Movies {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
}
const getPopularMovies = async (params: GetPopularMoviesParams) => {
  const res = await tmdbClient.get<MoviesPopular>("/movie/now_playing", {
    params,
  });
  return res;
};

export const useGetPopularMovies = (params: GetPopularMoviesParams) => {
  return useQuery({
    queryKey: [ApiQueryKeys.MOVIES_POPULAR, params],
    queryFn: () => getPopularMovies(params),
  });
};
