import { SyntheticEvent, useState } from "react";
import { EntryFormValues } from "../../types";
import {
  Grid,
  TextField,
  Select,
  Button,
  MenuItem,
  InputLabel,
  FormControl,
  Chip,
} from "@mui/material";

import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useField } from "../../hooks";
interface AddEntryFormProps {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
}
const AddEntryForm = ({ onCancel, onSubmit }: AddEntryFormProps) => {
  // const [description, setDescription] = useState("");
  const description = useField("text");
  console.log("description is", description);

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [diagnosisCode, setDiagnosisCode] = useState("");
  const [employerName, setEmployerName] = useState("");
  const dischargeCriteria=useField('text');
  const [selectedDischargeDate, setSelectedDischargeDate] = useState("");
  const specialist = useField("text");
  const [selectedEntryType, setSelectedEntryType] = useState("");

  const handleDiagnosisCode = (event: any) => {
    setDiagnosisCode(event.target.value);
  };
  const handleDiagnosisCodeDelete = (code: string) => {
    setDiagnosisCodes(
      diagnosisCodes.filter(
        (currentDiagnosisCode) => currentDiagnosisCode !== code
      )
    );
    console.log(code);
  };
  const handleInputKeyPress = (event: any) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setDiagnosisCodes([...diagnosisCodes, diagnosisCode.trim()]);
      setDiagnosisCode("");
    }
  };

  return (
    <div>
      <form>
        <TextField
          type={description.type}
          value={description.value}
          onChange={description.onChange}
          margin="normal"
          fullWidth
          label="description"
          variant="outlined"
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker value={selectedDate} label="date" />
        </LocalizationProvider>
        <TextField
          value={specialist}
          margin="normal"
          fullWidth
          label="specialist"
          variant="outlined"
        />
        <TextField
          margin="normal"
          fullWidth
          label="diagnosisCode"
          variant="outlined"
          value={diagnosisCode}
          onChange={handleDiagnosisCode}
          onKeyDown={handleInputKeyPress}
          InputProps={{
            startAdornment: diagnosisCodes.map((code, index) => (
              <Chip
                key={index}
                label={code}
                onDelete={() => handleDiagnosisCodeDelete(code)}
                style={{ margin: "2px" }}
              />
            )),
          }}
        />

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            Select Entry Type
          </InputLabel>

          <Select
            value={selectedEntryType}
            onChange={(e) => setSelectedEntryType(e.target.value)}
          >
            <MenuItem value="Hospital">Hospital</MenuItem>
            <MenuItem value="HealthCheck">HealthCheck</MenuItem>
            <MenuItem value="OccupationalHealthcare">
              OccupationalHealthcare
            </MenuItem>
          </Select>
        </FormControl>

        {selectedEntryType === "Hospital" && (
          <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={selectedDischargeDate}
                label="discharge date"
              />
            </LocalizationProvider>
            <TextField
              value={dischargeCriteria.value}
              type={dischargeCriteria.type}
              onChange={dischargeCriteria.onChange}
              margin="normal"
              fullWidth
              label="discharge criteria"
              variant="outlined"
            />
          </>
        )}
        {selectedEntryType === "HealthCheck" && (
          <TextField
            margin="normal"
            fullWidth
            label="health check rating"
            variant="outlined"
          />
        )}
        {selectedEntryType === "OccupationalHealthcare" && (
          <>
            <TextField
              value={employerName}
              margin="normal"
              fullWidth
              label="employer name"
              variant="outlined"
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker value={selectedStartDate} label="discharge date" />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker value={selectedEndDate} label="end date" />
            </LocalizationProvider>
          </>
        )}

        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;
