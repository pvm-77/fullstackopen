import React from "react";
import { SyntheticEvent, useState } from "react";
import { EntryFormValues } from "../../types";
import { Grid, TextField, Button } from "@mui/material";

interface AddEntryFormProps {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
}
const AddEntryForm = ({ onCancel, onSubmit }: AddEntryFormProps) => {
  return (
    <div>
      <form>
        <TextField fullWidth label="description" variant="outlined" />
        <TextField fullWidth label="date" variant="outlined" />
        <TextField fullWidth label="specialist" variant="outlined" />
        <TextField fullWidth label="health" variant="outlined" />
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
