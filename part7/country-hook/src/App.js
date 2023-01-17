// import axios from 'axios'
import { useState } from 'react'
import Country from './components/Country'
import { useCountry, useField } from './hooks'
const App = () => {
  const enterCountryName = useField('text')

  const [name, setName] = useState('')
  const country = useCountry(name)

  const handleSubmit = (e) => {
    e.preventDefault()
    setName(enterCountryName.value)
  }
  

  return (
    <div>

      <form onSubmit={handleSubmit}>
        <input {...enterCountryName} />
        <button>find</button>
      </form>

     {name!=="" ?<Country country={country} />:null}
      <hr />
    </div>
  )
}



export default App
