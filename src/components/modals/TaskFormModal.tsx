import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { X } from 'lucide-react';
import type { Task } from '../../types/task';
import { useTasks } from '../../context/TaskContext';
import InputField from '../common/InputField';
import { priorityOptions, statusOptions } from '../../constants/constant';
import CustomButton from '../common/CustomButton';
import type { FormModalProps } from '../../types/props';
import { useEffect } from 'react';

const TaskFormModal = ({ open, initialData, onClose }: FormModalProps) => {
    const taskList = JSON.parse(localStorage.getItem("tasks") || "[]");
    const { addTask, updateTask } = useTasks();

    useEffect(() => {
        if (open && !initialData) {
            formik.resetForm();
        }
    }, [open]);


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
                className: "rounded-2xl shadow-2xl border-0 overflow-hidden",
                style: { height: '80vh', maxHeight: '600px', display: 'flex', flexDirection: 'column' }
            }}
        >
            <DialogTitle className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 flex-shrink-0">
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

            <form onSubmit={formik.handleSubmit} className="flex flex-col flex-1 min-h-0">
                <DialogContent className="p-6 bg-gradient-to-br from-gray-50 to-white flex-1 overflow-y-auto hide-scrollbar">
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                            <InputField
                                name="title"
                                label="Title"
                                placeholder="Title"
                                formik={formik}
                                required
                            />
                        </div>

                        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                            <InputField
                                name="description"
                                label="Description"
                                placeholder="Description"
                                formik={formik}
                                multiline
                                rows={3}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                <InputField
                                    name="status"
                                    label="Status"
                                    placeholder="Status"
                                    formik={formik}
                                    select
                                    options={statusOptions}
                                    required
                                />
                            </div>

                            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                <InputField
                                    name="priority"
                                    label="Priority"
                                    placeholder="Priority"
                                    formik={formik}
                                    select
                                    options={priorityOptions}
                                    required
                                />
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-4 shadow-sm">
                            <DatePicker
                                label="Due Date"
                                value={formik.values.dueDate ? dayjs(formik.values.dueDate) : null}
                                onChange={(date) => {
                                    formik.setFieldValue('dueDate', date ? date.toISOString() : '');
                                }}
                                slotProps={{
                                    textField: {
                                        required: true,
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

                <DialogActions className="!p-4 bg-white border-t border-gray-100 flex-shrink-0">
                    <div className="flex justify-end space-x-3 w-full gap-4">
                        <CustomButton
                            onClick={onClose}
                            variant="outlined"
                            className="text-gray-600 border-gray-300 hover:bg-gray-50 hover:border-gray-400 font-medium"
                        >
                            Cancel
                        </CustomButton>

                        <CustomButton
                            type="submit"
                            variant="contained"
                            className="normal-case px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-200 rounded-lg font-medium shadow-md hover:shadow-lg transform hover:scale-105"
                        >
                            {initialData ? 'Update Task' : 'Add Task'}
                        </CustomButton>
                    </div>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default TaskFormModal;
