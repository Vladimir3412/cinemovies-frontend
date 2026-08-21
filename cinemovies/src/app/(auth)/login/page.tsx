import CardLogin from "@/features/auth/login";
import { AuthWrapper } from "@/features/auth/auth-wrapper";
import { ROUTES } from "@/shared/routes";
import { LoginForm } from "@/features/auth/login-form";
const LoginPage = () => {
  return (
    <AuthWrapper
      heading="Вход в аккаунт"
      description="Войдите в аккаунт, введя данные в форме"
      backButtonLabel="Еще не зарегистрированы? Регистрация"
      backButtonLink={ROUTES.REGISTER_PAGE}
    >
      <LoginForm />
    </AuthWrapper>
  );
};

export default LoginPage;
