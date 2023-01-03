type Operation = 'add' | 'divide' | 'multiply'

const calculator = (a: number, b: number, operator: Operation): number | string => {
    switch (operator) {
        case 'add':
            return a + b;
        case 'multiply':
            return a * b;
        case 'divide':
            if (b === 0) return 'can not divide by zero'
            return a / b;

        default:
            throw new Error('unknown operation');
    }

}
try {
    console.log(calculator(3, 5, 'add'));
} catch (error: unknown) {
    let errorMessage = 'something went wrong';
    if (error instanceof Error) {
        errorMessage += 'Error: ' + error.message

    }
    console.log(errorMessage);


}


