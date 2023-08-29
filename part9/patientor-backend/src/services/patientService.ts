
// import {PatientWithoutSSN} from '../types';
import { NewPatient, Patient } from '../types';
import data from '../../data/patients';
import { v4 as uuidv4 } from 'uuid';
export const getPatientsWithoutSSN = (): Omit<Patient, 'ssn'>[] => {
    return data.map(({ id, dateOfBirth, name, gender, occupation }) => ({
        id, dateOfBirth, name, gender, occupation
    }))
};


export const addPatient = (patient: NewPatient): Patient => {

    const newPatient = {
        id: uuidv4(),
        ...patient
    };

    data.push(newPatient);
    return newPatient;

}




