"use client";
import { ChevronRight } from "lucide-react";
import { MovieCard } from "@/entities/movies/movie-card/movie-card";
import { Movie } from "@/entities/movies/model/movie";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"> */}
      <Carousel
        opts={{
          align: "start",
          loop: true,
          slidesToScroll: 3,
        }}
        className="w-full"
      >
        <CarouselContent className="w-full overflow-visible">
          {movies?.map((movie) => (
            <CarouselItem
              key={movie.id}
              className="basis-1/2 md:basis-1/4 lg:basis-[14%]"
            >
              <MovieCard movie={movie} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      {/* </div> */}
    </div>
  );
};

export default MovieSection;
