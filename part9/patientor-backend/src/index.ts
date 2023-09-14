import express from 'express';
import diagnoseRouter from './routes/diagnoses';
import patientRouter from './routes/patients';
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cors());

const ping=express.Router().get('/',(_req,res)=>{

    console.log('someone ping here ');
    res.send('pong');
});
app.use('/api/ping',ping);
app.use('/api/diagnoses', diagnoseRouter);
app.use('/api/patients', patientRouter);
const port = 3001;
app.listen(port, () => {
    console.log(`server is running on ${port}`);
});