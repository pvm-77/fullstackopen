interface Bmi {
    height: number;
    weight: number;
}
const parseArguments = (args: string[]): Bmi => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        };

    } else {
        throw new Error('provided values were not numbers');
    }

};
export const calculateBmi = (height: number, weight: number): string => {
    const bmi: number = (weight / (height * height)) * 10000;

    if (bmi < 18.5) {
        return 'underweight';
    }
    else if (bmi > 18.5 && bmi < 24.9) {
        return 'Normal (healthy weight)';
    }
    else if (bmi >= 25 && bmi <= 29.9) {
        return 'overweight';
    }
    else
        return 'obesity';
};



try {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
} catch (error: unknown) {
    let errorMessage = ' something bad happend';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}