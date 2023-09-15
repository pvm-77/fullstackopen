import { useState, useEffect } from "react";
import axios from "axios";
import {
  // BrowserRouter as Router,
  Route,
  Link,
  Routes,
  useMatch,
} from "react-router-dom";
import { Button, Divider, Container, Typography } from "@mui/material";

import { apiBaseUrl } from "./constants";
import { Diagnosis, Entry, Patient } from "./types";

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import PatientV from "./components/PatientListPage/PatientV";
import PatientDetailsPage from "./components/PatientDetailsPage";
import { getAllDiagnosisCodeList } from "./services/diagnosis";
const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [diagnos,setDiagnos]=useState<Diagnosis[]>([]);
  console.log(diagnos);
  useEffect(()=>{
    const fetchDiagnoseCodeList=async()=>{
      // api call here
      const diagnosisCodes=await getAllDiagnosisCodeList();
      setDiagnos(diagnosisCodes);
    }

    void fetchDiagnoseCodeList();
  },[])
  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    void fetchPatientList();
  }, []);

  const match = useMatch("/patients/:id");
  const singlePatientById = match
    ? patients.find((patient) => patient.id === match.params.id)
    : null;



  console.log("current patient clik", singlePatientById);
  return (
    <div className="App">
      {/* <Router> */}
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route
              path="/"
              element={
                <PatientListPage
                  patients={patients}
                  setPatients={setPatients}
                />
              }
            />
            <Route path="/patients/:id" element={
            <PatientDetailsPage patient={singlePatientById} diagnos={diagnos} />} />
          </Routes>
        </Container>
      {/* </Router> */}
    </div>
  );
};

export default App;
