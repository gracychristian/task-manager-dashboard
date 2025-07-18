import React from 'react';
import { Filter, X } from 'lucide-react';
import { useTasks } from '../../context/TaskContext';
import { priorityOptions, statusOptions } from '../../constants/constant';
import type { TaskPriority, TaskStatus } from '../../types/task';
import { Button, Card, CardContent, CardHeader, FormLabel, IconButton, Typography } from '@mui/material';
import SearchField from '../ui/SearchField';
import DatePickerField from '../ui/DatePickerField';
import FilterSelect from './FilterSelect';

export const TaskFilters: React.FC = () => {
    const {
        searchTerm,
        setSearchTerm,
        statusFilter,
        setStatusFilter,
        priorityFilter,
        setPriorityFilter,
        dateRangeFilter,
        setDateRangeFilter
    } = useTasks();

    const clearFilters = () => {
        setSearchTerm('');
        setStatusFilter('all');
        setPriorityFilter('all');
        setDateRangeFilter({ start: null, end: null });
    };

    return (
        <Card className="mx-auto px-2 pb-3bg-white shadow-lg border border-gray-100 rounded-2xl max-w-4xl w-full overflow-hidden backdrop-blur-sm">
            <CardHeader
                avatar={
                    <IconButton aria-label="filter">
                        <Filter className="h-5 w-5 text-blue-600" />
                    </IconButton>
                }
                action={
                    <Button
                        variant="text"
                        size="small"
                        startIcon={<X className="h-4 w-4 text-gray-500" />}
                        sx={{
                            color: 'gray.500',
                            '&:hover': {
                                color: 'gray.700',
                                backgroundColor: 'rgba(0,0,0,0.04)',
                            },
                            textTransform: 'none',
                            fontSize: '0.875rem',
                        }}
                        onClick={clearFilters}
                    >
                        Clear all
                    </Button>
                }
                title={
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 'bold',
                            fontSize: '1.25rem',
                            color: '#1f2937',
                            textAlign: 'left',
                            width: '100%',
                        }}
                    >
                        Filters & Search
                    </Typography>
                }
            />

            <CardContent className="space-y-8 px-6 py-8 sm:px-8 text-left">
                <div className="space-y-2">
                    <SearchField clearSearch={searchTerm === ''} handleSearch={setSearchTerm} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <FilterSelect
                            label="Status"
                            options={[{ label: "All", value: "all" }, ...statusOptions]}
                            value={statusFilter}
                            onChange={(val) => setStatusFilter(val as TaskStatus | 'all')}
                            clearable
                        />
                    </div>
                    <div className="space-y-2">
                        <FilterSelect
                            label="Priority"
                            options={[{ label: "All", value: "all" }, ...priorityOptions]}
                            value={priorityFilter}
                            onChange={(val) => setPriorityFilter(val as TaskPriority | 'all')}
                            clearable
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <FormLabel className="text-left text-base font-semibold text-gray-900">
                        Due Date Range
                    </FormLabel>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <DatePickerField
                                label="Start Date"
                                value={dateRangeFilter.start}
                                onChange={(newValue) =>
                                    setDateRangeFilter({
                                        start: newValue,
                                        end: dateRangeFilter.end
                                    })
                                }
                            />
                        </div>
                        <div className="space-y-2">
                            <DatePickerField
                                label="End Date"
                                value={dateRangeFilter.end}
                                onChange={(newValue) =>
                                    setDateRangeFilter({
                                        start: dateRangeFilter.start,
                                        end: newValue
                                    })
                                }
                            />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>

    );
};

export default TaskFilters;