import { tmdbClient } from "@/shared/api";
import { ApiQueryKeys } from "@/shared/config";
import { useQuery } from "@tanstack/react-query";
import { MovieDetails } from "@/entities/movies/model/movie";

export const getMovieId = async (movieId: number) => {
  const res = await tmdbClient.get<MovieDetails>("/movie/" + movieId, {
    params: {
      language: "ru",
    },
  });
  return res;
};

export const useGetMovieId = (movieId: number) => {
  return useQuery({
    queryKey: [ApiQueryKeys.MOVIE_DETAILS, movieId],
    queryFn: () => getMovieId(movieId),
    enabled: !!movieId,
  });
};
