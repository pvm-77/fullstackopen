
interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?:  Array<Diagnose["code"]>;
}
export type NewBaseEntry=Omit<BaseEntry,'id'>;

export interface SickLeave{
    startDate:string;
    endDate:string;

}
export interface Discharge{
    date:string;
    criteria:string;
}
export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}
export interface HealthCheckEntry extends BaseEntry {
    type: 'HealthCheck';
    healthCheckRating: HealthCheckRating;
}


export interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge:Discharge;

}
export interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?:SickLeave;
}

export type Entry = OccupationalHealthcareEntry | HospitalEntry | HealthCheckEntry;

// define special omit for unions
type UnionOmit<T,K extends string| number|  symbol>=T extends unknown?Omit<T,K>:never;
export type EntryWithoutId=UnionOmit<Entry,'id'>

export interface Diagnose {
    code: string;
    name: string;
    latin?: string;
};



export interface Patient {
    id: string;
    name: string;
    gender: Gender;
    occupation: string;
    dateOfBirth: string;
    ssn: string;
    entries: Entry[];
}

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = "other"

}

export type NewPatient = Omit<Patient, 'id'>;
export type PatientWithoutSSN = Omit<Patient, 'ssn' | 'entries'>;
export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;