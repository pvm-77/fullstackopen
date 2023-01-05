import patientData from '../../data/patients'
import { Patient, PatientWithoutSSN } from "../types"
const getAllPatients = (): Patient[] => {
    return patientData;
}
const getPatientsWithoutSSN = (): PatientWithoutSSN[] => {
    return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id, name, dateOfBirth, gender, occupation
    }))

}


export default {
    getAllPatients,
    getPatientsWithoutSSN
}