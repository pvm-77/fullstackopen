

const calculateBmi = (height: number, weight: number): string => {
    console.log('height', height);
    console.log('weigth', weight);


    let bmi: number = (weight / (height * height))*10000;
    console.log(bmi);

    if (bmi < 18.5) {
        return 'underweight'
    }
    else if (bmi > 18.5 && bmi < 24.9) {
        return 'Normal (healthy weight)'
    }
    else if (bmi >= 25 && bmi <= 29.9) {
        return 'overweight';
    }
    else
        return 'obesity';
}
console.log(calculateBmi(180, 74))
