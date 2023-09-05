import { NewPatient, Gender, EntryWithoutId, Diagnose, NewBaseEntry, HealthCheckRating } from "./types";

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


export const toNewEntry = (object: unknown): EntryWithoutId => {
    if (!object || typeof object !== 'object') {
        throw new Error("incorrect or missing data");

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
                const hospitalEntry: EntryWithoutId = {
                    ...newEntry,
                    type: 'Hospital',
                    discharge: parseDischarge(object),
                }
                return hospitalEntry;

            case 'HealthCheck': {
                if ('healthCheckRating' in object) {

                    const healthCheckEntry: EntryWithoutId = {
                        ...newEntry,
                        type: 'HealthCheck',
                        healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
                    };
                    return healthCheckEntry;
                }
            };

            case 'OccupationalHealthcare':
            if ('emploayerName' in object   && 'sickLeave' in object) {
                const occupationalHealthcareEntry: EntryWithoutId = {
                    ...newEntry,
                    type: 'OccupationalHealthcare',
                    employerName: parseString(object.emploayerName),
                    sickLeave: parseSickLeave(object.sickLeave)
                };
                return occupationalHealthcareEntry;
            }

            default:
                break;
        }

    }


    throw new Error("incorrect data:some fields are missing");

};



const toNewPatient = (object: unknown): NewPatient => {
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



const isDOB = (dob: string): boolean => {
    return Boolean(Date.parse(dob));
}

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
    if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
        throw new Error('Incorrect or missing healthCheckRating: ' + healthCheckRating);
    }
    return healthCheckRating;
};
const parseDischarge = (object: unknown): { date: string, criteria: string } => {
    if (!object || typeof object !== 'object') {
        throw new Error("incorrect or missing discharge data");


    }
    if ('date' in object && 'criteria' in object) {
        const discharge = {
            date: parseDate(object.date),
            criteria: parseString(object.criteria),
        }
        return discharge
    }



}


const parseSickLeave = (object: unknown): { startDate: string, endDate: string } => {
    if (!object || typeof object !== 'object') {
        throw new Error("incorrect or missing sick leave data");
    }
    const { startDate, endDate } = object as { startDate: string, endDate: string };
    return {
        startDate: parseDate(startDate),
        endDate: parseDate(endDate)
    }
}


const parseDOB = (dateOfBirth: unknown): string => {


    if (!dateOfBirth || !isString(dateOfBirth) || !isDOB(dateOfBirth)) {
        throw new Error('incorrect or missing dob :' + dateOfBirth);
    }
    return dateOfBirth;
}

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || isDate(date)) {
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
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
        // we will just trust the data to be in correct form
        return [] as Array<Diagnose['code']>;
    }

    return object.diagnosisCodes as Array<Diagnose['code']>;
};





export default toNewPatient;