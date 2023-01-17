import React from 'react'
const Country = ({ country }) => {
    if (!country) {
        return <div>not found...</div>
    }
    return (
        <div>
            <h3>{country[0].name.common}</h3>
            <div>population {country[0].population}</div>
            <div>capital {country[0].capital}</div>
            <img src={country[0].flags.png} height='100' alt={`flag of ${country[0].name.common}`} />
        </div>
    )
}


export default Country