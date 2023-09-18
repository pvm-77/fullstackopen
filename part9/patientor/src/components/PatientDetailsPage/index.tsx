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

import { useState, useEffect } from "react";
import { assertNever } from "../../utils";
import { Button, Box, Typography } from "@mui/material";
import { create } from "../../services/entry";

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
          <Typography> {entry.description}</Typography>
          <MedicalServicesIcon />
        </Box>

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
          <Typography> {entry.description}</Typography>
          <MedicalServicesIcon />
        </Box>
        <Typography>diagnose by {entry.specialist}</Typography>
        <Typography>
          discharged {entry.discharge.date}:{entry.discharge.criteria}
        </Typography>
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
          <Typography> {entry.description}</Typography>
          <MedicalServicesIcon />
        </Box>
        <Typography>diagnose by {entry.specialist}</Typography>
        <p>employer name {entry.employerName}</p>
        <p>sickleave </p>
        <p>start date {entry.sickLeave?.startDate}</p>
        <p>end date {entry.sickLeave?.endDate}</p>
      </Box>
    );
  }
  return null;
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
interface PatientDetailsPageProps {
  patient: Patient | null | undefined;
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
  diagnos: Diagnosis[];
}
const PatientDetailsPage = ({
  patient,
  setPatients,
  diagnos,
}: PatientDetailsPageProps) => {
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
      if (patient) {
        const newAddedEntry = await create(patient.id, values);
        setPatients((prevPatients) => {
          const updatedPatients = prevPatients.map((prevPatient) => {
            if (prevPatient.id === patient.id) {
              return {
                ...prevPatient,
                entries: [...prevPatient.entries, newAddedEntry],
              };
            }
            return prevPatient;
          });
          
          return updatedPatients;
        });
      }

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

        {patient?.entries &&
          patient?.entries.map((entry) => <EntryDetails entry={entry} />)}
        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
          diagnos={diagnos}
        />
        <Button variant="contained" onClick={() => openModal()}>
          Add New Entry
        </Button>
      </Box>
    </>
  );
};

export default PatientDetailsPage;
