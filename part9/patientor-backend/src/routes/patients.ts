import express from 'express';
import { findById, getPatientsWithoutSSN } from '../services/patientService';
import { addPatient } from '../services/patientService';
import toNewPatient from '../util';
import toNewEntry from '../util';
const patientRouter = express.Router();
patientRouter.get('/:id', (req, res) => {
    const patient = findById(req.params.id);
    if (patient) {
        res.send(patient)

    } else {
        res.sendStatus(404);
    }
})
patientRouter.get('/', (_req, res) => {
    res.send(getPatientsWithoutSSN());

})

patientRouter.post('/', (req, res) => {
    try {
        const newPatient = toNewPatient(req.body);
        const addedPatient = addPatient(newPatient);
        res.json(addedPatient);

    } catch (error) {
        let errorMessage = 'something went wrong ';
        if (error instanceof Error) {
            errorMessage += ' Error ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
})

// entry for patient 
patientRouter.post('/:id/entries',(req,res)=>{

    try {
        
        const newEntry=toNewEntry(req.body);

    } catch (error) {
        
    }

})


export default patientRouter;