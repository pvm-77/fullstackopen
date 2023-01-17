import { useState, useEffect } from 'react'
import axios from 'axios'
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


export const useCountry = (name) => {
    console.log('countryname', typeof (name));
    const [country, setCountry] = useState(null)
    useEffect(() => {

        axios.get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
            .then(response => {
                setCountry(response.data)
            })



    }, [name])

    return country




}