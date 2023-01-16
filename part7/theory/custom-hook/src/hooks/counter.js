import { useState } from "react";


export const useCounter=()=>{
    const [value,setValue]=useState(0);
    const increase=()=>{
        setValue(value+1)
    }
    const decrease=()=>{
        setValue(value-1)
    }
    const zero=()=>{
        setValue(0)
    }

    return {
        zero,increase,decrease,value
    }

}

