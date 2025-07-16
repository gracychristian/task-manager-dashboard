import { useAuth } from "../context/AuthContext";
import AuthForm from "./AuthForm";

const Signup = () => {
    const { signup } = useAuth();

    return (
        <AuthForm
            mode="signup"
            onSubmit={(values) => signup(values.email, values.password)}
        />
    );
};

export default Signup;
