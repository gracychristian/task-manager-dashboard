import TaskBoard from "./TaskBoard";
import { useTasks } from "../../context/TaskContext";
import { useEffect, useState } from "react";
import type { Task, TasksHeaderProps } from "../../types/task";
import TaskFilters from "../filters/TaskControls";
import TaskFormModal from "../modals/TaskFormModal";
import DeleteConfirmModal from "../modals/DeleteConfirmModal";
import type { FilterParams } from "../../types/filters";

const TASKS_PER_PAGE = 5;

const Tasks = ({ onEditTask }: TasksHeaderProps) => {
    const { tasks, updateTask, deleteTask, searchTerm, statusFilter, priorityFilter, dateRangeFilter } = useTasks();
    const [openFormModal, setOpenFormModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task>();
    const [removeId, setRemoveId] = useState<string>("");
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);
    const [draggedTask, setDraggedTask] = useState<Task | null>(null);
    const [currentPage, setCurrentPage] = useState({ todo: 1, in_progress: 1, done: 1 });

    useEffect(() => {
        const updated = tasks.map(task => {
            const isPastDue = new Date(task.dueDate) < new Date();
            const isAlreadyDone = task.status?.value === 'done';

            if (isPastDue && !isAlreadyDone) {
                const updatedTask = {
                    ...task,
                    status: { label: 'Done', value: 'done' },
                };
                updateTask(updatedTask);
                return updatedTask;
            }

            return task;
        });

        applyFilters({
            searchTerm,
            status: statusFilter !== 'all' ? statusFilter : undefined,
            priority: priorityFilter !== 'all' ? priorityFilter : undefined,
            fromDate: dateRangeFilter.start?.toDate(),
            toDate: dateRangeFilter.end?.toDate(),
        }, updated);

    }, [searchTerm, statusFilter, priorityFilter, dateRangeFilter, tasks]);

    const applyFilters = ({ searchTerm, status, priority, fromDate, toDate }: FilterParams, baseTasks: Task[] = tasks) => {
        let filtered = [...baseTasks];

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
        filtered.sort((a, b) => Number(b.id) - Number(a.id))
        setFilteredTasks(filtered);
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

    const isOverdue = (dueDate: string, status?: string) => {
        if (!status || status === 'done') return false;
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

    const handleOnDrop = (status: string) => {
        if (draggedTask) {
            const isOverdue = new Date(draggedTask.dueDate) < new Date();

            if (isOverdue) {
                setDraggedTask(null);
                return;
            }
            updateTask({
                ...draggedTask,
                status: {
                    label: getStatusLabel(status),
                    value: status,
                },
            });
            setDraggedTask(null);
        }
    }

    return (
        <>
            <div className="max-w-4xl mx-auto">

                <div className="gap-4 mb-8">
                    <TaskFilters />
                </div>

                <TaskBoard
                    filteredTasks={filteredTasks}
                    currentPage={currentPage}
                    tasksPerPage={TASKS_PER_PAGE}
                    onPageChange={handlePageChange}
                    onEdit={(task) => onEditTask(task)}
                    onDelete={(id) => { setRemoveId(id); setOpenDeleteModal(true); }}
                    onDragStart={(e, task) => { setDraggedTask(task); e.dataTransfer.effectAllowed = "move"; }}
                    onDrop={(e, status) => {
                        e.preventDefault();
                        handleOnDrop(status)
                    }}
                    isOverdue={isOverdue}
                />
            </div>
            <TaskFormModal open={openFormModal} initialData={selectedTask} onClose={() => { setOpenFormModal(false); setSelectedTask(undefined); }} />
            <DeleteConfirmModal open={openDeleteModal} onClose={() => setOpenDeleteModal(false)} onConfirm={handleDelete} />
        </>
    );
}

export default Tasks;