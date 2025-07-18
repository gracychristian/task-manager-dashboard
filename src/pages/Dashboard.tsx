import DashboardHeader from "../components/layout/DashboardHeader";
import Tasks from "../components/tasks/Tasks";

const Dashboard = () => {
    return (
        <div className="z-999 relative p-5">
            <DashboardHeader />
            <Tasks />
        </div>
    );
}

export default Dashboard;