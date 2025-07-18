import { columns } from "../../constants/constant";
import type { TaskBoardProps } from "../../types/task";
import TaskColumn from "./TaskColumn";

export default function TaskBoard({
    filteredTasks,
    currentPage,
    tasksPerPage,
    onPageChange,
    onEdit,
    onDelete,
    onDragStart,
    onDrop,
    isOverdue
}: TaskBoardProps) {
    const getTasksByStatus = (status: string) =>
        filteredTasks.filter(task => task.status?.value === status);

    const getpaginatedTasksTasks = (status: string) => {
        const page = currentPage[status];
        const statusTasks = getTasksByStatus(status);
        const start = (page - 1) * tasksPerPage;
        return statusTasks.slice(start, start + tasksPerPage);
    };

    return (
        <div className="flex flex-col lg:flex-row gap-6">
            {columns.map((col) => {
                const paginatedTasks = getpaginatedTasksTasks(col.id);
                const totalPages = Math.ceil(getTasksByStatus(col.id).length / tasksPerPage);
                const totalTaskByStatus = getTasksByStatus(col.id).length
                const page = currentPage[col.id];

                return (
                    <TaskColumn
                        key={col.id}
                        columnId={col.id}
                        title={col.title}
                        colorClass={col.color}
                        tasks={paginatedTasks}
                        page={page}
                        totalPages={totalPages}
                        onPageChange={(p) => onPageChange(col.id, p)}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        onDragStart={onDragStart}
                        onDrop={onDrop}
                        isOverdue={isOverdue}
                        totalTasks={totalTaskByStatus}
                    />
                );
            })}
        </div>
    );
}
