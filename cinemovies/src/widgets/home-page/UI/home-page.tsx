"use client";
import { useGetMovies } from "@/entities/movies/api/use-get-movies";
import { useGetPopularMovies } from "@/entities/movies/api/use-get-popular-movies";
import { useDebounce } from "@/shared/hooks/use-debounce";
import { Header } from "@/widgets/header";
import { HeroBanner } from "@/widgets/hero-banner";
import MovieSection from "@/widgets/movie-section";
import { useState } from "react";
export const HomePage = () => {
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search, 200);
  const { data, isLoading } = useGetMovies({
    query: debounceSearch,
    language: "ru-RU",
  });

  const { data: popularMovies } = useGetPopularMovies({ language: "ru-RU" });
  const movies = data;
  return (
    <>
      <Header search={search} setSearch={setSearch} isLoading={isLoading} />
      <HeroBanner />
      <div className="flex flex-col gap-6">
        <MovieSection title="Популярные" movies={popularMovies?.data.results} />
        <MovieSection title="Все" movies={movies?.data.results} />
      </div>
    </>
  );
};
