
import { useState, useEffect } from 'react'
import countryAPI from './api/country'
const MyWeather = ({ country }) => {


  const [allWeatherCondition, setAllWeatherCondition] = useState([])
  useEffect(() => {
    countryAPI.getAllWeather(country).then(response => {
      setAllWeatherCondition([response.data])
    }).catch(error => {
      console.log('check api key');
    })
  }, [country])
  if (allWeatherCondition.length === 0) return  
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
  return (
    <>
      language:
      <ul>
        {
          languages.map(language => <li key={language}>{language}</li>)
        }
      </ul></>
  )
}


const MyCountry = ({ filteredCountries, setFilteredCountries }) => {
  if (filteredCountries.length === 0) return <p></p>
  if (filteredCountries.length > 10) {
    return (
      <p>Too many matches,specify another filter</p>
    )
  }

  if (filteredCountries.length >= 2) {
    return (
      <div>
        {filteredCountries.map(country =>
          <div>
            <p key={country.tId}>
              {country.name.common}
              <button
                onClick={() => setFilteredCountries([country])}>show </button>
            </p>
          </div>
        )
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
  // set countries state here [getting array of objects]
  const [countries, setCountries] = useState([]);
  console.log('line 82', countries);
  const [filteredCountries, setFilteredCountries] = useState([])

  // handler for search input 
  const handleSearch = (e) => {
    setSearchText(e.target.value);

    const result = countries.filter(country => {
      return country.name.common.toLowerCase().includes(searchText.toLowerCase())
    })

    setFilteredCountries(result)
  }

  // get all countries from api 
  useEffect(() => {
    countryAPI.getAllCountries().then(
      response => {
        setCountries(response.data)
      }
    )
  }, []);

  return (
    <div>
      find countries<input value={searchText} onChange={handleSearch} /><br />
      <MyCountry filteredCountries={filteredCountries} setFilteredCountries={setFilteredCountries} />
    </div>
  );

}




export default App;
