"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  loginForm,
  LoginFormUser,
  useLogin,
} from "@/entities/user/api/use-login";
import { RegisterRequest } from "@/entities/user/model/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

export const LoginForm = () => {
  const { control, formState: { errors }, handleSubmit } = useForm<LoginFormUser>({
    resolver: zodResolver(loginForm),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: login, isPending: isPendingLogin } = useLogin();
  const onSubmit = ({ email, password }: RegisterRequest) => {
    login({ email, password });
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-1 flex-col">
        <p className="text-[#8b8b93] font-semibold">Email</p>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="email"
              placeholder="Email"
              className="text-white border border-[#26262b] rounded-xl px-2.5 py-5 focus:outline-none"
              error={errors.email?.message}
            />
          )}
        />
        <p className="text-[#8b8b93] font-semibold mt-2">Пароль</p>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="password"
              placeholder="Password"
              className="text-white border border-[#26262b] rounded-xl px-2.5 py-5  focus:outline-none"
              error={errors.password?.message}
            />
          )}
        />

        {/* <p className="text-[#8b8b93] font-semibold mt-2">Повторите пароль</p>
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field, fieldState }) => (
            <>
              <Input
                {...field}
                type="password"
                placeholder="Password"
                className="text-white border border-[#26262b] rounded-xl px-2.5 py-5  focus:outline-none"
              />
              {fieldState.error && (
                <p className="text-red-300 text-sm">
                  {fieldState.error.message}
                </p>
              )}
            </>
          )}
        /> */}
        <Button
          type="submit"
          isLoading={isPendingLogin}
          className="mt-4 py-5 font-black text-lg cursor-pointer"
        >
          Войти в аккаунт
        </Button>
      </form>
      <div className="flex flex-col items-center mt-6 mb-5 border border-t-[#26262b]" />
      <p className="text-center items-center justify-center text-[#8b8b93]">
        Продолжая, вы соглашаетесь с{" "}
        <span className="text-[#e3796d] hover:text-[#ee9a90] cursor-pointer">
          условиями{" "}
        </span>{" "}
        и
        <span className="text-[#e3796d] hover:text-[#ee9a90] cursor-pointer">
          {" "}
          политикой конфиденциальности
        </span>
        .
      </p>
    </div>
  );
};
