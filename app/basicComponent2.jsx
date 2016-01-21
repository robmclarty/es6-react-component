'use strict';

import React from 'react';

// Create a new object composed of the React Component prototype to be used
// as the target of .props and .state and .setState
const component = Object.assign({}, React.Component.prototype);

// Example static properties.
const propTypes = {
  message: React.PropTypes.string
};

const defaultProps = {
  message: 'Default message'
};

const initialState = {
  someState: 'Default state value.'
};

// Example lifecycle methods.
function componentDidMount() {
  console.log('Basic Component mounted.');
}

function shouldComponentUpdate(nextProps, nextState) {
  return nextProps.message !== component.props.message ||
      nextState.someState !== component.state.someState;
}

// Example event handler.
function onEvent(e) {
  e.preventDefault();

  const input = component.refs.myInput;

  if (input.value) {
    component.setState({ someState: input.value });
    input.value = '';
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
        <button onClick={e => onEvent(e)}>Change State Value</button>
      </div>
    </div>
  );
}

// Implement React component attributes and methods.
function BasicComponent(props, context) {
  return Object.assign(component, {
    props,
    context,
    state: initialState,
    componentDidMount,
    shouldComponentUpdate,
    render
  });
}

// Assign static properties.
BasicComponent.propTypes = propTypes;
BasicComponent.defaultProps = defaultProps;

// Export the result of BasicComponent function.
export default BasicComponent;
