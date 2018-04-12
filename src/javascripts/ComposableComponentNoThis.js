// This is a variation of ComposableComponent which aims to get rid of `this`
// and instead refer to `component` (which is a React.Component) explicitly so
// it is absolutely clear just where things like .props, .state, and .setState()
// are coming from. This, so far, is my preferred method of React component
// composition.

'use strict'

import React from 'react'
import PropTypes from 'prop-types'

// Return a custom component, with properties defined above injected into it
// whilst also defining statis properties on the function itself.
const ComposableComponent = (props, context) => {
  // Create a new object composed of the React Component prototype, to be used
  // as the target of `props`, `state`, and `setState`.
  const component = { ...React.Component.prototype }

  // Example static properties.
  ComposableComponent.displayName = 'MyComponent'

  ComposableComponent.propTypes = {
    message: PropTypes.string
  }

  ComposableComponent.defaultProps = {
    message: 'Default message'
  }

  const initialState = {
    someState: 'Default state value.'
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

    const input = component.refs.myInput

    if (input.value) {
      component.setState({ someState: input.value })
      input.value = ''
    }
  }

  // Example custom function.
  const customFunc = () => 'This is custom!'

  // Main redner method calls other methods directly (without "this").
  const render = () => (
    <div>
      <h2>Composable Component (without <code>this</code>)</h2>
      <div><b>Props Message</b>: {component.props.message}</div>
      <div><b>Custom Function Output</b>: {customFunc()}</div>
      <div><b>State Value</b>: {component.state.someState}</div>
      <div>
        <input type="text" ref="myInput" placeholder="Type something" />
        <button onClick={onEvent}>Change State Value</button>
      </div>
    </div>
  )

  // Use `Object.assign` to mutate `component` (ES6 spread syntax cannot do
  // this since it will create a new object with a new context).
  return Object.assign(component, {
    props,
    context,
    state: initialState,
    componentDidMount,
    shouldComponentUpdate,
    render
  })
}

// Export ComposableComponent function as a React component.
export default ComposableComponent
