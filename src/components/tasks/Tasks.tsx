import TaskBoard from "./TaskBoard";
import { useTasks } from "../../context/TaskContext";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import type { FilterParams, Task } from "../../types/task";
import CustomButton from "../common/CustomButton";
import TaskFilters from "../filters/TaskControls";
import TaskFormModal from "../modals/TaskFormModal";
import DeleteConfirmModal from "../modals/DeleteConfirmModal";

const TASKS_PER_PAGE = 5;

export default function Tasks() {
    const { tasks, updateTask, deleteTask, searchTerm, statusFilter, priorityFilter, dateRangeFilter } = useTasks();
    const [openFormModal, setOpenFormModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task>();
    const [removeId, setRemoveId] = useState<string>("");
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);
    const [draggedTask, setDraggedTask] = useState<Task | null>(null);
    const [currentPage, setCurrentPage] = useState({ todo: 1, in_progress: 1, done: 1 });

    useEffect(() => {
        applyFilters({
            searchTerm,
            status: statusFilter !== 'all' ? statusFilter : undefined,
            priority: priorityFilter !== 'all' ? priorityFilter : undefined,
            fromDate: dateRangeFilter.start?.toDate(),
            toDate: dateRangeFilter.end?.toDate(),
        });
    }, [searchTerm, statusFilter, priorityFilter, dateRangeFilter, tasks]);

    const applyFilters = ({ searchTerm, status, priority, fromDate, toDate }: FilterParams) => {
        let filtered = [...tasks];

        if (searchTerm) {
            const q = searchTerm.toLowerCase();
            filtered = filtered.filter(task =>
                task.title.toLowerCase().includes(q) ||
                task.description.toLowerCase().includes(q)
            );
        }

        if (status) {
            filtered = filtered.filter(({ status: s }) => s?.value === status);
        }

        if (priority) {
            filtered = filtered.filter(({ priority: p }) => p?.value === priority);
        }

        if (fromDate && toDate) {
            filtered = filtered.filter(task => {
                const due = new Date(task.dueDate);
                return due >= fromDate && due <= toDate;
            });
        }

        setFilteredTasks(filtered);
    };

    const handleEdit = (task: Task) => {
        setSelectedTask(task);
        setOpenFormModal(true);
    };

    const handleDelete = () => {
        if (removeId) {
            deleteTask(removeId);
            setRemoveId("");
        }
        setOpenDeleteModal(false);
    };

    const handlePageChange = (status: string, page: number) => {
        setCurrentPage(prev => ({ ...prev, [status]: page }));
    };

    const isOverdue = (dueDate: string, status: string) => {
        if (status === 'done') return false;
        return new Date(dueDate) < new Date();
    };

    const getStatusLabel = (status: string): string => {
        switch (status) {
            case "todo":
                return "Todo";
            case "in_progress":
                return "In Progress";
            case "done":
                return "Done";
            default:
                return status;
        }
    };

    return (
        <>
            <div className="gap-4 mb-8">
                <TaskFilters />
                <CustomButton
                    onClick={() => setOpenFormModal(true)}
                    variant="contained"
                    startIcon={<Plus className="w-4 h-4" />}
                    className="px-6 py-2 rounded-lg font-medium shadow-md"
                >
                    Add Task
                </CustomButton>
            </div>

            <TaskBoard
                filteredTasks={filteredTasks}
                currentPage={currentPage}
                tasksPerPage={TASKS_PER_PAGE}
                onPageChange={handlePageChange}
                onEdit={handleEdit}
                onDelete={(id) => { setRemoveId(id); setOpenDeleteModal(true); }}
                onDragStart={(e, task) => { setDraggedTask(task); e.dataTransfer.effectAllowed = "move"; }}
                onDrop={(e, status) => {
                    e.preventDefault();
                    if (draggedTask) {
                        updateTask({
                            ...draggedTask,
                            status: {
                                label: getStatusLabel(status),
                                value: status,
                            },
                        });
                        setDraggedTask(null);
                    }
                }}
                isOverdue={isOverdue}
            />

            <TaskFormModal open={openFormModal} initialData={selectedTask} onClose={() => { setOpenFormModal(false); setSelectedTask(undefined); }} />
            <DeleteConfirmModal open={openDeleteModal} onClose={() => setOpenDeleteModal(false)} onConfirm={handleDelete} />

        </>
    );
}
