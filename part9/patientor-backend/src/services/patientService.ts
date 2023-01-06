
import patientData from '../../data/patients'
import { Patient, PatientWithoutSSN, NewPatientEntry } from "../types"
import { v4 as uuidv4 } from 'uuid';
const getAllPatients = (): Patient[] => {
    return patientData;
}

const getPatientsWithoutSSN = (): PatientWithoutSSN[] => {
    return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id, name, dateOfBirth, gender, occupation
    }))

}
const addPatient = (patientObj: NewPatientEntry): Patient => {
    const newPatientEntry = {
        id: uuidv4(),
        ...patientObj
    }
    return newPatientEntry


}


export default {
    getAllPatients,
    getPatientsWithoutSSN,
    addPatient
}