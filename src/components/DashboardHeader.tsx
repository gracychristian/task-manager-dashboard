import { LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import CustomButton from "./ui/CustomButton";

const DashboardHeader = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };
    return (<div className="mb-8 flex justify-between items-center bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <div className="w-full text-left">
            <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-white text-sm font-bold">
                        {user?.username?.charAt(0).toUpperCase() || 'U'}
                    </span>
                </div>
                <h1 className="text-3xl font-bold text-gray-900">Hello {user?.username}</h1>
            </div>
            <p className="text-gray-600 mt-2 ml-13">Organize and track your tasks efficiently</p>
        </div>
        <div className="flex items-center gap-4">
            <CustomButton
                onClick={handleLogout}
                variant="contained"
                startIcon={<LogOut className="w-5 h-5" />}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium shadow-md hover:shadow-lg"
                sx={{
                    background: 'linear-gradient(45deg, #ef4444 30%, #dc2626 90%)',
                    '&:hover': {
                        background: 'linear-gradient(45deg, #dc2626 30%, #b91c1c 90%)',
                        transform: 'scale(1.05)',
                    },
                    '&:active': {
                        transform: 'scale(0.95)',
                    },
                }}
            >
                Logout
            </CustomButton>

        </div>
    </div>);
}

export default DashboardHeader;