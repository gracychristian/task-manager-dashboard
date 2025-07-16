import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

type User = {
    email: string
    password: string
}
type AuthContextType = {
    user: User | null,
    login: (email: string, password: string) => boolean
    signup: (email: string, password: string) => boolean
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("loggedInUser")
        if (storedUser) setUser(JSON.parse(storedUser))
    }, [])

    const login = (email: string, password: string) => {
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const foundUser = users.find((u: User) => u.email === email && u.password === password)
        if (foundUser) {
            setUser(foundUser);
            localStorage.setItem("foundUser", JSON.stringify(foundUser))
            return true;
        }
        return false
    }

    const signup = (email: string, password: string) => {
        const users = JSON.parse(localStorage.getItem("users") || "[]") as User[];
        const existsUser = users.find((u) => u.email === email);
        if (existsUser) return false;

        const newUser = { email, password };
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
        <AuthContext.Provider value={{ user, login, signup, logout }} >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};