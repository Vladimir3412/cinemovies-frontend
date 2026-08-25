"use client";
import { ChevronRight } from "lucide-react";
import { MovieCard } from "@/entities/movies/movie-card/movie-card";
import { Movie } from "@/entities/movies/model/movie";

interface MovieSectionProps {
  title: string;
  movies?: Movie[];
}
const MovieSection = ({ movies, title }: MovieSectionProps) => {
  return (
    <div>
      <div className="flex items-center gap-1 mb-2 group cursor-pointer">
        <p className="text-white text-[27px] font-semibold ">{title}</p>
        <ChevronRight className="text-white/70 opacity-0 group-hover:opacity-100 transition duration-200" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {movies?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieSection;
