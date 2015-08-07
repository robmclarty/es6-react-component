'use strict';

import React from 'react';
import assign from 'object-assign';

let state = {
  someState: 'Default state value.'
};

function componentDidMount() {
  console.log('Basic Component mounted.');
}

function onEvent(e) {
  e.preventDefault();

  let input = this.refs.myInput;

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
  return assign({}, React.Component.prototype, {
    props,
    context,
    state,
    componentDidMount,
    onEvent,
    render
  });
}

export default BasicComponent;
