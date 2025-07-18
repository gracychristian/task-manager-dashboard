import { useEffect, useState } from "react";
import TaskFormModal from "./TaskFormModal";
import { Plus } from "lucide-react";
import TaskList from "./TaskList";
import { useTasks } from "../context/TaskContext";
import type { Task } from "../types/task";
import DeleteConfirmModal from "./DeleteConfirmModal";
import { Button } from "@mui/material";
import TaskFilters from "./controls/TaskControls";

const Tasks = () => {
    const { tasks, deleteTask, searchTerm,
        statusFilter,
        priorityFilter,
        dateRangeFilter } = useTasks();

    const [openFormModal, setOpenFormModal] = useState<boolean>(false)
    const [selectedTask, setSelectedTask] = useState<Task>()
    const [removeId, setRemoveId] = useState<string>("");
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
    const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);

    useEffect(() => {
        const filters = {
            searchTerm,
            filterType: "",
            status: statusFilter !== 'all' ? statusFilter : undefined,
            priority: priorityFilter !== 'all' ? priorityFilter : undefined,
            fromDate: dateRangeFilter.start ? dateRangeFilter.start.toDate() : null,
            toDate: dateRangeFilter.end ? dateRangeFilter.end.toDate() : null,
        };

        if (filters.status) filters.filterType = "status";
        else if (filters.priority) filters.filterType = "priority";
        else if (filters.fromDate && filters.toDate) filters.filterType = "dueDate";

        applyFilters({
            searchTerm,
            status: statusFilter !== 'all' ? statusFilter : undefined,
            priority: priorityFilter !== 'all' ? priorityFilter : undefined,
            fromDate: dateRangeFilter.start?.toDate(),
            toDate: dateRangeFilter.end?.toDate(),
        });

    }, [searchTerm, statusFilter, priorityFilter, dateRangeFilter]);


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

    const applyFilters = (filters: any) => {
        let filtered = [...tasks];

        if (filters.searchTerm) {
            const q = filters.searchTerm.toLowerCase();
            filtered = filtered.filter(task =>
                task.title.toLowerCase().includes(q) ||
                task.description.toLowerCase().includes(q)
            );
        }

        if (filters.status) {
            filtered = filtered.filter(task => filters.status == "all" ? task : task.status?.value === filters.status);
        }

        if (filters.priority) {
            filtered = filtered.filter(task => filters.priority == "all" ? task : task.priority?.value === filters.priority);
        }

        if (filters.fromDate && filters.toDate) {
            const from = new Date(filters.fromDate);
            const to = new Date(filters.toDate);
            filtered = filtered.filter(task => {
                const due = new Date(task.dueDate);
                return due >= from && due <= to;
            });
        }

        setFilteredTasks(filtered);
    };

    return (
        <>
            <div className="gap-4 mb-8">
                <TaskFilters />
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
                taskList={filteredTasks}
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