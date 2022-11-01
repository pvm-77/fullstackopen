import React from 'react'
import { useState, forwardRef, useImperativeHandle } from 'react'
import propTypes from 'prop-types'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)
  // toggler for hide or show
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })
  const hideWhenVisible = { display: visible ? 'none' : null }
  const showWhenVisible = { display: visible ? null : 'none' }
  return (
    <div>
      <div style={hideWhenVisible}>
        <button className="button" onClick={toggleVisibility}>
          <div className="button__content">
            <div className="button__icon">
              {/* <img src={viewBlog} alt='view-blog' /> */}
            </div>
            <p className="button__text">{props.buttonLabel}</p>
          </div>
        </button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>

    </div>
  )

})
Togglable.propTypes = {
  buttonLabel: propTypes.string.isRequired
}
Togglable.displayName = 'Togglable'
export default Togglable