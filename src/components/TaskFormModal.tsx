import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    IconButton,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import InputField from './ui/InputField';
import { useTasks } from '../context/TaskContext';
import type { Task } from '../types/task';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { X } from 'lucide-react';
import { priorityOptions, statusOptions } from '../constants/constant';

type FormModalProps = {
    open: boolean;
    initialData?: Task;
    onClose: () => void;
};

const TaskFormModal = ({ open, initialData, onClose }: FormModalProps) => {
    const taskList = JSON.parse(localStorage.getItem("tasks") || "[]");
    const { addTask, updateTask } = useTasks();

    const formik = useFormik<Task>({
        initialValues: {
            id: initialData?.id || "",
            title: initialData?.title || "",
            description: initialData?.description || "",
            status: initialData?.status || null,
            priority: initialData?.priority || null,
            dueDate: initialData?.dueDate || ""
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            title: Yup.string().required('Title is required'),
            description: Yup.string().required('Description is required'),
            status: Yup.object().shape({
                label: Yup.string().required(),
                value: Yup.string().required(),
            }).required('Status is required'),
            priority: Yup.object().shape({
                label: Yup.string().required(),
                value: Yup.string().required(),
            }).required('Priority is required'),

            dueDate: Yup.string().required('Due date is required')
        }),
        onSubmit: (values: Task) => {
            const newTask = {
                ...values,
                id: initialData?.id || dayjs().valueOf().toString(),
            };

            const isDuplicate = taskList.some(
                (task: Task) =>
                    task.title.trim().toLowerCase() === newTask.title.trim().toLowerCase() &&
                    task.id !== newTask.id
            );

            if (isDuplicate) {
                alert("A task with the same title already exists!");
                return;
            }

            if (initialData) {
                updateTask(newTask);
            } else {
                addTask(newTask);
            }

            formik.resetForm();
            onClose();
        }

    });

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
            PaperProps={{
                className: "rounded-2xl shadow-2xl border-0 overflow-hidden"
            }}
        >
            <DialogTitle className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                            <span className="text-white text-lg font-bold">
                                {initialData ? '✎' : '+'}
                            </span>
                        </div>
                        <h2 className="text-xl font-semibold">
                            {initialData ? 'Edit Task' : 'Add New Task'}
                        </h2>
                    </div>
                    <IconButton
                        onClick={onClose}
                        className="text-white hover:bg-white/20 transition-colors duration-200"
                        size="small"
                    >
                        <X className='text-white' />
                    </IconButton>
                </div>
            </DialogTitle>

            <form onSubmit={formik.handleSubmit}>
                <DialogContent className="p-6 bg-gradient-to-br from-gray-50 to-white">
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                            <InputField
                                name="title"
                                label="Title"
                                formik={formik}
                            />
                        </div>

                        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                            <InputField
                                name="description"
                                label="Description"
                                formik={formik}
                                multiline
                                rows={3}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                <InputField
                                    name="status"
                                    label="Status"
                                    formik={formik}
                                    select
                                    options={statusOptions}
                                />
                            </div>

                            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                <InputField
                                    name="priority"
                                    label="Priority"
                                    formik={formik}
                                    select
                                    options={priorityOptions}
                                />
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                            <DatePicker
                                label="Due Date"
                                value={formik.values.dueDate ? dayjs(formik.values.dueDate) : null}
                                onChange={(date) => {
                                    formik.setFieldValue('dueDate', date ? date.toISOString() : '');
                                }}
                                slotProps={{
                                    textField: {
                                        onBlur: () => formik.setFieldTouched('dueDate', true),
                                        fullWidth: true,
                                        error: formik.touched.dueDate && Boolean(formik.errors.dueDate),
                                        helperText: formik.touched.dueDate && formik.errors.dueDate,
                                    },
                                }}
                            />
                        </div>
                    </div>
                </DialogContent>

                <DialogActions className="!p-4 bg-white border-t border-gray-100">
                    <div className="flex justify-end space-x-3 w-full gap-4">
                        <Button
                            onClick={onClose}
                            variant="outlined"
                            className="normal-case px-6 py-4 text-gray-600 border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 rounded-lg font-medium"
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            variant="contained"
                            className="normal-case px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-200 rounded-lg font-medium shadow-md hover:shadow-lg transform hover:scale-105"
                        >
                            {initialData ? 'Update Task' : 'Add Task'}
                        </Button>

                    </div>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default TaskFormModal;
