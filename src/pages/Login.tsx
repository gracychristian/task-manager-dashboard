import { useAuth } from "../context/AuthContext";
import AuthForm from "./AuthForm";

const Login = () => {
  const { login } = useAuth();

  return (
    <AuthForm
      mode="login"
      onSubmit={(values) => login(values.email, values.password)}
    />
  );
};

export default Login;
