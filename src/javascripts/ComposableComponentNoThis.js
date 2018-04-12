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
function componentDidMount() {
  console.log('Basic Component mounted.')
}

function shouldComponentUpdate(nextProps, nextState) {
  return nextProps.message !== component.props.message ||
      nextState.someState !== component.state.someState
}

// Example event handler.
function onEvent(e) {
  e.preventDefault()

  const input = component.refs.myInput

  if (input.value) {
    component.setState({ someState: input.value })
    input.value = ''
  }
}

// Example custom function.
function customFunc() {
  return 'This is custom!'
}

// Main redner method calls other methods directly (without "this").
function render() {
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

// Return a custom component, with properties defined above injected into it
// whilst also defining statis properties on the function itself.
function ComposableComponentNoThis(props, context) {
  ComposableComponentNoThis.propTypes = propTypes
  ComposableComponentNoThis.defaultProps = defaultProps

  return Object.assign(component, {
    displayName,
    props,
    context,
    state: initialState,
    componentDidMount,
    shouldComponentUpdate,
    render
  })
}

// Export ComposableComponentNoThis function as a React component.
export default ComposableComponentNoThis
