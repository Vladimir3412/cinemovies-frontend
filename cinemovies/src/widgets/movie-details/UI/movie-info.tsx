"use client";
import { useGetActorsId } from "@/entities/movies/api/use-get-actors-id";
import { useGetMovieImages } from "@/entities/movies/api/use-get-movie-images";
import { MovieDetails } from "@/entities/movies/model";
import VoteCircle from "@/shared/UI/vote-circle";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const MovieInfo = ({ movie, id }: { movie?: MovieDetails; id: number }) => {
  const { data } = useGetActorsId(id);
  const { data: images } = useGetMovieImages(id);
  const [showDialog, setShowDialog] = useState<null | number>(null);
  return (
    <div className="p-12 text-white  ">
      <div className="grid grid-cols-2 w-full gap-8">
        <section className="flex flex-col gap-2">
          <p className="text-gray-400">О фильме</p>
          <h1 className="text-xl">{movie?.overview ?? "Описание фильма"}</h1>
          <div className="flex gap-2 items-center">
            <VoteCircle rating={movie?.vote_average ?? 0} />
            <div className="flex flex-col gap-0.5">
              <h1>Средняя оценка</h1>
              <p className="text-gray-400 text-sm">
                {movie?.vote_count} оценок
              </p>
            </div>
          </div>
        </section>
        <section className="flex flex-col gap-2 ">
          <h1 className="text-gray-400">Производство</h1>
          {movie?.production_companies
            .filter((company) => company.logo_path)
            .map((company) => (
              <div key={company.id}>
                {company.logo_path && (
                  <div className="bg-[#101013] border border-[#26262b] p-4 rounded-xl flex items-center hover:bg-[#1a1a20] transition-colors duration-200 gap-4 ">
                    {company?.logo_path && (
                      <div className="bg-white rounded-lg p-1.5 flex items-center justify-center w-[70px] h-[70px]">
                        <Image
                          src={`https://image.tmdb.org/t/p/w500${company?.logo_path ?? ""}`}
                          width={70}
                          height={70}
                          alt={company?.name}
                        />
                      </div>
                    )}
                    <span>{company?.name}</span>
                  </div>
                )}
              </div>
            ))}
        </section>
      </div>

      {images && (
        <div className="mt-6">
          <div className="justify-between flex items-center mb-4">
            <h1 className="text-gray-400">Кадры</h1>
            <div className="text-[#e3796d] flex items-center gap-1 cursor-pointer  hover:text-[#ee9a90]">
              Все
              <MoveRight size={16} />
            </div>
          </div>

          <div className="grid grid-cols-5 gap-4">
            {images.backdrops.slice(0, 5).map((image, index) => (
              <div
                key={index}
                className=" w-full aspect-[3/2] relative cursor-pointer"
              >
                <Image
                  src={`https://image.tmdb.org/t/p/w1920${image.file_path ?? ""}`}
                  fill
                  alt="Backdrop"
                  className="rounded-lg object-cover"
                  onClick={() => setShowDialog(index)}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {data && (
        <div className="mt-6">
          <div className="justify-between flex items-center mb-4">
            <h1 className="text-gray-400">Актёры</h1>
            <div className="text-[#e3796d] flex items-center gap-1 cursor-pointer  hover:text-[#ee9a90]">
              Все актёры
              <MoveRight size={16} />
            </div>
          </div>

          <div className="grid grid-cols-7 gap-4">
            {data.cast.slice(0, 7).map((actor) => (
              <div
                key={actor.id}
                className="rounded-xl flex flex-col gap-2 bg-[#101013] p-3 border border-[#26262b] hover:bg-[#1a1a20] transition-colors duration-200 cursor-pointer"
              >
                <div className=" w-full aspect-[2/3] relative">
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${actor.profile_path ?? ""}`}
                    fill
                    alt={actor.name}
                    className="rounded-lg object-cover"
                  />
                </div>
                <h2 className="text-2xl font-medium">{actor.name}</h2>
                <p className="text-gray-400 text-sm">{actor.character}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <Dialog
        open={showDialog !== null}
        onOpenChange={() => setShowDialog(null)}
      >
        <DialogContent className="w-full !max-w-6xl aspect-[16/9]  ">
          {showDialog !== null && images && (
            <Image
              src={`https://image.tmdb.org/t/p/w1920${images.backdrops[showDialog]?.file_path ?? ""}`}
              fill
              className="rounded-lg object-cover w-full relative"
              alt="Backdrop"
            />
          )}

          <div className="flex justify-between p-4">
            <Button
              className="absolute top-1/2 left-4 -translate-y-1/2"
              onClick={() =>
                setShowDialog((i) =>
                  i! > 0 ? i! - 1 : images!.backdrops.length - 1,
                )
              }
            >
              ←
            </Button>
            <Button
              className="absolute top-1/2 right-4 -translate-y-1/2"
              onClick={() =>
                setShowDialog((i) =>
                  i! < images!.backdrops.length - 1 ? i! + 1 : 0,
                )
              }
            >
              →
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MovieInfo;
