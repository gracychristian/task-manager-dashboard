import { Calendar, EditIcon, Trash2 } from "lucide-react";
import type { Task } from "../types/task";
import { IconButton } from "@mui/material";
import { priorityConfig, statusConfig } from "../constants/constant";
import TagBadge from "./ui/TagBadge";

interface TaskListProps {
    taskList: Task[];
    handleEdit: (value: Task) => void;
    handleDelete: (id: string) => void;
}

const TaskList = ({ taskList, handleEdit, handleDelete }: TaskListProps) => {

    const isOverdue = (dueDate: string, status: string) => {
        const today = new Date().toISOString().split('T')[0];
        return dueDate < today && status !== 'done';
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {
                taskList && taskList.map((task: Task) => (
                    <div key={task.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                        <div className="p-5">
                            <div className="flex justify-between items-start mb-3">
                                <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{task.title}</h3>
                                <div className="flex ml-3">
                                    <IconButton
                                        onClick={() => handleEdit(task)}
                                        size="small"
                                        sx={{
                                            color: 'gray',
                                            '&:hover': {
                                                color: 'blue',
                                            },
                                        }}
                                    >
                                        <EditIcon size={16} />
                                    </IconButton>

                                    <IconButton
                                        onClick={() => handleDelete(task.id)}
                                        size="small"
                                        sx={{
                                            color: 'gray',
                                            '&:hover': {
                                                color: 'red',
                                            },
                                        }}
                                    >
                                        <Trash2 size={16} />
                                    </IconButton>
                                </div>
                            </div>

                            <div className="flex gap-2 mb-3 pb-3 border-b border-gray-100">
                                <TagBadge
                                    icon={task.status?.value ? statusConfig[task.status.value]?.icon?.() : null}
                                    label={task.status?.label || "Unknown"}
                                    colorClass={task.status?.value ? statusConfig[task.status.value]?.color || "" : ""}
                                />

                                <TagBadge
                                    label={task.priority?.label || "Unknown"}
                                    colorClass={task.priority?.value ? priorityConfig[task.priority.value]?.color || "" : ""}
                                />
                            </div>


                            <p className="text-gray-600 text-sm mb-4 text-left line-clamp-3">{task.description}</p>

                            <div className="flex items-center gap-2 text-sm">
                                <Calendar className="w-4 h-4 text-gray-500" />
                                <span
                                    className={`${isOverdue(task.dueDate, task.status?.value || "") ? 'text-red-600 font-medium' : 'text-gray-600'
                                        }`}
                                >
                                    Due: {new Date(task.dueDate).toLocaleDateString()}
                                    {isOverdue(task.dueDate, task.status?.value || "") && (
                                        <span className="ml-2 text-red-500 font-medium">(Overdue)</span>
                                    )}
                                </span>
                            </div>

                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default TaskList;