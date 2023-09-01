import { NewPatient,Gender } from "./types";


const toNewPatient = (object: unknown): NewPatient => {
    if(!object || typeof object!=='object' ){
        throw new Error("incorrect or missing data");
        
    }
    if('entries' in object &&  'name' in object && 'ssn' in object && 'dateOfBirth' in object && 'gender' in object && 'occupation' in object && 'entries' in object){
        const newPatient: NewPatient = {
            name: parseString(object.name),
            dateOfBirth: parseDOB(object.dateOfBirth),
            ssn: parseString(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseString(object.occupation),
            entries:[],
        };
    return newPatient;


    }

    throw new Error("incorrect data:some fields are missing");
    
    
}

// type guards
const isGender=(str:string):str is Gender=>{
    // return ['male','female'].includes(str);
    // second approach
    return Object.values(Gender).map(g=>g.toString()).includes(str);
}
const isString=(text:unknown):text is string=>{
        return typeof text==='string' || text instanceof String;
}
const isDOB=(dob:string):boolean=>{
    return Boolean(Date.parse(dob));
}

// const isDate=(date:string):boolean=>{
//     return Boolean(Date.parse(date));
// }

const parseDOB = (dateOfBirth: unknown): string => {
    // console.log('the dob is',dateOfBirth)

    if (!dateOfBirth|| !isString(dateOfBirth) || !isDOB(dateOfBirth)) {
        throw new Error('incorrect or missing dob :'+dateOfBirth);
    }
    return dateOfBirth;
}
// const parseDate=(date:unknown):string=>{
//     if (!date || !isString(date) || isDate(date)) {
//         throw new Error("incorrect or missing date: "+date);
        
        
//     }
//     return date;
// }
const parseString = (anyString: unknown): string => {
    if (!anyString || !isString(anyString)) {
        throw new Error('in correct or missing' + anyString);
    }
    return anyString;
}

const parseGender=(gender:unknown):Gender=>{
    if (!gender|| !isString(gender) || !isGender(gender)) {
        throw new Error("incorrect or missing gender:"+gender);
        
    }
    return gender;
}



export default toNewPatient;