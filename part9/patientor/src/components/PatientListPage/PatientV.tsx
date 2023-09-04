import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FemaleIcon from "@mui/icons-material/Female";
import { Patient } from "../../types";
import patientService from "../../services/patients";

import { Entry } from "../../types";

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
  return (
    <div>
      <p>{entry.date}</p>
      <p>{entry.description}</p>
    </div>
  );
};
const HospitalEntry = ({ entry }: { entry: Entry }) => {
  console.log("entry is", entry);
  return (
    <div>
      <p>{entry.date}</p>
      <p>{entry.description}</p>
    </div>
  );
};
const OccupationalHealthcareEntry = ({ entry }: { entry: Entry }) => {
  return (
    <div>
      <p>{entry.date}</p>
      <p>{entry.description}</p>
    </div>
  );
};
const PatientV = () => {
  const [patient, setPatient] = useState<Patient>({} as Patient);
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
        <p>yes correct</p>
        {patient.entries &&
          patient.entries.map((entry) => <EntryDetails entry={entry} />)}
      </div>
    </div>
  );
};

export default PatientV;
