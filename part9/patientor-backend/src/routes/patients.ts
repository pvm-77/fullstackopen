



import express from 'express';
import { getPatientsWithoutSSN } from '../services/patientService';
import { addPatient } from '../services/patientService';
const patientRouter=express.Router();



patientRouter.get('/',(_req,res)=>{
    res.send(getPatientsWithoutSSN());

})

patientRouter.post('/',(req,res)=>{
    const {name,dateOfBirth,ssn,gender,occupation}=req.body;
    
    const addedPatient=addPatient({name,dateOfBirth,ssn,gender,occupation});
    res.send(addedPatient);
})

export default patientRouter;