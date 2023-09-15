import {
  Patient,
  HealthCheckRating,
  Entry,
  EntryWithoutId,
  Diagnosis,
} from "../../types";

// icons
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import FavoriteSharpIcon from "@mui/icons-material/FavoriteSharp";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";

import { useState } from "react";
import { assertNever } from "../../utils";
import { Container, Button, Box, Typography } from "@mui/material";

import AddEntryModal from "../AddEntryModal";
import axios from "axios";

const HealthIcon = ({ health }: { health: HealthCheckRating }) => {
  switch (health) {
    case 0:
      return <FavoriteSharpIcon sx={{ color: "red" }} />;
    case 1:
      return <FavoriteSharpIcon sx={{ color: "blue" }} />;
    case 2:
      return <FavoriteSharpIcon sx={{ color: "yellow" }} />;
    case 3:
      return <FavoriteSharpIcon sx={{ color: "green" }} />;
    default:
      return null;
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

        <HealthIcon health={entry.healthCheckRating} />
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
        {entry.diagnosisCodes?.map((d) => {
          console.log(d);
          return <li key={d}>{d}</li>;
        })}
        <p>discharge date:{entry.discharge.date}</p>
        <p>discharge criteria:{entry.discharge.criteria}</p>
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
        <p>employer name {entry.employerName}</p>
        <p>sickleave </p>
        <p>start date {entry.sickLeave?.startDate}</p>
        <p>end date {entry.sickLeave?.endDate}</p>
        <Typography>diagnose by {entry.specialist}</Typography>
      </Box>
    );
  }
  return null;
};

const EntryDetails = ({ entry }: { entry: Entry }) => {
  console.log(entry.diagnosisCodes);

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
interface PatientDetailsPageProps {
  patient: Patient | null | undefined;
  diagnos: Diagnosis[];
}
const PatientDetailsPage = ({ patient, diagnos }: PatientDetailsPageProps) => {
  console.log(patient);
  const [modalOpen, setOpenModal] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => {
    setOpenModal(true);
  };

  const closeModal = (): void => {
    setOpenModal(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryWithoutId) => {
    try {
      // const entry = await create(patient.id, values);
      // const data = { ...patient, entries: patient.entries.concat(entry) };

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

  console.log(patient);
  return (
    <>
      <Box display="flex">
        <Typography mr={1} variant="h4" component="h4">
          {patient?.name}
        </Typography>
        <sub>
          {patient?.gender === "male" && <MaleIcon />}
          {patient?.gender === "female" && <FemaleIcon />}
        </sub>
      </Box>
      <Typography mt={4}> ssh:{patient?.ssn}</Typography>
      <Typography>occupation:{patient?.occupation}</Typography>

      <Box>
        <Typography fontWeight={900} variant="h5" component="h5">
          entries
        </Typography>
        {patient?.entries.map((entry) => {
          return (
            <>
              <p>{entry.description}</p>
             {
              entry.diagnosisCodes?.map(d=>{
                const di=diagnos.find(cDiagnos=>cDiagnos.code===d);

              })
             }
            </>
          );
        })}
        {patient?.entries &&
          patient?.entries.map((entry) => <EntryDetails entry={entry} />)}
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

export default PatientDetailsPage;
