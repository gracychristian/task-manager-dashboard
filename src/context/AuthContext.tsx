import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { User } from '../types/auth';
import type { AuthContextType } from '../types/context';

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem("loggedInUser")
        if (storedUser) setUser(JSON.parse(storedUser))
        setIsLoading(false);
    }, [])

    const login = (email: string, password: string) => {
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const foundUser = users.find((u: User) => u.email === email && u.password === password);
        if (foundUser) {
            setUser(foundUser);
            localStorage.setItem("loggedInUser", JSON.stringify(foundUser));
            return true;
        }
        return false;
    };

    const signup = (username: string, email: string, password: string) => {
        const users = JSON.parse(localStorage.getItem("users") || "[]") as User[];
        const existsUser = users.find((u) => u.email === email);
        if (existsUser) return false;

        const newUser = { username, email, password };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("loggedInUser", JSON.stringify(newUser));
        setUser(newUser);
        return true;
    };


    const logout = () => {
        setUser(null);
        localStorage.removeItem("loggedInUser");
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, isLoading }} >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};