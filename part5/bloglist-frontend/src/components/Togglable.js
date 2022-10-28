import React from 'react'
import { useState } from 'react'
const Togglable = (props) => {
    const [visible, setVisible] = useState(false)
    // toggler for hide or show 
    const toggleVisibility = () => {
        setVisible(!visible)
    }

    const hideWhenVisible = { display: visible ? 'none' : null }
    const showWhenVisible = { display: visible ? null : 'none' }
    return (
        <div>
            <div style={hideWhenVisible}>
                {/* <button onClick={toggleVisibility}>{props.buttonLabel}</button> */}
                <button class="button" onClick={toggleVisibility}>
                    <div class="button__content">
                        <div class="button__icon">
                            {/* <img src={viewBlog} alt='view-blog' /> */}
                        </div>
                        <p class="button__text">{props.buttonLabel}</p>
                    </div>
                </button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button onClick={toggleVisibility}>cancel</button>
            </div>

        </div>
    )
}

export default Togglable