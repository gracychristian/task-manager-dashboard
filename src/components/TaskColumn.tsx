import TaskCard from "./TaskCard";
import PaginationControls from "./controls/PaginationControls";
import type { Task } from "../types/task";

type Props = {
    columnId: string;
    title: string;
    colorClass: string;
    tasks: Task[];
    page: number;
    totalPages: number;
    onPageChange: (newPage: number) => void;
    onEdit: (task: Task) => void;
    onDelete: (id: string) => void;
    onDragStart: (e: React.DragEvent, task: Task) => void;
    onDrop: (e: React.DragEvent, columnId: string) => void;
    isOverdue: (dueDate: string, status: string) => boolean;
};

export default function TaskColumn({
    columnId, title, colorClass, tasks, page, totalPages,
    onPageChange, onEdit, onDelete, onDragStart, onDrop, isOverdue
}: Props) {
    return (
        <div
            className={`${colorClass} border rounded-lg p-4 min-h-96 w-full lg:flex-1 flex flex-col max-h-[40rem]`}
            onDragOver={(e) => { e.preventDefault(); e.dataTransfer.dropEffect = "move"; }}
            onDrop={(e) => onDrop(e, columnId)}
        >
            <div className="flex justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
                <span className="text-sm font-medium px-2 py-1 rounded-full bg-white text-gray-700">
                    {tasks.length}
                </span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pr-1 hide-scrollbar">
                {tasks.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No tasks yet</p>
                ) : (
                    tasks.map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            onDragStart={onDragStart}
                            isOverdue={isOverdue}
                        />
                    ))
                )}
            </div>

            {totalPages > 1 && (
                <PaginationControls
                    page={page}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                />
            )}
        </div>
    );
}
