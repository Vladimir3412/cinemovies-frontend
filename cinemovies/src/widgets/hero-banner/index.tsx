"use client";
import { useGetPopularMovies } from "@/entities/movies/api/use-get-popular-movies";
import Image from "next/image";

export const HeroBanner = () => {
  const { data } = useGetPopularMovies({ language: "ru-RU" });

  return (
    <div className="relative h-[70vh] w-full">
      <Image
        src={`https://image.tmdb.org/t/p/w1920${data?.data?.results[4]?.backdrop_path}`}
        alt={data?.data.results[4]?.title ?? "Фильм"}
        fill
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent " />
      <div className="absolute bottom-32 left-10 z-10">
        <h1 className="text-3xl font-bold text-white">
          {data?.data.results[4]?.title ?? "Фильм"}
        </h1>
        <p className="text-gray-400 mt-2 max-w-lg font-medium">
          {data?.data.results[4]?.overview ?? "Описание фильма"}
        </p>
      </div>
    </div>
  );
};
