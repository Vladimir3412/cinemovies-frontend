import { Movie } from "../model/movie";
import Image from "next/image";

export const MovieCard = ({ movie }: { movie: Movie }) => {
  return (
    <div className="flex flex-col rounded-lg overflow-hidden ">
      {/* <h2 className=" font-bold mt-2 text-white">{movie.title}</h2>
        <p className="text-gray-400">{movie.overview}</p> */}
      <div className="aspect-[2/3] relative w-full">
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          fill
          className="object-cover rounded-lg"
        />
      </div>
    </div>
  );
};
