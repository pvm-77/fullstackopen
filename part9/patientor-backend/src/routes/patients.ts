import express from 'express';

import patientService from '../services/patientService';
import { toNewPatientEntry } from '../util';
const patientRouter = express.Router();

patientRouter.get('/', (_req, res) => {
    res.send(patientService.getPatientsWithoutSSN());
});


patientRouter.post('/',(req,res)=>{
    try {
            const newPatient=toNewPatientEntry(req.body);
            const addedPatient=patientService.addPatient(newPatient);
            res.status(201).json()
        
    } catch (error) {
        
    }
})


export default patientRouter;