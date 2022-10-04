import axios from 'axios'
const apiKey = process.env.REACT_APP_API_KEY
console.log('apikey', apiKey)
const getAllCountries = () => {
    return axios.get('https://restcountries.com/v3.1/all')
}
const getAllWeather = (country) => {
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${apiKey}`)
}
const countryAPI = {
    getAllCountries,
    getAllWeather
}
export default countryAPI