import { NewPatient, Gender, EntryWithoutId, Diagnose, NewBaseEntry, HealthCheckRating, Discharge, SickLeave } from "./types";

// type guards

const isGender = (str: string): str is Gender => {
    return Object.values(Gender).map(g => g.toString()).includes(str);
}
const isString = (text: unknown): text is string => {

    return typeof text === 'string' || text instanceof String;
}
const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
}
const isNumber = (param: unknown): param is number => {
    return typeof param === 'number' || param instanceof Number;
}
// const isDOB = (dob: string): boolean => {
//     return Boolean(Date.parse(dob));
// }
const isHealthCheckRating = (param: number): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(param);
};

// parser functions

// const parseDOB = (dateOfBirth: unknown): string => {


//     if (!dateOfBirth || !isString(dateOfBirth) || !isDOB(dateOfBirth)) {
//         throw new Error('incorrect or missing dob :' + dateOfBirth);
//     }
//     return dateOfBirth;
// }

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
    if (!healthCheckRating || !isNumber(healthCheckRating) || !isHealthCheckRating(healthCheckRating)) {

        throw new Error('Incorrect or missing healthCheckRating: ' + healthCheckRating);
    }
    return healthCheckRating;
};
const parseDischarge = (dischargeObject: unknown): Discharge => {
    if (!dischargeObject || typeof dischargeObject !== 'object') {
        throw new Error("malformatted discharge object");

    }
    if ('date' in dischargeObject && 'criteria' in dischargeObject) {
        const discharge: Discharge = {
            date: parseDate(dischargeObject.date),
            criteria: parseString(dischargeObject.criteria),
        }
        return discharge;
    }

    throw new Error("incorrect or missing discharge object fields");


}


const parseSickLeave = (object: unknown): SickLeave => {
    if (!object || typeof object !== 'object') {
        throw new Error("malformatted sickleave data");
    }
    if ('startDate' in object && 'endDate' in object) {
        const sickLeave: SickLeave = {
            startDate: parseDate(object.startDate),
            endDate: parseDate(object.endDate)
        }
        return sickLeave;

    }
    throw new Error("incorrect or missing sick leave data");

}
const parseDate = (date: unknown): string => {
    console.log('in date parser')
    if (!date || !isString(date) || !isDate(date)) {
        console.log('in error thorw')
        throw new Error("incorrect or missing date: " + date);
    }
    return date;
}

const parseString = (anyString: unknown): string => {
    if (!anyString || !isString(anyString)) {
        throw new Error('in correct or missing' + anyString);
    }
    return anyString;
}

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error("incorrect or missing gender:" + gender);

    }
    return gender;
}

const parseDiagnosisCodes = (object: unknown): Array<Diagnose['code']> => {
    console.log('in parse diagnosis',object);
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
        return [] as Array<Diagnose['code']>;
    }

    return object as Array<Diagnose['code']>;
};



export const toNewEntry = (object: unknown): EntryWithoutId => {
    if (!object || typeof object !== 'object') {
        throw new Error("malformatted entry object.Please provide a valid entry object");
    }

    if ('type' in object && 'diagnosisCodes' in object && 'date' in object && 'description' in object && 'specialist' in object) {
        const newEntry: NewBaseEntry = {
            description: parseString(object.description),
            date: parseDate(object.date),
            specialist: parseString(object.specialist),
            diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
        }
        switch (object.type) {
            case 'Hospital':
                if ('discharge' in object) {
                    const hospitalEntry: EntryWithoutId = {
                        ...newEntry,
                        type: 'Hospital',
                        discharge: parseDischarge(object.discharge),
                    }
                    return hospitalEntry;
                }
                throw new Error("incorrect data:discharge object is missing");

            case 'HealthCheck': {
                if ('healthCheckRating' in object) {

                    const healthCheckEntry: EntryWithoutId = {
                        ...newEntry,
                        type: 'HealthCheck',
                        healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
                    };
                    return healthCheckEntry;
                }
                break;
            };

            case 'OccupationalHealthcare': {

                if ('emploayerName' in object && 'sickLeave' in object) {
                    const occupationalHealthcareEntry: EntryWithoutId = {
                        ...newEntry,
                        type: 'OccupationalHealthcare',
                        employerName: parseString(object.emploayerName),
                        sickLeave: parseSickLeave(object.sickLeave)
                    };
                    return occupationalHealthcareEntry;
                }
                break;
            };

            default:
                break;
        }

    }
    throw new Error("incorrect entry object some fields are missing");




};

export const toNewPatient = (object: unknown): NewPatient => {
    if (!object || typeof object !== 'object') {
        throw new Error("incorrect or missing data");

    };

    if ('name' in object && 'ssn' in object && 'dateOfBirth' in object && 'gender' in object && 'occupation' in object && 'entries' in object) {
        const newPatient: NewPatient = {
            name: parseString(object.name),
            dateOfBirth: parseDate(object.dateOfBirth),
            ssn: parseString(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseString(object.occupation),
            entries: [],
        };
        return newPatient;


    }

    throw new Error("incorrect data:some fields are missing");






}

