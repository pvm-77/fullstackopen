import './App.css';
// import { useState } from 'react'
import { useCounter } from './hooks/counter'
import { useField } from './hooks/formfield'

function App() {
  // const [counter,setCounter]=useState(0)
  const counter = useCounter();
  // state handle using hooks for form
  const name = useField('text')
  // console.log({...name});
  const born = useField('date')
  const height = useField('number')

  // state for form handling 
  // const [name,setName]=useState('')
  // const [born,setBorn]=useState('')
  // const [height,setHeight]=useState('')
  return (
    <div>
      <div>
        <div>
          {/* {counter} */}
          {counter.value}
        </div>
        {/* <button onClick={()=>setCounter(counter-1)} >minus</button>
      <button  onClick={()=>setCounter(counter+1)}>plus</button>

      <button  onClick={()=>setCounter(0)}>zero</button> */}
        <button onClick={counter.decrease} >minus</button>
        <button onClick={counter.increase}>plus</button>

        <button onClick={counter.zero}>zero</button>
      </div>
      {/* <div>
        <form>
          name:
          <input type='text' value={name} onChange={(event) => setName(event.target.value)} />
          <br />
          birthdate:
          <input type='date' value={born} onChange={(event) => setBorn(event.target.value)} />
          <br />
          height:
          <input type='number' value={height} onChange={(event) => setHeight(event.target.value)} />
        </form>
        <div>
          {name} {born} {height}
        </div>
      </div> */}
      <div>
        <form>
          name: <input type={name.type} value={name.value} onChange={name.onChange} /><br />
          birthdate:<input type={born.type} value={born.value} onChange={born.onChange} /><br />
          height:<input  type={height.type} value={height.value} onChange={height.onChange}/>

        </form>
        <div>{name.value} {born.value}  {height.value}</div>
      </div>

      
    </div>
  );
}

export default App;
