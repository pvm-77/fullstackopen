import {
  Dialog,
  DialogContent,
  Divider,
  Alert,
  DialogTitle,
} from "@mui/material";
import { Diagnosis, EntryFormValues } from "../../types";
import AddEntryForm from "./AddEntryForm";

interface AddEntryModalProps {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  diagnos?:Diagnosis[];
  error?: string;
}
const AddEntryModal = ({
  modalOpen,
  onClose,
  onSubmit,
  diagnos,
  error,
}: AddEntryModalProps) => {
  return (
    <Dialog open={modalOpen} onClose={() => onClose()}>
      <DialogTitle>Add a new entry</DialogTitle>
      <Divider />
      <DialogContent>
        {error && <Alert severity="error">{error}</Alert>}
        <AddEntryForm onSubmit={onSubmit} onCancel={onClose} diagnos={diagnos} />
      </DialogContent>
    </Dialog>
  );
};

export default AddEntryModal;
