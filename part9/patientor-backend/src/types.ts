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
    gender:string;
    occupation:string;
    ssn:string;

}

export type PatientWithoutSSN=Omit <Patient,'ssn'>;

