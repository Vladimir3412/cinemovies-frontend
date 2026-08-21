"use client";
import { Input } from "@/components/ui/input";
import { Clapperboard, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader } from "@/shared/UI/loader";
import { useAuthStore } from "@/shared/store/auth-store";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ROUTES } from "@/shared/routes";

const nav = [
  {
    name: "Главная",
  },
  {
    name: "Фильмы",
  },
  {
    name: "Сериалы",
  },
];

interface HeaderProps {
  search: string;
  setSearch: (value: string) => void;
  isLoading: boolean;
}

export const Header = ({ search, setSearch, isLoading }: HeaderProps) => {
  const { user } = useAuthStore();
  return (
    <header className="sticky top-0 z-50 bg-black/60 backdrop-blur-md w-full flex items-center gap-2 justify-between px-6 py-3 h-auto border-b border-white/10">
      <div className="flex gap-6 items-center justify-between">
        <h1 className="text-lg font-bold flex items-center gap-2 text-white">
          <Clapperboard className="text-red-500" />
          CinemaMovies
        </h1>
        {nav.map((item) => (
          <span
            key={item.name}
            className="text-gray-400 hover:text-white cursor-pointer"
          >
            {item.name}
          </span>
        ))}
        <Input
          className="w-96 bg-white/10 border-white/20 text-white placeholder:text-gray-400 rounded-full "
          placeholder="Поиск..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          rightSection={
            isLoading ? (
              <Loader />
            ) : (
              search.length > 0 && (
                <div>
                  <X
                    className="text-gray-400 hover:text-white cursor-pointer w-4 h-4"
                    onClick={() => setSearch("")}
                  />
                </div>
              )
            )
          }
        />
      </div>

      <Avatar>
        {user ? (
          <>
          <p></p>
            <Link href={ROUTES.LOGIN_PAGE}>
              <Button>Выйти</Button>
            </Link>
            
          </>
        ) : (
          <Link href={ROUTES.LOGIN_PAGE}>
            <Button>Войти</Button>
          </Link>
        )}
      </Avatar>
    </header>
  );
};
