import React from 'react'
import { Link } from 'react-router-dom'
const Menu = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">

                    <Link className="navbar-brand" to='/'>Software anecdotes</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="nav justify-content-center">
                            <li className="nav-item">
                                
                                <Link to='/anecdotes' className='nav-link'>anecdotes</Link>

                            </li>
                            <li className="nav-item">
                                <Link to='/createNew' className='nav-link'>create new</Link>

                            </li>
                            <li className="nav-item">
                                <Link to='/about' className='nav-link'>about</Link>

                            </li>

                        </ul>

                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Menu