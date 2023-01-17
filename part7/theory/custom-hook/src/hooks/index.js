import { useState } from 'react'

export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }
    return {
        type,
        value,
        onChange
    }
}

export const useCounter = () => {
    const [value, setValue] = useState(0);
    const increase = () => {
        setValue(value + 1)
    }
    const decrease = () => {
        setValue(value - 1)
    }
    const zero = () => {
        setValue(0)
    }

    return {
        zero, increase, decrease, value
    }

}

export const useMyCounter=()=>{
    const [value,setValue]=useState(0);

    const increase =()=>{
        setValue(value+1);

    }
    const decrease =()=>{
        setValue(value-1);

    }
    const zero  =()=>{
        setValue(0);

    }

    return {
        value,increase,decrease,zero
    }
}

