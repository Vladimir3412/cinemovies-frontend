import { tmdbClient } from "@/shared/api";
import { MovieVideo } from "@/entities/movies/model/";
import { useQuery } from "@tanstack/react-query";
import { ApiQueryKeys } from "@/shared/config";

export const getMovieVideos = async (movieId: number) => {
  const res = await tmdbClient.get<MovieVideo>(
    "/movie/" + movieId + "/videos",
    {
      params: {
        language: "ru",
      },
    },
  );
  return res;
};

export const useGetMovieVideos = (movieId: number) => {
  return useQuery({
    queryKey: [ApiQueryKeys.MOVIE_VIDEOS, movieId],
    queryFn: () => getMovieVideos(movieId),
    enabled: !!movieId,
  });
};
