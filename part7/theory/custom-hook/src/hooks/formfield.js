import { useState } from "react";

// field type means text date or button type of input
export const useField=(type)=>{
    const [value,setValue]=useState('')
    const onChange=(e)=>{
        setValue(e.target.value);
    }
    return {type,onChange,value}

}