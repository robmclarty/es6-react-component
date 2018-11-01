// Example of creating component's parts all defined in one big object
// (technically, using "literal notation" or "object initializers"). This is
// closer to what the old `React.createClass()` looked like.
// ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer

import React from 'react'
import PropTypes from 'prop-types'

export default const MyComponent = (props, context) => {
  const component = { ...React.Component.prototype }

  MyComponent.displayName = 'MyComponent'
  MyComponent.propTypes = {
    message: PropTypes.string
  }
  MyComponent.defaultProps = {
    message: 'Default message'
  }

  const customFunc = () => 'This is custom!'

  return Object.assign(component, {
    props,
    context,
    state: {
      someState: 'Default state value.'
    },
    myInputRef: React.createRef(),
    componentDidMount: () => {
      return 'Basic Component mounted.'
    },
    shouldComponentUpdate: (nextProps, nextState) => {
      return nextProps.message !== component.props.message ||
          nextState.someState !== component.state.someState
    },
    onEvent: e => {
      e.preventDefault()

      const input = component.myInputRef.current

      if (input.value) {
        component.setState({ someState: input.value })
        input.value = ''
      }
    },
    render: () => (
      <div className="component">
        <h2>Dependency Injection</h2>
        <div><b>Props Message</b>: {component.props.message}</div>
        <div><b>Custom Function Output</b>: {customFunc()}</div>
        <div><b>State Value</b>: {component.state.someState}</div>
        <div>
          <input type="text" ref={component.myInputRef} placeholder="Type something" />
          <button onClick={component.onEvent}>Change State Value</button>
        </div>
      </div>
    )
  })
}
