 export enum Gender {
    Male="male",
    Female="female",
    Others="others"
}

export interface Diagnose {
    code:string;
    name:string;
    lating?:string;
}
// patient type 
export interface Patient  {
    id:string;
    name:string;
    dateOfBirth:string;
    gender:Gender;
    occupation:string;
    ssn:string;

}

export type PatientWithoutSSN=Omit <Patient,'ssn'>;
export type NewPatientEntry=Omit<Patient,'id'>;
