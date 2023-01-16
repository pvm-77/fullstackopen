import React from 'react'

import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Anecdote = ({ anecdotes }) => {
    const id = useParams().id;
    const anecdote = anecdotes.find(a => a.id === Number(id))
    return (
        <div>

            {/* card */}
            <div className="card mx-auto w-50 my-2">
                <div className="card-header">
                    <div className='row'>
                        <div className='col-md-6'> <p className='text-left'>Anecdote</p></div>
                        <div className='col-md-6'><p className='text-right'>vote {anecdote.votes}</p></div>
                    </div>

                </div>
                <div className="card-body">
                    <blockquote className="blockquote mb-0">
                        <p>{anecdote.content}</p>
                        <footer className="blockquote-footer">By <cite title="Source Title">{anecdote.author}</cite></footer>
                    </blockquote>
                </div>
                <div className="card-footer text-muted">
                    for more info see <Link to={anecdote.info}>{anecdote.info}</Link>
                </div>
            </div>






        </div>
    )

}
export default Anecdote