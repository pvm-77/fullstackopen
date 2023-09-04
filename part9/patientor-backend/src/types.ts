export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}
interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: string[];
}



export interface HealthCheckEntry extends BaseEntry {
    type: 'HealthCheck';
    healthCheckRating: HealthCheckRating;
}


export interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: {
        date: string;
        criteria: string;
    }

}
export interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: {
        startDate: string;
        endDate: string;
    }
}

export type Entry = OccupationalHealthcareEntry | HospitalEntry | HealthCheckEntry;

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