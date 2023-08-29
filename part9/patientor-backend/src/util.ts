import { NewPatient } from "./types";
const toNewPatient = (object: unknown): NewPatient => {
    if(!object || typeof object!=='object' ){
        throw new Error("incorrect or missing data");
        
    }

    if('name' in object && 'ssn' in object && 'dateOfBirth' in object && 'gender' in object && 'occupation' in object){

        const newPatient: NewPatient = {
            name: parseString(object.name),
            dateOfBirth: parseDOB(object.name),
            ssn: parseString(object.ssn),
            gender: parseString(object.gender),
            occupation: parseString(object.occupation),
    
        };
    return newPatient;


    }

    throw new Error("incorrect data:some fields are missing");
    
    
}

const isDOB=(dob:string):boolean=>{
    return Boolean(Date.parse(dob));
}
const parseDOB = (dob: unknown): string => {
    if (!dob || !isString(dob) || !isDOB(dob)) {
        throw new Error('incorrect or missing dob'+dob);
    }
    return dob;
}
const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;

}

const parseString = (anyString: unknown): string => {
    if (!anyString || !isString(anyString)) {
        throw new Error('in correct or missing' + anyString);
    }
    return anyString;
}





export default toNewPatient;