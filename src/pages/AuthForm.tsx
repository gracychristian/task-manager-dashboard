import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import InputField from "../components/common/InputField";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import CustomButton from "../components/common/CustomButton";

interface AuthFormProps {
    mode: "login" | "signup";
    onSubmit: (values: { email: string; password: string; username?: string }) => boolean;
}

const AuthForm = ({ mode, onSubmit }: AuthFormProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            ...(mode === "signup" && {
                username: Yup.string().required('Username is required'),
            }),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        }),
        onSubmit: (values) => {
            const success = onSubmit(values);
            if (success) {
                navigate("/dashboard");
            } else {
                alert(mode === "login" ? "Invalid credentials" : "User already exists.");
            }
        },
    });

    return (

        <div className="flex items-center justify-center min-h-screen relative w-[25rem] w-full">
            <form
                onSubmit={formik.handleSubmit}
                className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden"
            >
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
                    <div className="flex items-center justify-center mb-2">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-white" />
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-white text-center">
                        {mode === "login" ? "Welcome to TaskManager" : "Create Account"}
                    </h2>
                </div>

                <div className="px-8 py-6 space-y-6">
                    {mode === "signup" && (
                        <div className="space-y-2">
                            <div className="relative">
                                <InputField
                                    name="username"
                                    label="Username"
                                    formik={formik}
                                    icon={<User className="h-4 w-4 text-gray-400" />}
                                />
                            </div>
                        </div>
                    )}
                    <div className="space-y-2">
                        <div className="relative">
                            <InputField
                                name="email"
                                label="Email Address"
                                type="email"
                                formik={formik}
                                icon={<Mail className="h-4 w-4 text-gray-400" />}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="relative">
                            <InputField
                                name="password"
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                formik={formik}
                                icon={<Lock className="h-4 w-4 text-gray-400" />}
                                endIcon={showPassword ? (
                                    <EyeOff className="h-4 w-4 text-gray-500" />
                                ) : (
                                    <Eye className="h-4 w-4 text-gray-500" />
                                )}
                                onEndIconClick={() => setShowPassword(!showPassword)}
                            />
                        </div>
                    </div>

                    <CustomButton
                        type="submit"
                        fullWidth
                        disabled={!(formik.isValid && formik.dirty)}
                        sx={{
                            background: 'linear-gradient(to right, #2563eb, #7c3aed)',
                            color: 'white',
                            py: 1.5,
                            fontWeight: 500,
                            borderRadius: 2,
                            textTransform: 'none',
                            transition: 'all 0.2s',
                            transform: 'scale(1)',
                            ':hover': {
                                background: 'linear-gradient(to right, #1d4ed8, #6d28d9)',
                                transform: 'scale(1.02)',
                            },
                            ':active': {
                                transform: 'scale(0.98)',
                            },
                            '&.Mui-disabled': {
                                opacity: 0.5,
                                cursor: 'not-allowed',
                                background: 'linear-gradient(to right, #2563eb, #7c3aed)',
                                color: 'white',
                            },
                        }}
                    >
                        {mode === 'login' ? 'Login' : 'Sign up'}
                    </CustomButton>

                </div>

                <div className="px-8 py-4 bg-gray-50 border-t border-gray-100">
                    <p className="text-sm text-gray-600 text-center">
                        {mode === "login" ? "Don’t have an account?" : "Already have an account?"}{" "}
                        <Link
                            to={mode === "login" ? "/signup" : "/login"}
                            className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors"
                        >
                            {mode === "login" ? "Sign up" : "Login"}
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default AuthForm;
