import { isNotNumber } from "./utils";



interface Result {
    periodLength: number;
    trainingDays: number;
    success: false;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;

}
interface Exercises{
    target:number;
    dailyExercises:number[];
}

const parseArguments=(args:string[]):Exercises=>{
    const [,,target,...exercisesList]=args;
    if (isNotNumber(args[2])) {
        throw new Error('target is not a number');
        
    }
    for (let index = 3; index < args.length; index++) {
        if (isNotNumber(args[index])) {
            throw new Error("some thing wrong in provided exercise list");
        }
        
    }
    
    return{
        target:Number(target),
        dailyExercises:exercisesList.map(i=>Number(i))
    };

}

export const calculateExercises = (dailyExercises: number[], target: number): Result => {
    return {
        periodLength: dailyExercises.length,
        trainingDays: (dailyExercises.filter(arg => arg !== 0)).length,
        success: false,
        rating: target,
        ratingDescription: 'not too bad but could be better',
        target,
        average: (dailyExercises.reduce((accumulator, currentValue) => accumulator + currentValue, 0)) / dailyExercises.length
    }
}
try {
    const {target,dailyExercises}=parseArguments(process.argv);
     console.log(calculateExercises(dailyExercises,target))

} catch (error: unknown) {
    let ErrorMessage = ' something bad happened';
    if (error instanceof Error) {
        ErrorMessage += ' Error: ' + error.message;


    }
    console.log(ErrorMessage);
};

