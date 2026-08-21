"use client";
import { cn } from "@/shared/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const AuthTabs = () => {
  const pathname = usePathname();
  return (
    <div className="bg-[#17171b] flex rounded-xl p-1 gap-1 border border-[#24242a]">
      <Link
        href="/login"
        className={cn(
          "text-center flex-1 py-2 rounded-lg font-semibold transition-colors",
          pathname === "/login"
            ? "bg-[#26262e] text-[#f4f4f2]"
            : "bg-transparent text-[#8b8b93]",
        )}
      >
        Вход
      </Link>

      <Link
        href="/register"
        className={cn(
          "text-center flex-1 py-2 rounded-lg font-semibold transition-colors",
          pathname === "/register"
            ? "bg-[#26262e] text-[#f4f4f2]"
            : "bg-transparent text-[#8b8b93]",
        )}
      >
        Регистраця
      </Link>
    </div>
  );
};
