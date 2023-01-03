interface Result {
    periodLength: number;
    trainingDays: number;
    success: false;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;

}
const calculateExercises = (args: number[], rating: number): Result => {
    return {
        periodLength: args.length,
        trainingDays:(args.filter(arg=>arg!==0)).length,
        success: false,
        rating: rating,
        ratingDescription: 'not too bad but could be better',
        target: 2,
        average:( args.reduce((accumulator, currentValue)=>accumulator+currentValue,0 ))/args.length
    }


}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
