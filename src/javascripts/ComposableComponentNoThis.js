// This is a variation of ComposableComponent which aims to get rid of `this`
// and instead refer to `component` (which is a React.Component) explicitly so
// it is absolutely clear just where things like .props, .state, and .setState()
// are coming from. This, so far, is my preferred method of React component
// composition.

'use strict'

import React from 'react'
import PropTypes from 'prop-types'

// Create a new object composed of the React Component prototype to be used
// as the target of .props and .state and .setState
const component = { ...React.Component.prototype }

const displayName = 'MyComponent'

// Example static properties.
const propTypes = {
  message: PropTypes.string
}

const defaultProps = {
  message: 'Default message'
}

const initialState = {
  someState: 'Default state value.'
}

// Example lifecycle methods.
const componentDidMount = () => {
  console.log('Basic Component mounted.')
}

const shouldComponentUpdate = (nextProps, nextState) => {
  return nextProps.message !== component.props.message ||
      nextState.someState !== component.state.someState
}

// Example event handler.
const onEvent = e => {
  e.preventDefault()

  const input = component.refs.myInput

  if (input.value) {
    component.setState({ someState: input.value })
    input.value = ''
  }
}

// Example custom function.
const customFunc = () => {
  return 'This is custom!'
}

// Main redner method calls other methods directly (without "this").
const render = () => {
  return (
    <div>
      <div>Props Message: <b>{component.props.message}</b></div>
      <div>Custom Function Output: <b>{customFunc()}</b></div>
      <div>State Value: <b>{component.state.someState}</b></div>
      <div>
        <input type="text" ref="myInput" placeholder="Type something" />
        <button onClick={onEvent}>Change State Value</button>
      </div>
    </div>
  )
}

// Implement React component attributes and methods.
const ComposableComponent = (props, context) => ({
  ...component,
  displayName,
  props,
  context,
  state: initialState,
  componentDidMount,
  shouldComponentUpdate,
  render
})

// Assign static properties.
ComposableComponent.propTypes = propTypes
ComposableComponent.defaultProps = defaultProps

// Export the result of BasicComponent function.
export default ComposableComponent
