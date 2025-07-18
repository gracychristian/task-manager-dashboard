import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import CustomButton from "./ui/CustomButton";

interface DeleteModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const DeleteConfirmModal = ({ open, onClose, onConfirm }: DeleteModalProps) => {
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Warning</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete this task? This action cannot be undone.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <CustomButton
                    onClick={onClose}
                    variant="outlined"
                    className="text-gray-600 border-gray-300 hover:bg-gray-50 hover:border-gray-400 font-medium"
                >
                    Cancel
                </CustomButton>


                <CustomButton
                    variant="contained"
                    onClick={onConfirm}
                    className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-4 rounded-lg font-medium transition-all duration-200"
                >
                    Delete
                </CustomButton>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteConfirmModal;
