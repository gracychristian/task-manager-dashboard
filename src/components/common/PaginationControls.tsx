import { ChevronLeft, ChevronRight } from "lucide-react";
import CustomButton from "../common/CustomButton";

interface PaginationControlsProps {
    page: number;
    totalPages: number;
    onPageChange: (newPage: number) => void;
}

const PaginationControls = ({ page, totalPages, onPageChange }: PaginationControlsProps) => {
    const getVisiblePages = () => {
        return Array.from({ length: totalPages }, (_, i) => i + 1).filter((p) => {
            if (totalPages <= 3) return true;
            if (page <= 2) return p <= 3;
            if (page >= totalPages - 1) return p >= totalPages - 2;
            return Math.abs(p - page) <= 1;
        });
    };

    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
            <CustomButton
                onClick={() => onPageChange(page - 1)}
                disabled={page === 1}
                startIcon={<ChevronLeft size={16} />}
                variant="text"
                size="small"
                className="!normal-case text-xs px-2 py-1"
                sx={{
                    color: page === 1 ? "#9CA3AF" : "#374151",
                    "&:hover": {
                        backgroundColor: page === 1 ? "transparent" : "#F3F4F6",
                    },
                }}
            >
                Prev
            </CustomButton>

            <div className="flex space-x-1">
                {getVisiblePages().map((p) => (
                    <CustomButton
                        key={p}
                        onClick={() => onPageChange(p)}
                        variant={page === p ? "contained" : "text"}
                        size="small"
                        className="text-xs px-0 py-0"
                        sx={{
                            minWidth: 32,
                            height: 32,
                            borderRadius: 1,
                            padding: 0,
                            fontSize: "0.75rem",
                            backgroundColor: page === p ? "#3B82F6" : "transparent",
                            color: page === p ? "white" : "#374151",
                            "&:hover": {
                                backgroundColor: page === p ? "#2563EB" : "#F3F4F6",
                            },
                        }}
                    >
                        {p}
                    </CustomButton>
                ))}
            </div>

            <CustomButton
                onClick={() => onPageChange(page + 1)}
                disabled={page === totalPages}
                endIcon={<ChevronRight size={16} />}
                variant="text"
                size="small"
                className="text-xs"
                sx={{
                    px: 1,
                    py: 0.5,
                    fontSize: "0.75rem",
                    textTransform: "none",
                    color: page === totalPages ? "#9CA3AF" : "#374151",
                    "&:hover": {
                        backgroundColor: page === totalPages ? "transparent" : "#F3F4F6",
                    },
                }}
            >
                Next
            </CustomButton>
        </div>
    );
};

export default PaginationControls;
