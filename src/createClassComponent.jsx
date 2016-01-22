// This is an example of composing a React component in the more traditional
// way using the React.createClass() method.

'use strict';

import React from 'react';

const CreateClassComponent = React.createClass({
  displayName: 'MyComponent',

  propTypes: {
    message: React.PropTypes.string
  },

  defaultProps: {
    message: 'Default message'
  },

  getInitialState: function () {
    return {
      someState: 'Default state value.'
    };
  },

  componentDidMount: function () {
    console.log('Basic Component mounted.');
  },

  shouldComponentUpdate: function (nextProps, nextState) {
    return nextProps.message !== this.props.message ||
        nextState.someState !== this.state.someState;
  },

  onEvent: function (e) {
    e.preventDefault();

    const input = this.refs.myInput;

    if (input.value) {
      this.setState({ someState: input.value });
      input.value = '';
    }
  },

  customFunc: function () {
    return 'This is custom!'
  },

  render: function () {
    return (
      <div>
        <div>Props Message: {this.props.message}</div>
        <div>State Value: {this.state.someState}</div>
        <div>
          <input type="text" ref="myInput" placeholder="Type something" />
          <button onClick={this.onEvent}>Change State Value</button>
        </div>
      </div>
    );
  }
});

export default CreateClassComponent;
