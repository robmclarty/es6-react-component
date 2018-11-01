import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

const HookedComponent = (props = { message: 'Default message' }) => {
  HookedComponent.displayName = 'HookedComponent'
  HookedComponent.propTypes = {
    message: PropTypes.string
  }

  const [someState, setSomeState] = useState('Default state value.')
  const myInput = useRef(null)

  useEffect(() => {
    console.log('Hooked component mounted.')
  })

  const onEvent = e => {
    e.preventDefault()

    const input = myInput.current.value

    if (input) {
      setSomeState(input)
      input = ''
    }
  }

  const customFunc = () => {
    return 'This is custom!'
  }

  return (
    <div className="component">
      <h2>Hooked</h2>
      <div><b>Props Message</b>: {props.message}</div>
      <div><b>Custom Function Output</b>: {customFunc()}</div>
      <div><b>State Value</b>: {someState}</div>
      <div>
        <input type="text" ref={myInput} placeholder="Type something" />
        <button onClick={onEvent}>Change State Value</button>
      </div>
    </div>
  )
}

export default HookedComponent
