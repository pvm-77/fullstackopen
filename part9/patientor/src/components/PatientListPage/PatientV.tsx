import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";
import FavoriteSharpIcon from "@mui/icons-material/FavoriteSharp";
import { Box, TextField, Button, Typography } from "@mui/material";
import { EntryFormValues, Patient } from "../../types";
import patientService from "../../services/patients";
import Container from "@mui/material/Container";
import { Entry } from "../../types";
import axios from "axios";

import AddEntryModal from "../AddEntryModal";
import { create } from "../../services/entry";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};
const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntry entry={entry} />;
    case "HealthCheck":
      return <HealthCheckEntry entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntry entry={entry} />;

    default:
      return assertNever(entry);
  }
};
const HealthCheckEntry = ({ entry }: { entry: Entry }) => {
  if ("healthCheckRating" in entry) {
    return (
      <Box
        sx={{ borderRadius: 2, mt: 2, mb: 2, p: 2, border: "1px solid black" }}
      >
        <Box display="flex">
          <Typography>{entry.date}</Typography>
          <MedicalServicesIcon />
        </Box>
        <Typography> {entry.description}</Typography>
       
        {entry.healthCheckRating === 0 ? (
          <FavoriteSharpIcon sx={{ color: "yellow" }} />
        ) : (
          <FavoriteSharpIcon />
        )}
        <Typography></Typography>
        <Typography>diagnose by {entry.specialist}</Typography>
      </Box>
    );
  }
  return null;
};

const HospitalEntry = ({ entry }: { entry: Entry }) => {
  if ("discharge" in entry) {
    return (
      <Box
        sx={{ borderRadius: 2, mt: 2, mb: 2, p: 2, border: "1px solid black" }}
      >
        <Box display="flex">
          <Typography>{entry.date}</Typography>
          <MedicalServicesIcon />
        </Box>
        <Typography> {entry.description}</Typography>

        <p>discharge date</p>
        <p>discharge criteria</p>
        <Typography>diagnose by {entry.specialist}</Typography>
      </Box>
    );
  }
  return null;
};
const OccupationalHealthcareEntry = ({ entry }: { entry: Entry }) => {
  // type assertion
  if ("sickLeave" in entry) {
    return (
      <Box
        sx={{ borderRadius: 2, mt: 2, mb: 2, p: 2, border: "1px solid black" }}
      >
        <Box display="flex">
          <Typography>{entry.date}</Typography>
          <MedicalServicesIcon />
        </Box>

        <Typography> {entry.description}</Typography>
        <p>employer name</p>
        <p>sickleave </p>
        <p>start dat</p>
        <p>end dat</p>
        <Typography>diagnose by {entry.specialist}</Typography>
      </Box>
    );
  }
  return null;
};

const EntryForm = () => {
  return (
    <Container fixed>
      <form>
        <TextField label="description" variant="standard" />
        <TextField label="date" variant="standard" />
        <TextField label="specialist" variant="standard" />
        <TextField label="healthcheck rating" variant="standard" />
      </form>
    </Container>
  );
};
const PatientV = () => {
  const [patient, setPatient] = useState<Patient>({} as Patient);
  const [modalOpen, setOpenModal] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  // handlers for modal
  const openModal = (): void => {
    setOpenModal(true);
  };
  const closeModal = (): void => {
    setOpenModal(false);
    setError(undefined);
  };
  const submitNewEntry = async (values: EntryFormValues) => {
    console.log("values are ", values);
    try {
      const entry = await create(patient.id, values);
      const data = { ...patient, entries: patient.entries.concat(entry) };
      setPatient(data);
      setOpenModal(false);
    } catch (error: unknown) {
      // type narrowing because we dont know
      if (axios.isAxiosError(error)) {
        if (
          error?.response?.data &&
          typeof error?.response?.data === "string"
        ) {
          const message = error.response.data.replace(
            "Something went wrong. Error: ",
            ""
          );
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("unknown Error", error);
        setError("Unknown error");
      }
    }
  };
  const { id } = useParams();
  const fetchData = async (id: string) => {
    try {
      const data = await patientService.getById(id);

      setPatient(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    void fetchData(String(id));
  }, [id]);
  return (
    <>
      <Box display="flex">
        <Typography mr={1} variant="h4" component="h4">
          {patient.name}
        </Typography>
        <sub>
          {patient.gender === "male" && <MaleIcon />}
          {patient.gender === "female" && <FemaleIcon />}
        </sub>
      </Box>
      <Typography mt={4}> ssh:{patient.ssn}</Typography>
      <Typography>occupation:{patient.occupation}</Typography>

      <Box>
        <Typography fontWeight={900} variant="h5" component="h5">
          entries
        </Typography>
        {patient.entries &&
          patient.entries.map((entry) => <EntryDetails entry={entry} />)}
        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
        />
        <Button variant="contained" onClick={() => openModal()}>
          Add New Entry
        </Button>
      </Box>
    </>
  );
};

export default PatientV;
