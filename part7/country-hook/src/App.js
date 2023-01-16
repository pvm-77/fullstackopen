import axios from 'axios'
import { useState, useEffect } from 'react'
import Country from './components/Country'
import { useCountry, useField } from './hooks'
const useGender = (name) => {
  const [gender, setGender] = useState(null)
  useEffect(() => {
    axios.get(`https://api.genderize.io/?name=${name}`)
      .then(response => {
        setGender(response.data)
      })
  }, [name])

  return gender
}
const App = () => {
  const nameInput = useField('text')
  const genderInput=useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const [genderName, setGenderName] = useState('')
  const gender = useGender(genderName)
  console.log(gender)

  // const country=countryData[0]
  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }
  const fetchGender = (e) => {
    e.preventDefault()
    setGenderName(genderInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
      <hr />

      <div>
        <form onSubmit={fetchGender}>
          <input {...genderInput} />
          <button>detect gender</button>
        </form>
        <div> name:{gender.name} prob: {gender.probability}</div>
      </div>
    </div>
  )
}



export default App
