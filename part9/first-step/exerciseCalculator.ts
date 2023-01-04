interface Result {
    periodLength: number;
    trainingDays: number;
    success: false;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;

}

const parseArguments = (args: Array<string>): Array<number> => {
    
    if (args.length < 4) {
        throw new Error('not enough info provided')
    }

    throw new Error('provided values were not numbers');
}




const calculateExercises = (args: number[], rating: number): Result => {
    return {
        periodLength: args.length,
        trainingDays: (args.filter(arg => arg !== 0)).length,
        success: false,
        rating: rating,
        ratingDescription: 'not too bad but could be better',
        target: 2,
        average: (args.reduce((accumulator, currentValue) => accumulator + currentValue, 0)) / args.length
    }
}

console.log('yes', parseArguments(process.argv));

try {
    const [targetValue, ...bmiCalculatorParams] = parseArguments(process.argv)
    console.log('target value is ', targetValue);
    console.log('bmi calculator params', bmiCalculatorParams);
    console.log(calculateExercises(bmiCalculatorParams, targetValue));
    ;

} catch (error: unknown) {
    let errorMessage = 'something bad happened'
    if (error instanceof Error) {
        errorMessage += 'Error :' + error.message
    }
    console.log(errorMessage);
}



