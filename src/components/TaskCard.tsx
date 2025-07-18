import { Calendar, Edit, Trash2 } from "lucide-react";
import { IconButton } from "@mui/material";
import TagBadge from "./ui/TagBadge";
import { statusConfig, priorityConfig } from "../constants/constant";
import type { Task } from "../types/task";

interface TaskCardProps {
    task: Task;
    onEdit: (task: Task) => void;
    onDelete: (id: string) => void;
    onDragStart: (e: React.DragEvent<HTMLDivElement>, task: Task) => void;
    isOverdue: (dueDate: string, status: string) => boolean;
}

const TaskCard = ({
    task,
    onEdit,
    onDelete,
    onDragStart,
    isOverdue,
}: TaskCardProps) => {
    const overdue = isOverdue(task.dueDate, task.status?.value || "");
    return (
        <div
            key={task.id}
            draggable
            onDragStart={(e) => onDragStart(e, task)}
            className="py-3 bg-white rounded-xl shadow-sm border hover:shadow-md transition cursor-grab"
        >
            <div className="p-4">
                <div className="flex justify-between">
                    <h3 className="text-base font-semibold text-gray-900">
                        {task.title}
                    </h3>
                    <div className="flex gap-1">
                        <IconButton
                            onClick={() => onEdit(task)}
                            className="text-gray-500 hover:text-blue-600"
                        >
                            <Edit size={16} />
                        </IconButton>
                        <IconButton
                            onClick={() => onDelete(task.id)}
                            className="text-gray-500 hover:text-red-600"
                        >
                            <Trash2 size={16} />
                        </IconButton>
                    </div>
                </div>

                <div className="flex gap-2 my-2">
                    <TagBadge
                        icon={statusConfig[task.status?.value || ""]?.icon()}
                        label={task.status?.label || ""}
                        colorClass={statusConfig[task.status?.value || ""]?.color}
                    />
                    <TagBadge
                        label={task.priority?.label || ""}
                        colorClass={priorityConfig[task.priority?.value || ""]?.color}
                    />
                </div>

                <p className="text-sm text-gray-600 mb-2 text-left">
                    {task.description}
                </p>

                <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className={overdue ? "text-red-600" : "text-gray-600"}>
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                        {overdue && <span className="ml-1">(Overdue)</span>}
                    </span>
                    <span className={overdue ? "text-red-600" : "text-gray-600"}>
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                        {overdue && <span className="ml-1">(Overdue)</span>}
                    </span>

                </div>
            </div>
        </div>
    );
};

export default TaskCard;
