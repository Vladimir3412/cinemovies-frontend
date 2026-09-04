import { tmdbClient } from "@/shared/api";
import { ApiQueryKeys } from "@/shared/config";
import { useQuery } from "@tanstack/react-query";

interface MovieImages {
  id: number;
  backdrops: [
    {
      aspect_ratio: number;
      file_path: string;
      height: number;
      iso_639_1: string | null;
      vote_average: number;
      vote_count: number;
      width: number;
    },
  ];
}

const getMovieImages = async (id: number) => {
  const res = await tmdbClient.get<MovieImages>(`/movie/${id}/images`);
  return res.data;
};

export const useGetMovieImages = (id: number) => {
  return useQuery({
    queryFn: () => getMovieImages(id),
    queryKey: [ApiQueryKeys.MOVIE_IMAGES, id],
    enabled: !!id,
  });
};
