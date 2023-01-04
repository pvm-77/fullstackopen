import express from 'express';
const app = express();
import { calculateBmi } from './bmiCalculator';
app.get('/ping', (_req, res) => {
    res.send('pong');
})
app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack');
});
app.get('/bmi', (req, res) => {
    const heightInCentimeters = Number(req.query.height);
    const weightInKg = Number(req.query.weight);
    const response = calculateBmi(heightInCentimeters, weightInKg);
    console.log('in get',response);
    
    res.status(200).send(response)
});
const PORT = 3003;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);

})