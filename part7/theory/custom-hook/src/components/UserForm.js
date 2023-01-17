
// user form using useState hook
import React from 'react'
import { useState } from 'react'
import { useField } from '../hooks';

export const UserForm = () => {
    const [name, setName] = useState('');
    const [born, setBorn] = useState('');
    const [height, setHeight] = useState('');


    const style = {
        border: '1px solid red',
        padding: '10px',
        margin: '10px'

    }
    return (
        <div style={style}>
            <h1>user form</h1>
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
        </div>
    )
}
// user form using custom hook
export const UseFormWithCustomHook = () => {
    const name = useField('text');
    console.log(name);
    const born = useField('date');
    const height = useField('number');

    const style = {
        border: '1px solid green',
        padding: '10px',
        margin: '10px'

    };
    return (
        <div style={style}>
            <h1>user form</h1>
            <form>
                name:
                <input
                    type='text'
                    value={name.value}
                    onChange={name.onChange} />
                <br />
                birthdate:
                <input
                    type='date'
                    value={born.value}
                    onChange={born.onChange} />
                <br />
                height:
                <input
                    type='number'
                    value={height.value}
                    onChange={height.onChange} />
            </form>
            <div>
                {name.value} {born.value} {height.value}
            </div>
        </div>
    )
}