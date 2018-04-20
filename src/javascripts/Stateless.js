'use strict'

import React from 'react'
import PropTypes from 'prop-types'

// Stateless functional components are, simply, a function that returns JSX.
// It can be a simple view piece that just renders its props, or, as seen here,
// it can be a bit more complex by taking in functions and passing values back
// up to a higher-order component (e.g., for use with interactive elements like
// forms and whatnot).
//
// NOTE: `higherOrderState` is actually a prop being passed into this component,
// but its value is handled outside, in a higher-order component.
const StatelessComponent = ({
  message,
  higherOrderState,
  customFunc,
  onChangeStateValue
}) => {
  StatelessComponent.displayName = 'StatelessComponent'
  StatelessComponent.propTypes = {
    message: PropTypes.string,
    higherOrderState: PropTypes.string,
    customFunc: PropTypes.func,
    onChangeStateValue: PropTypes.func
  }

  // Keep track of form input refs internally so values can be accessed from
  // other functions (like even handlers).
  let myInput

  // Handle form submission by passing the value of inputs to a higher-order
  // component which has a reference to some app state.
  const onSubmit = e => {
    // It's important to disable the default action or the form will try to
    // make an HTTP request.
    e.preventDefault()

    // Pass value of myInput to higher-order function to be handled.
    onChangeStateValue(myInput.value)

    // Reset input after it has been submitted.
    myInput.value = ''
  }

  // Stateless components only have one output: JSX.
  // NOTE: The form input `ref` is taking a function rather than a string so I
  // can store its reference in a local variable for use in my event handler.
  return (
    <div className="sub-component">
      <h2>Stateless</h2>
      <div><b>Props Message</b>: {message}</div>
      <div><b>Custom Function Output</b>: {customFunc()}</div>
      <div><b>State Value</b>: {higherOrderState}</div>
      <div>
        <input
            type="text"
            ref={ name => myInput = name }
            placeholder="Type something"
        />
        <button onClick={onSubmit}>Change Props Value</button>
      </div>
    </div>
  )
}

export default StatelessComponent
