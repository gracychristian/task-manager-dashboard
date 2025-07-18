import { LogOut, Plus, User } from "lucide-react";
import { useState } from "react";
import CustomButton from "../common/CustomButton";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import type { DashboardHeaderProps } from "../../types/props";

const DashboardHeader = ({ onAddTaskClick }: DashboardHeaderProps) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate("/login");
        setIsProfileOpen(false);
    };

    const toggleProfile = () => {
        setIsProfileOpen(!isProfileOpen);
    };

    return (
        <div className="sticky top-0 z-50 mb-8 flex justify-between items-center bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-white text-lg font-bold">
                        TM
                    </span>
                </div>
                <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
            </div>

            <div className="flex items-center gap-4">
                <CustomButton
                    onClick={onAddTaskClick}
                    startIcon={<Plus className="w-5 h-5" />}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 !text-white font-medium shadow-md hover:shadow-lg rounded-lg px-6 py-3 transition-all duration-200 hover:scale-105 active:scale-95 min-w-0"
                >
                    New Task
                </CustomButton>

                {user && <div className="relative">
                    <CustomButton
                        onClick={toggleProfile}
                        variant="outlined"
                        className="!min-w-5 !w-5 !h-10 !rounded-full flex justify-center items-center !p-5 !bg-indigo-100 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 !outline-none"
                    >
                        <span className="text-gray-800 !text-lg font-bold">
                            {user.username[0]}
                        </span>
                    </CustomButton>

                    {isProfileOpen && (
                        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                            <div className="px-4 py-3 border-b border-gray-300 text-left">
                                <h3 className="font-semibold text-gray-900">{user.username}</h3>
                                <p className="text-sm text-gray-500">{user.email}</p>
                            </div>
                            <CustomButton
                                onClick={handleLogout}
                                fullWidth
                                variant="text"
                                startIcon={<LogOut className="w-4 h-4" />}
                                sx={{
                                    justifyContent: 'flex-start',
                                    px: 2,
                                    py: 1.5,
                                    fontSize: '0.875rem',
                                    color: '#fd0707ff',
                                    textTransform: 'none',
                                    '&:hover': {
                                        backgroundColor: '#f9fafb',
                                    },
                                }}
                            >
                                Logout
                            </CustomButton>

                        </div>
                    )}
                </div>}
            </div>
        </div>
    );
};

export default DashboardHeader;