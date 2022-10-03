
import { useState, useEffect } from 'react'
import axios from 'axios'
const MyWeather = ({ country }) => {
  const [allWeatherCondition, setAllWeatherCondition] = useState([])
  console.log(allWeatherCondition[0].weather[0].icon)
  
  

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=8e4b2d2c7f7766b1c59a6a9558162594`)
      .then(response => setAllWeatherCondition([response.data]))
  }, [])
  return (
    <>
      
      <p>weather in {country}</p>
      <p>temperature  </p>
      <img src={`http://openweathermap.org/img/wn/${allWeatherCondition[0].weather[0].icon}@2x.png`} alt='img' />
      <p>wind {allWeatherCondition[0].wind.speed} m/s</p>
    </>
  )

}
const Languages = ({ language }) => {
  const languages = Object.values(language)
  console.log(languages)
  return (
    <>
      language:
      <ul>
        {
          languages.map(language => <li>{language}</li>)
        }
      </ul></>
  )
}

const MyCountry = ({ filteredCountries, setFilteredCountries }) => {

  if (filteredCountries.length === 0) return <></>
  if (filteredCountries.length > 10) {
    return (
      <p>Too many matches,specify another filter</p>
    )

  }
  if (filteredCountries.length >= 2) {
    return (
      <div>
        {filteredCountries.map(country => <>
          <p
            key={country.latlng[0]}>{country.name.common}
            <button onClick={() => setFilteredCountries([country])}>show </button>
          </p>
        </>)

        }


      </div>

    )
  }
  else {
    return (
      <div>
        <h1>{filteredCountries[0].name.common}</h1>
        <p>area {filteredCountries[0].area}</p>
        <p>capital {filteredCountries[0].capital}</p>
        <Languages language={filteredCountries[0].languages} />
        <img src={filteredCountries[0].flags.png} alt='img' />
        <MyWeather country={filteredCountries[0].name.common} />

      </div>
    )
  }
}
function App() {
  const [searchText, setSearchText] = useState('')
  // get countries from url
  const [countries, setCountries] = useState([]);
  console.log('btn', countries);
  const [filteredCountries, setFilteredCountries] = useState([])
  // hadnler for search input 
  const handleSearch = (e) => {
    console.log(e.target.value)
    setSearchText(e.target.value);
    const result = countries.filter(country => {
      return country.name.common.toLowerCase().includes(searchText.toLowerCase())
    })
    console.log('result', result);
    setFilteredCountries(result)
  }
  // get all countries from api 
  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then(response => {
      // console.log(response.data)
      setCountries(response.data)
    })

  }, []);

  return (
    <div>
      find countries<input value={searchText} onChange={handleSearch} /><br />
      <MyCountry filteredCountries={filteredCountries} setFilteredCountries={setFilteredCountries} />

    </div>
  );

}




export default App;
