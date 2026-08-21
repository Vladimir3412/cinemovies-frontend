import { AuthWrapper } from "@/features/auth/auth-wrapper";
import { RegisterForm } from "@/features/auth/register-form";
import { ROUTES } from "@/shared/routes";

const RegisterPage = () => {
  return (
    <AuthWrapper
      heading="Регистрация аккаунта"
      description="Зарегистрируйте аккаунт, введя данные в форме"
      backButtonLabel="Уже зарегистрированы? Войти"
      backButtonLink={ROUTES.LOGIN_PAGE}
    >
      <RegisterForm />
    </AuthWrapper>
  );
};

export default RegisterPage;
