import express from 'express';
const app = express();

import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
app.use(express.json());


app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
    try {
        const heightInCentimeters = Number(req.query.height);
        const weightInKg = Number(req.query.weight);
        if (isNaN(heightInCentimeters) || isNaN(weightInKg)) {
            res.status(400).json({ error: 'malformatted parameters' });
        }

        res.status(200).json({
            weight: weightInKg,
            height: heightInCentimeters,
            bmi: calculateBmi(heightInCentimeters, weightInKg)
        })

    } catch (error) {
        res.status(500).json({ error: 'malformatted parameters' })
    }

});

app.post('/exercises', (req, res) => {
    try {
        const { daily_exercises, target } = req.body;
        if(!daily_exercises||!target){
            res.status(400).json({error:'parameter missing'})
        }
        if (!Array.isArray(daily_exercises) || isNaN((Number(target)))) {
            res.status(400).json({error:'malformatted parametes'});
        }

        const exerciseList = calculateExercises(daily_exercises, target);
        res.status(200).json({ exerciseList })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }

})

const PORT = 3003;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})