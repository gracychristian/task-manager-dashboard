import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <div className="min-h-screen relative">
            <div className="absolute inset-0 bg-white bg-gradient-to-br from-blue-400/20 via-purple-400/20 to-indigo-400/20"></div>
            <Outlet />
        </div>
    );
};

export default MainLayout;
