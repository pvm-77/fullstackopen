import React from 'react'
import { Link } from 'react-router-dom'

const AnecdoteList = ({ anecdotes }) => (
    <div>
        <div className="card text-center my-2 w-50 mx-auto">
            <div className="card-header">
                <h2>Anecdotes</h2>
            </div>
            <div className="card-body">
                <table className="table  table-striped">

                    <tbody>
                        {anecdotes.map(anecdote =>
                            <tr key={anecdote.id} >
                                <td><Link className='nav-link' to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link></td>
                            </tr>)}

                    </tbody>
                </table>

            </div>

        </div>




    </div>
)

export default AnecdoteList