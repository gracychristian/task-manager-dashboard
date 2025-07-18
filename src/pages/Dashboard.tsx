import { useState } from "react";
import DashboardHeader from "../components/layout/DashboardHeader";
import Tasks from "../components/tasks/Tasks";
import type { Task } from "../types/task";
import TaskFormModal from "../components/modals/TaskFormModal";

const Dashboard = () => {
    const [openFormModal, setOpenFormModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | undefined>();

    return (
        <div className="z-999 relative p-5">
            <DashboardHeader onAddTaskClick={() => setOpenFormModal(true)} />
            <Tasks onEditTask={(task) => {
                setSelectedTask(task);
                setOpenFormModal(true);
            }} />
            <TaskFormModal
                open={openFormModal}
                initialData={selectedTask}
                onClose={() => {
                    setOpenFormModal(false);
                    setSelectedTask(undefined);
                }}
            />
        </div>
    );
}

export default Dashboard;