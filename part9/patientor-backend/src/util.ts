import { Gender } from './types';
import { NewPatientEntry } from './types';
const parseDateOfBirth = (dob: any): string => {
    if (!dob || !isDate(dob) || !isString(dob)) {
        throw new Error('Incorrect or missing dateOfBirth');
    }
    return dob;
};
const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing comment');
    }
    return name;
};
const parseGender = (gender: any): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender')
    }
    return gender;
};
const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation');
    }
    return occupation;
};
const parseSSN = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn');
    }
    return ssn;

};


// type guard
const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
}
const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String
};
type Fields = {
    name: unknown,
    dateOfBirth: unknown,
    ssn: unknown,
    gender: unknown,
    occupation: unknown
}
const isGender=(gender:any):gender is Gender=>{
    return Object.values(Gender).includes(gender);
}
export const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation }: Fields) => {
    const newPatient: NewPatientEntry = {
        name: parseName(name),
        dateOfBirth: parseDateOfBirth(dateOfBirth),
        ssn: parseSSN(ssn),
        gender: parseGender(gender),
        occupation: parseOccupation(occupation)
    }
    return newPatient;

}



