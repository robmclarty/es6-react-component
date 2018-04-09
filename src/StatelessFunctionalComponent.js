'use strict'

import React, { PropTypes } from 'react'

// Stateless functional components are, simply, a function that returns JSX.
// It can be a simple view piece that just renders its props, or, as seen here,
// it can be a bit more complex by taking in functions and passing values back
// up to a higher-order component (e.g., for use with interactive elements like
// forms and whatnot).
//
// NOTE: `someState` is actually a prop being passed into this component, but
// its value is handled outside, in a higher-order component.
const StatelessFunctionalComponent = ({
  message,
  someState,
  customFunc,
  onChangeStateValue
}) => {
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
    <div>
      <div>Props Message: <b>{message}</b></div>
      <div>Custom Function Output: <b>{customFunc()}</b></div>
      <div>State Value: <b>{someState}</b></div>
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

StatelessFunctionalComponent.propTypes = {
  message: PropTypes.string.isRequired,
  someState: PropTypes.string.isRequired,
  customFunc: PropTypes.func,
  onEvent: PropTypes.func.isRequired
}

export default StatelessFunctionalComponent
