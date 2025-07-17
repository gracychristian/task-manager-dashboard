import { useState } from "react";
import TaskFormModal from "./TaskFormModal";
import { Plus } from "lucide-react";
import TaskList from "./TaskList";
import { useTasks } from "../context/TaskContext";
import type { Task } from "../types/task";
import DeleteConfirmModal from "./DeleteConfirmModal";
import { Button } from "@mui/material";

const Tasks = () => {
    const { tasks, deleteTask } = useTasks();
    const [openFormModal, setOpenFormModal] = useState<boolean>(false)
    const [selectedTask, setSelectedTask] = useState<Task>()
    const [removeId, setRemoveId] = useState<string>("");
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

    const handleEdit = (value: Task) => {
        setOpenFormModal(true);
        setSelectedTask(value);
    }

    const handleDelete = () => {
        if (removeId) {
            deleteTask(removeId);
            setRemoveId("");
        }
        setOpenDeleteModal(false);
    };


    return (
        <>
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
                <Button
                    onClick={() => setOpenFormModal(true)}
                    variant="contained"
                    startIcon={<Plus className="w-4 h-4" />}
                    className="px-6 py-2 rounded-lg font-medium shadow-md shrink-0 transition-all duration-200"
                    sx={{
                        background: 'linear-gradient(45deg, #2563eb 30%, #1d4ed8 90%)',
                        '&:hover': {
                            background: 'linear-gradient(45deg, #1d4ed8 30%, #1e40af 90%)',
                            transform: 'scale(1.05)',
                            boxShadow: '0 10px 20px rgba(37, 99, 235, 0.3)',
                        },
                        '&:active': {
                            transform: 'scale(0.95)',
                        },
                        textTransform: 'none',
                        color: 'white',
                    }}
                >
                    Add Task
                </Button>
            </div>

            <TaskList
                taskList={tasks}
                handleEdit={handleEdit}
                handleDelete={(id) => {
                    setRemoveId(id);
                    setOpenDeleteModal(true);
                }}
            />

            <TaskFormModal
                open={openFormModal}
                initialData={selectedTask}
                onClose={() => { setOpenFormModal(false); setSelectedTask(undefined) }}
            />

            <DeleteConfirmModal
                open={openDeleteModal}
                onClose={() => setOpenDeleteModal(false)}
                onConfirm={handleDelete}
            />
        </>
    );
}

export default Tasks;