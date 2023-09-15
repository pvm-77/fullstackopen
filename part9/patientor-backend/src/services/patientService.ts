import { Entry, EntryWithoutId, NewPatient, Patient } from '../types';
import data from '../../data/patients';
import { v4 as uuidv4 } from 'uuid';
console.log(data.entries)
export const getPatientsWithoutSSN = (): Omit<Patient, 'ssn'|'entries'>[] => {
    return data.map(({ id, dateOfBirth, name, gender, occupation }) => ({
        id, dateOfBirth, name, gender, occupation
    }))
};

export const fetchAllPatients=():Patient[]=>{
    return data;
}

export const findById=(id:string):Patient| undefined=>{
    const patient=data.find(p=>p.id===id);
    return patient;
}


export const addPatient = (patient: NewPatient): Patient => {

    const newPatient = {
        id: uuidv4(),
        ...patient
    };

    data.push(newPatient);
    return newPatient;

}

export const addEntry=(patient:Patient, entry:EntryWithoutId):Entry=>{
    const newEntry = {
        id: uuidv4(),
        ...entry
    };

    patient.entries.push(newEntry);
    return newEntry;
}




