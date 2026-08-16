"use client";
import { useGetMovies } from "@/entities/movies/api/use-get-movies";
import { useGetPopularMovies } from "@/entities/movies/api/use-get-popular-movies";
import { MovieCard } from "@/entities/movies/movie-card/movie-card";
import { useDebounce } from "@/shared/hooks/use-debounce";
import { Header } from "@/widgets/header";
import { HeroBanner } from "@/widgets/hero-banner";
import { useState } from "react";

export const HomePage = () => {
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search, 200);
  const { data, isLoading } = useGetMovies({
    query: debounceSearch,
    language: "ru-RU",
  });
  const { data: popularMovies } = useGetPopularMovies({ language: "ru-RU" });
  const movies = debounceSearch ? data : popularMovies;
  return (
    <>
      <Header search={search} setSearch={setSearch} isLoading={isLoading} />
      <HeroBanner />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {movies?.data.results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  );
};
