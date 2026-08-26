"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useGetPopularMovies } from "@/entities/movies/api/use-get-popular-movies";
import { FORMAT_DATETIME } from "@/shared/lib/dayjs";
import { type CarouselApi } from "@/components/ui/carousel";
import YouTube from "react-youtube";

import { Play, Plus } from "lucide-react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useGetMovieVideos } from "@/entities/movies/api/use-get-movie-videos";
import { useEffect, useState } from "react";
export const HeroBanner = () => {
  const { data } = useGetPopularMovies({ language: "ru-RU" });
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
      setVideoReady(false);
    });

    return () => {
      api.off("select", () => {
        setCurrent(api.selectedScrollSnap());
      });
    };
  }, [api]);
  const currentVideo = data?.data?.results[current];
  const { data: videos } = useGetMovieVideos(currentVideo?.id ?? 0);
  const trailer = videos?.data?.results.find(
    (video) => video.type === "Trailer" && video.site === "YouTube",
  );
  const date30d = new Date().getTime() - 30 * 24 * 60 * 60 * 1000;

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      setApi={setApi}
    >
      <CarouselContent className="w-full overflow-visible ">
        {data?.data?.results.map((movie, index) => {
          const isNew = new Date(movie.release_date).getTime() > date30d;
          const isCurrent = index === current;
          return (
            <CarouselItem key={movie.id} className="basis-1/2 lg:basis-[98%] ">
              <div className="relative h-[70vh] w-full rounded-xl overflow-hidden">
                {trailer && isCurrent && (
                  <YouTube
                    videoId={trailer.key}
                    className="w-full h-full"
                    iframeClassName="w-full h-full absolute top-0 left-0 scale-[1.5]"
                    opts={{
                      playerVars: {
                        autoplay: 1,
                        mute: 1, // без звука
                        controls: 0, // без кнопок управления
                        showinfo: 0, // без инфо
                        modestbranding: 1,
                      },
                    }}
                    onPlay={() => setVideoReady(true)}
                  />
                )}
                {!videoReady && (
                  <Image
                    src={`https://image.tmdb.org/t/p/w1920${movie.backdrop_path}`}
                    alt={movie.title ?? "Фильм"}
                    fill
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent " />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent " />

                <div className="absolute bottom-16 left-10 z-10">
                  <div className="flex items-center flex-row gap-1 mb-4">
                    {isNew && (
                      <Badge className="bg-[#EB6350] text-white  rounded-md font-bold h-7 text-md">
                        Премьера
                      </Badge>
                    )}
                    {movie && (
                      <div className="flex items-center flex-row gap-2">
                        <Badge className="text-[#C6C6CC] text-lg font-semibold h-7 bg-[#0A0A0C99] border-2 border-[#FFFFFF26]">
                          {FORMAT_DATETIME(movie.release_date)}
                        </Badge>
                        <Badge className="text-[#F2A093] text-lg font-semibold h-7 bg-[#0A0A0C99] border-2 border-[#E4705E59]">
                          {movie.adult ? "18+" : "16+"}
                        </Badge>
                        <Badge className="text-[#F0CE8A] text-lg  font-semibold  h-7 bg-[#0A0A0C99] border-2 border-[#D4A44759]">
                          {movie.vote_average.toFixed(1)} IMDB
                        </Badge>
                      </div>
                    )}
                  </div>
                  <h1 className="text-5xl font-bold text-[#f4f4f2]">
                    {movie?.title ?? "Фильм"}
                  </h1>
                  <p className="text-[#9a9aa2] mt-2 max-w-lg font-medium line-clamp-3">
                    {movie?.overview ?? "Описание фильма"}
                  </p>
                  <div className="flex items-center gap-2 mt-4">
                    <Button
                      leftIcon={<Play size={16} fill="" />}
                      size="lg"
                      className="font-semibold cursor-pointer bg-white hover:bg-white/80 text-black "
                    >
                      Смотреть
                    </Button>

                    <Button
                      variant="secondary"
                      size="lg"
                      leftIcon={<Plus />}
                      className="cursor-pointer "
                    >
                      В избранное
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
