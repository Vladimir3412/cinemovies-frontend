"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useGetPopularMovies } from "@/entities/movies/api/use-get-popular-movies";
import { FORMAT_DATETIME } from "@/shared/lib/dayjs";
import { Play, Plus } from "lucide-react";
import Image from "next/image";

export const HeroBanner = () => {
  const { data } = useGetPopularMovies({ language: "ru-RU" });

  const featuredMovie = data?.data?.results[0];
  const date30d = new Date().getTime() - 30 * 24 * 60 * 60 * 1000;
  const isNew = featuredMovie
    ? new Date(featuredMovie.release_date).getTime() > date30d
    : false;

  return (
    <div className="relative h-[70vh] w-full">
      <Image
        src={`https://image.tmdb.org/t/p/w1920${data?.data?.results[0]?.backdrop_path}`}
        alt={data?.data.results[0]?.title ?? "Фильм"}
        fill
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent " />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent " />

      <div className="absolute bottom-16 left-10 z-10">
        <div className="flex items-center flex-row gap-1 mb-4">
          {isNew && (
            <Badge className="bg-[#EB6350] text-white  rounded-md font-bold h-7 text-md">
              Премьера
            </Badge>
          )}
          {featuredMovie && (
            <div className="flex items-center flex-row gap-2">
              <Badge className="text-[#C6C6CC] text-lg font-semibold h-7 bg-[#0A0A0C99] border-2 border-[#FFFFFF26]">
                {FORMAT_DATETIME(featuredMovie.release_date)}
              </Badge>
              <Badge className="text-[#F2A093] text-lg font-semibold h-7 bg-[#0A0A0C99] border-2 border-[#E4705E59]">
                {featuredMovie.adult ? "18+" : "16+"}
              </Badge>
              <Badge className="text-[#F0CE8A] text-lg  font-semibold  h-7 bg-[#0A0A0C99] border-2 border-[#D4A44759]">
                {featuredMovie.vote_average.toFixed(1)} IMDB
              </Badge>
            </div>
          )}
        </div>
        <h1 className="text-5xl font-bold text-[#f4f4f2]">
          {data?.data.results[0]?.title ?? "Фильм"}
        </h1>
        <p className="text-[#9a9aa2] mt-2 max-w-lg font-medium line-clamp-3">
          {data?.data.results[0]?.overview ?? "Описание фильма"}
        </p>
        <div className="flex items-center gap-2 mt-4">
          <Button
            leftIcon={<Play size={16} fill="" />}
            size="lg"
            className="font-semibold cursor-pointer bg-white hover:bg-white/80 text-black "
          >
            Смотреть
          </Button>

          <Button
            variant="secondary"
            size="lg"
            leftIcon={<Plus />}
            className="cursor-pointer "
          >
            В избранное
          </Button>
        </div>
      </div>
    </div>
  );
};
