"use client";
import { Input } from "@/components/ui/input";
import { Clapperboard, LogOut, Search, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader } from "@/shared/UI/loader";
import { useAuthStore } from "@/shared/store/auth-store";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ROUTES } from "@/shared/routes";
import { useLogout } from "@/entities/user/api/use-logout";

const nav = [
  {
    name: "Фильмы",
  },
  {
    name: "Сериалы",
  },
  {
    name: "Подборки",
  },
];

interface HeaderProps {
  search: string;
  setSearch: (value: string) => void;
  isLoading: boolean;
}

export const Header = ({ search, setSearch, isLoading }: HeaderProps) => {
  const { mutate: logout } = useLogout();
  const { user } = useAuthStore();
  return (
    <header className="sticky top-0 z-50 bg-black/60 backdrop-blur-md w-full flex items-center gap-2 justify-between px-6 py-3 h-auto border-b border-white/10">
      <div className="flex gap-3 items-center justify-between">
        <h1 className="text-lg font-bold flex items-center gap-2 text-white">
          <Clapperboard className="text-red-500" />
          CinemaMovies
        </h1>
        <Button variant="secondary" className=" cursor-pointer">
          Главная
        </Button>
        {nav.map((item, index) => (
          <Button key={index} className="cursor-pointer" variant="ghost">
            {item.name}
          </Button>
        ))}
        <Input
          className="w-96 bg-white/10 border-white/20 text-white placeholder:text-gray-400 rounded-lg pl-8 "
          placeholder="Фильмы, сериалы, актёры..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          leftIcon={<Search size={14} />}
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

      {user ? (
        <Button
          className="cursor-pointer"
          variant="destructive"
          onClick={() => logout()}
          leftIcon={<LogOut />}
        >
          Выйти
        </Button>
      ) : (
        <div className="flex items-center gap-1">
          <Link href={ROUTES.LOGIN_PAGE}>
            <Button className="cursor-pointer">Войти</Button>
          </Link>
          <Link href={ROUTES.REGISTER_PAGE}>
            <Button className="cursor-pointer" variant="secondary">
              Регистрация
            </Button>
          </Link>
        </div>
      )}
    </header>
  );
};
