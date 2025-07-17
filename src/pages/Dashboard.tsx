import DashboardHeader from "../components/DashboardHeader";
import Tasks from "../components/Tasks";

const Dashboard = () => {
    return (
        <div className="z-999 relative p-5">
            <DashboardHeader />
            <Tasks />
        </div>
    );
}

export default Dashboard;