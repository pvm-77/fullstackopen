

export const calculateBmi = (height: number, weight: number): string => {
    let bmi: number = (weight / (height * height)) * 10000;

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
