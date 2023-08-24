


interface Result {
    periodLength: number;
    trainingDays: number;
    success: false;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;

}
export const calculateExercises = (args: number[], target: number): Result => {
    return {
        periodLength: args.length,
        trainingDays: (args.filter(arg => arg !== 0)).length,
        success: false,
        rating: args[0],
        ratingDescription: 'bad',
        target,
        average: (args.reduce((accumulator, currentValue) => accumulator + currentValue, 0)) / args.length
    }
}




