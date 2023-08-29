import express from 'express';
import diagnoseRouter from './routes/diagnoses';
import patientRouter from './routes/patients';
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cors());

    
app.use('/api/diagnoses', diagnoseRouter);
app.use('/api/patients', patientRouter);


const port = 3000;
app.listen(port, () => {
    console.log(`server is running on ${port}`);
});