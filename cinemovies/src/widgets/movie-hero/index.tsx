"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MovieDetails } from "@/entities/movies/model";
import { MovieDetailsCard } from "@/entities/movies/UI/movie-details/movie-details";
import {
  DEFAULT_FORMAT,
  FORMAT_DATE,
  FORMAT_DATETIME,
} from "@/shared/lib/dayjs";
import { formatCurrency } from "@/shared/lib/format-number";
import { Play, Plus } from "lucide-react";
import Image from "next/image";

export const MovieHero = ({ movie }: { movie?: MovieDetails }) => {
  if (!movie) return null;
  const date30d = new Date().getTime() - 30 * 24 * 60 * 60 * 1000;
  const isNew = new Date(movie?.release_date).getTime() > date30d;

  const hours = Math.floor(movie.runtime / 60);
  const mins = movie.runtime % 60;
  return (
    <div>
      <div className="relative h-[95vh] w-full border-b border-white/10">
        <Image
          src={`https://image.tmdb.org/t/p/w1920${movie.backdrop_path}`}
          alt={movie.title ?? "Фильм"}
          fill
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent " />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent " />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 gap-5 flex flex-col text-center">
          {isNew && (
            <Badge className="bg-[#EB6350] text-white  rounded-md font-bold h-7 text-md flex align-center items-center mx-auto">
              Премьера
            </Badge>
          )}
          <h1 className="text-6xl font-bold text-white">{movie.title}</h1>
          <span>
            {movie.original_title} {FORMAT_DATETIME(movie.release_date)}
          </span>

          <div className="flex flex-row gap-4 items-center justify-center">
            <Badge variant="rating">{movie.vote_average.toFixed(1)} IMDB</Badge>
            <Badge>{FORMAT_DATE(movie.release_date)}</Badge>
            <Badge variant="adult">{movie.adult ? "18+" : "16+"}</Badge>
            <Badge>{`${hours} ч ${mins} мин`}</Badge>
            <Badge className="text-xs font-semibold">
              {movie.genres
                .map((genre) => genre.name.toUpperCase())
                .join(" • ")}
            </Badge>
          </div>
          <p className="text-[#9a9aa2] mt-2 font-medium ">
            {movie?.overview ?? "Описание фильма"}
          </p>

          <div className="flex items-center justify-center gap-3">
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
      <div className="flex  w-full">
        <MovieDetailsCard
          description="Дата релиза"
          title={DEFAULT_FORMAT(movie.release_date)}
        />
        <MovieDetailsCard
          description="Бюджет"
          title={formatCurrency(movie.budget)}
        />
        <MovieDetailsCard
          description="Сборы"
          title={formatCurrency(movie.revenue)}
        />
        <MovieDetailsCard
          description="Возраст"
          title={movie.adult ? "18+" : "16+"}
        />
        <MovieDetailsCard
          description="Страна"
          title={movie.production_countries
            .map((country) => country.iso_3166_1)
            .join(", ")}
        />
      </div>
    </div>
  );
};
