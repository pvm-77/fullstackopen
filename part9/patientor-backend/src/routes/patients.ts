import express from 'express';
import { addEntry, fetchAllPatients, findById} from '../services/patientService';
import { addPatient } from '../services/patientService';
import { toNewEntry } from '../util';
import { toNewPatient } from '../util';
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
    const getAllPatients=fetchAllPatients();
    console.log('a',getAllPatients);
    res.send(getAllPatients);

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
patientRouter.post('/:id/entries', (req, res) => {
    try {
        console.log('data from client',req.body);

        const patient = findById(req.params.id);
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        const newEntry = toNewEntry(req.body);
        console.log('new entry in controller',newEntry)
        if (!newEntry) {
            return res.status(404).json({ error: 'invalid entry ' });
        }
        const addedEntry = addEntry(patient, newEntry);
        return res.status(201).json(addedEntry)

    } catch (error) {

        let errorMessage = 'something went wrong ';
        if (error instanceof Error) {
            errorMessage += ' Error ' + error.message;
        }
        return res.status(500).send(errorMessage);
    }

})


export default patientRouter;