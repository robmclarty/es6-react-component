// This is an example of a React component composed of purer functions which
// take in the `component` as an injected dependency/parameter, thus making each
// function a standalone bit of functionality that can more easily be tested.

import React from 'react'
import PropTypes from 'prop-types'

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
const componentDidMount = component => () => {
  return 'Basic Component mounted.'
}

const shouldComponentUpdate = component => (nextProps, nextState) => {
  return nextProps.message !== component.props.message ||
      nextState.someState !== component.state.someState
}

// Example event handler.
const onEvent = component => e => {
  e.preventDefault()

  const input = component.myInputRef.current

  if (input.value) {
    component.setState({ someState: input.value })
    input.value = ''
  }
}

// Example custom function.
const customFunc = () => 'This is custom!'

// Main redner method calls other methods directly (without "this").
const render = component => () => (
  <div className="component">
    <h2>Dependency Injection</h2>
    <div><b>Props Message</b>: {component.props.message}</div>
    <div><b>Custom Function Output</b>: {customFunc()}</div>
    <div><b>State Value</b>: {component.state.someState}</div>
    <div>
      <input type="text" ref={component.myInputRef} placeholder="Type something" />
      <button onClick={onEvent(component)}>Change State Value</button>
    </div>
  </div>
)

// Return a custom component, with properties defined above injected into it
// whilst also defining statis properties on the function itself.
const MyComponent = (props, context) => {
  // Create a new object composed of the React Component prototype, to be used
  // as the target of `props`, `state`, and `setState`.
  const component = { ...React.Component.prototype }

  MyComponent.displayName = displayName
  MyComponent.propTypes = propTypes
  MyComponent.defaultProps = defaultProps

  // Use `Object.assign` to mutate `component` (ES6 spread syntax cannot do
  // this since it will create a new object with a new context).
  return Object.assign(component, {
    props,
    context,
    state: initialState,
    ...refs, // React is using an attribute called `refs` already, so custom refs are simply mixed in at the root-level here
    componentDidMount: componentDidMount(component),
    shouldComponentUpdate: shouldComponentUpdate(component),
    render: render(component)
  })
}

// Export PureComponent function as a React component.
export default MyComponent
