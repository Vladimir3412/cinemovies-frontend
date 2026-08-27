"use client";

import { useGetMovieId } from "@/entities/movies/api/use-get-movie-id";
import { useGetMovies } from "@/entities/movies/api/use-get-movies";
import { useDebounce } from "@/shared/hooks/use-debounce";
import { Header } from "@/widgets/header";
import { useState } from "react";
import { MovieHero } from "@/widgets/movie-hero";

export const MovieDetailsPage = ({ id }: { id: number }) => {
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search, 200);
  const { data, isLoading } = useGetMovies({
    query: debounceSearch,
    language: "ru-RU",
  });
  const { data: movie } = useGetMovieId(id);
  return (
    <div>
      <Header search={search} setSearch={setSearch} isLoading={isLoading} />
      <MovieHero movie={movie?.data} />
    </div>
  );
};
