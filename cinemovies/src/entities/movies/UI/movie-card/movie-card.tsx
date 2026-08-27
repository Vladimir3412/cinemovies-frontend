import { Movie } from "@/entities/movies/model/movie";
import Image from "next/image";

export const MovieCard = ({ movie }: { movie: Movie }) => {
  return (
    <div className="flex flex-col rounded-lg overflow-hidden ">
      <div className="aspect-[2/3] relative w-full">
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          fill
          className="object-cover rounded-lg  cursor-pointer hover:scale-105 transition duration-300 "
        />
      </div>
    </div>
  );
};
