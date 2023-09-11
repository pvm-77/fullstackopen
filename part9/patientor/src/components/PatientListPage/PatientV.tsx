import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FemaleIcon from "@mui/icons-material/Female";
import { Box, TextField, Button } from "@mui/material";
import { EntryFormValues, Patient } from "../../types";
import patientService from "../../services/patients";
import Container from "@mui/material/Container";
import { Entry } from "../../types";

import AddEntryModal from "../AddEntryModal";

const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntry entry={entry} />;
    case "HealthCheck":
      return <HealthCheckEntry entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntry entry={entry} />;

    default:
      return <p>no such</p>;
  }
};

const HealthCheckEntry = ({ entry }: { entry: Entry }) => {
  console.log(entry);
  return (
    <div>
      <p>{entry.date}</p>
      <p>{entry.description}</p>
      <p>diagnose by {entry.specialist}</p>
    </div>
  );
};
const HospitalEntry = ({ entry }: { entry: Entry }) => {
  console.log("entry is", entry);
  return (
    <div>
      <p>{entry.date}</p>
      <p>{entry.description}</p>
      <p>diagnose by {entry.specialist}</p>
    </div>
  );
};
const OccupationalHealthcareEntry = ({ entry }: { entry: Entry }) => {
  console.log(entry);

  return (
    <div>
      <p>{entry.date}</p>
      <p>{entry.description}</p>
      <p>diagnose by {entry.specialist}</p>
    </div>
  );
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
  const submitNewEntry=async(values:EntryFormValues)=>{

  }
  const { id } = useParams();
  const fetchData = async (id: string) => {
    try {
      const data = await patientService.getById(id);
      console.log(data);
      setPatient(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    void fetchData(String(id));
  }, [id]);
  return (
    <div>
      <p>
        <b>
          <h2>{patient.name}</h2>{" "}
        </b>{" "}
        <sub>
          <FemaleIcon />
        </sub>
      </p>

      <p>ssh:{patient.ssn}</p>
      <p>occupation:{patient.occupation}</p>

      <div>
        <h2>entries</h2>
        {patient.entries &&
          patient.entries.map((entry) => <EntryDetails entry={entry} />)}
      </div>
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
    </div>
  );
};

export default PatientV;
