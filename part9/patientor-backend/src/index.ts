import express, { json } from 'express';
import patientRouter from './routes/patients';
import cors from 'cors';
const app = express();
app.use(json());
app.use(cors())

app.use('/api/patients',patientRouter);
const port = 3000;
app.listen(port, () => {
    console.log(`server is running on ${port}`);
});