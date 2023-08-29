export interface Diagnose {
    code:string;
    name:string;
    latin?:string;
};

export interface Patient{
    id:string;
    name:string;
    gender:string;
    occupation:string;
    dateOfBirth:string;
    ssn:string;
}

export type NewPatient=Omit<Patient,'id'>;

export type PatientWithoutSSN=Omit<Patient,'ssn'>;