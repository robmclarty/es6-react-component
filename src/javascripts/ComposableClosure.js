// The way you compose your function is flexible. For example, you don't have
// to nest everything into the main function and could instead put everything
// on the same level within the module's scope.

import React from 'react'
import PropTypes from 'prop-types'

// Create a new object composed of the React Component prototype, to be used
// as the target of `props`, `state`, and `setState`.
const component = { ...React.Component.prototype }

// Example static properties.
const displayName = 'MyComponent'

const propTypes = {
  message: PropTypes.string
}

const defaultProps = {
  message: 'Default message'
}

const initialState = {
  someState: 'Default state value.'
}

const refs = {
  myInputRef: React.createRef()
}

// Example lifecycle methods.
const componentDidMount = () => console.log('Basic Component mounted.')

const shouldComponentUpdate = (nextProps, nextState) => {
  return nextProps.message !== component.props.message ||
      nextState.someState !== component.state.someState
}

// Example event handler.
const onEvent = e => {
  e.preventDefault()

  const input = component.refs.myInput.current

  if (input.value) {
    component.setState({ someState: input.value })
    input.value = ''
  }
}

// Example custom function.
const customFunc = () => 'This is custom!'

// Main redner method calls other methods directly (without "this").
const render = () => (
  <div className="component">
    <h2>Modular Closure</h2>
    <div><b>Props Message</b>: {component.props.message}</div>
    <div><b>Custom Function Output</b>: {customFunc()}</div>
    <div><b>State Value</b>: {component.state.someState}</div>
    <div>
      <input type="text" ref={component.myInputRef} placeholder="Type something" />
      <button onClick={onEvent}>Change State Value</button>
    </div>
  </div>
)

// Return a custom component, with properties defined above injected into it
// whilst also defining statis properties on the function itself.
const ComposableComponent = (props, context) => {
  ComposableComponent.displayName = displayName
  ComposableComponent.propTypes = propTypes
  ComposableComponent.defaultProps = defaultProps

  // Use `Object.assign` to mutate `component` (ES6 spread syntax cannot do
  // this since it will create a new object with a new context).
  return Object.assign(component, {
    props,
    context,
    state: initialState,
    ...refs,
    componentDidMount,
    shouldComponentUpdate,
    render
  })
}

// Export ComposableComponent function as a React component.
export default ComposableComponent
