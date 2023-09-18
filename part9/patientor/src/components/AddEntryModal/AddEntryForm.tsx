import { SyntheticEvent, useState } from "react";
import { Diagnosis, EntryFormValues } from "../../types";
import {
  Grid,
  TextField,
  Select,
  Button,
  MenuItem,
  InputLabel,
  FormControl,
  Chip,
  OutlinedInput,
  Box,
  Menu,
  SelectChangeEvent,
} from "@mui/material";

import { useField } from "../../hooks";
interface AddEntryFormProps {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
  diagnos?: Diagnosis[];
}
const AddEntryForm = ({ onCancel, onSubmit, diagnos }: AddEntryFormProps) => {
  console.log("diagnos in entry form", diagnos);
  const description = useField("text");
  const [selectedDate, setSelectedDate] = useState("");
  const specialist = useField("text");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  const handledcodeChange = (e: SelectChangeEvent<typeof diagnosisCodes>) => {
    const {
      target: { value },
    } = e;
    setDiagnosisCodes(typeof value === "string" ? value.split(",") : value);
  };
  const healthCheckRating = useField("number");

  const dischargeCriteria = useField("text");
  const employerName = useField("text");
  const [selectedDischargeDate, setSelectedDischargeDate] = useState("");
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [selectedEntryType, setSelectedEntryType] = useState("");
  const addEntry = (e: SyntheticEvent) => {
    e.preventDefault();
    const baseEntry = {
      date: selectedDate,
      description: description.value,
      specialist: specialist.value,
      diagnosisCodes: diagnosisCodes,
    };
    console.log('base entry is',baseEntry)
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

        <FormControl fullWidth  margin="normal">
          <InputLabel id="demo-multiple-diagnosiscode-label">
            diagnosis code
          </InputLabel>
          <Select
            labelId="demo-multiple-diagnosiscode-label"
            id="demo-multiple-diagnosiscode"
            multiple
            value={diagnosisCodes}
            onChange={handledcodeChange}
            input={
              <OutlinedInput
                id="select-multiple-diagnosiscode"
                label="diagnosis code"
              />
            }
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            // MenuProps={MenuProps}
          >
            {diagnos?.map((d) => (
              <MenuItem key={d.code} value={d.code}>
                {d.code}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

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
