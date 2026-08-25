"use client";
import { useGetMovies } from "@/entities/movies/api/use-get-movies";
import { useGetPopularMovies } from "@/entities/movies/api/use-get-popular-movies";
import { MovieCard } from "@/entities/movies/movie-card/movie-card";
import { useDebounce } from "@/shared/hooks/use-debounce";
import { Header } from "@/widgets/header";
import { HeroBanner } from "@/widgets/hero-banner";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import MovieSection from "@/widgets/movie-section";
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
