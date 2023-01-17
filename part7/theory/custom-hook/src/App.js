
// code for counter app using custom hook name[useCounter] hook
import { LeftRightCount } from "./components/LeftRightCount";
import { UseFormWithCustomHook, UserForm } from "./components/UserForm";
import { useCounter } from "./hooks";

function App() {
  const counter = useCounter();
  return (
    <div>
      <LeftRightCount />
      <div>
        <div>
          {counter.value}
        </div>
        <button onClick={counter.decrease} >minus</button>
        <button onClick={counter.increase}>plus</button>
        <button onClick={counter.zero}>zero</button>
      </div>


      
      <UserForm />
      <UseFormWithCustomHook />
    </div>
  );
}

// code for counter app using useState hook
// import {useState} from 'react'
// function App  ()  {
//   const [counter, setCounter] = useState(0)

//   return (
//     <div>
//       <div>{counter}</div>
//       <button onClick={() => setCounter(counter + 1)}>
//         plus
//       </button>
//       <button onClick={() => setCounter(counter - 1)}>
//         minus
//       </button>      
//       <button onClick={() => setCounter(0)}>
//         zero
//       </button>
//     </div>
//   )
// }
export default App;
