'use strict';

import React from 'react';

const propTypes = {
  message: React.PropTypes.string
};

const defaultProps = {
  message: 'Default message'
};

const initialState = {
  someState: 'Default state value.'
};

function componentDidMount() {
  console.log('Basic Component mounted.');
}

function shouldComponentUpdate(nextProps, nextState) {
  return nextProps.message !== this.props.message ||
      nextState.someState !== this.state.someState;
}

function onEvent(e) {
  e.preventDefault();

  const input = this.refs.myInput;

  if (input.value) {
    this.setState({ someState: input.value });
    input.value = '';
  }
}

function render() {
  return (
    <div>
      <div>Props Message: {this.props.message}</div>
      <div>State Value: {this.state.someState}</div>
      <div>
        <input type="text" ref="myInput" placeholder="Type something" />
        <button onClick={e => this.onEvent(e)}>Change State Value</button>
      </div>
    </div>
  );
}

function BasicComponent(props, context) {
  return Object.assign({}, React.Component.prototype, {
    props,
    context,
    state: initialState,
    componentDidMount,
    onEvent,
    render
  });
}

BasicComponent.propTypes = propTypes;
BasicComponent.defaultProps = defaultProps;

export default BasicComponent;
