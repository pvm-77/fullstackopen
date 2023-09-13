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
  const description = useField("text");
  const [selectedDate, setSelectedDate] = useState("");
  const specialist = useField("text");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const diagnosisCode = useField("text");
  const healthCheckRating = useField("number");

  const dischargeCriteria = useField("text");
  const employerName = useField("text");
  const [selectedDischargeDate, setSelectedDischargeDate] = useState("");
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [selectedEntryType, setSelectedEntryType] = useState("");

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
      setDiagnosisCodes([...diagnosisCodes, diagnosisCode.value.trim()]);
      diagnosisCode.reset();
    }
  };
  const addEntry = (e: SyntheticEvent) => {
    e.preventDefault();
    const baseEntry = {
      date: selectedDate,
      description: description.value,
      specialist: specialist.value,
      diagnosisCodes: diagnosisCodes,
    };
    console.log("date", baseEntry);

    switch (selectedEntryType) {
      case "HealthCheck":
        onSubmit({
          ...baseEntry,
          type: "HealthCheck",
          healthCheckRating: Number(healthCheckRating.value),
        });
        break;
      case "Hospital":
        onSubmit({
          ...baseEntry,
          type: "Hospital",
          discharge: {
            date: selectedDischargeDate,
            criteria: dischargeCriteria.value,
          },
        });

        break;
      case "OccupationalHealthcare":
        onSubmit({
          ...baseEntry,
          type: "OccupationalHealthcare",
          employerName: employerName.value,
          sickLeave: {
            startDate: selectedStartDate,
            endDate: selectedEndDate,
          },
        });

        break;

      default:
        break;
    }
  };
  return (
    <div>
      <form onSubmit={addEntry}>
        <InputLabel>date</InputLabel>
        <TextField
          fullWidth
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
        <TextField
          type={description.type}
          value={description.value}
          onChange={description.onChange}
          margin="normal"
          fullWidth
          label="description"
          variant="outlined"
        />
        <TextField
          type={specialist.type}
          value={specialist.value}
          onChange={specialist.onChange}
          margin="normal"
          fullWidth
          label="specialist"
          variant="outlined"
        />
        <TextField
          value={diagnosisCode.value}
          onChange={diagnosisCode.onChange}
          type={diagnosisCode.type}
          margin="normal"
          fullWidth
          label="diagnosisCode"
          variant="outlined"
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
            <InputLabel>discharge date</InputLabel>
            <TextField
              type="date"
              fullWidth
              value={selectedDischargeDate}
              onChange={(e) => setSelectedDischargeDate(e.target.value)}
            />
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
          <>
            <InputLabel>Rating between 0 to 3</InputLabel>
            <TextField
              type={healthCheckRating.type}
              margin="normal"
              fullWidth
              label="health check rating"
              variant="outlined"
              value={healthCheckRating.value}
              onChange={healthCheckRating.onChange}
            />
          </>
        )}
        {selectedEntryType === "OccupationalHealthcare" && (
          <>
            <TextField
              value={employerName.value}
              onChange={employerName.onChange}
              margin="normal"
              fullWidth
              label="employer name"
              variant="outlined"
            />
            <InputLabel>Start date</InputLabel>
            <TextField
              fullWidth
              type="date"
              value={selectedStartDate}
              onChange={(e) => setSelectedStartDate(e.target.value)}
            />
            <InputLabel>End date</InputLabel>

            <TextField
              fullWidth
              type="date"
              value={selectedEndDate}
              onChange={(e) => setSelectedEndDate(e.target.value)}
            />
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
