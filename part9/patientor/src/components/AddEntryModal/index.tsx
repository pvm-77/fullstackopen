import {
  Dialog,
  DialogContent,
  Divider,
  Alert,
  DialogTitle,
} from "@mui/material";
import { EntryFormValues } from "../../types";
import AddEntryForm from "./AddEntryForm";

interface AddEntryModalProps {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
}
const AddEntryModal = ({
  modalOpen,
  onClose,
  onSubmit,
  error,
}: AddEntryModalProps) => {
  return (
    <Dialog open={modalOpen} onClose={() => onClose()}>
      <DialogTitle>Add a new entry</DialogTitle>
      <Divider />
      <DialogContent>
        {error && <Alert severity="error">{error}</Alert>}
        <AddEntryForm onSubmit={onSubmit} onCancel={onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default AddEntryModal;
