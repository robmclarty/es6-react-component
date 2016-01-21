// This is an example of a classical React component (i.e., one that uses the
// `class` keyword for encapsulation). I personally don't like this as much as
// it is not a normal class (like in Java); it's a prototype, and it adds a
// bunch of other jargon (like `super`, `constructor`, `static`, etc.) which is
// really just unnecessary and introduces complexity.

'use strict';

import React from 'react';

class ClassicalComponent extends React.Component {
  constructor(props) {
    super(props);

    // Set initial state.
    this.state = {
      someState: 'Default state value.'
    };

    // Bind the component's `this` to the following methods.
    this.onEvent = () => this.onEvent();
    this.customFunc = () => this.customFunc();
  }

  componentDidMount() {
    console.log('Basic Component mounted.');
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.message !== this.props.message ||
        nextState.someState !== this.state.someState;
  }

  onEvent(e) {
    e.preventDefault();

    const input = this.refs.myInput;

    if (input.value) {
      this.setState({ someState: input.value });
      input.value = '';
    }
  }

  customFunc() {
    return 'This is custom!'
  }

  render() {
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
}

// Define static properties.
ClassicalComponent.propTypes = {
  message: React.PropTypes.string
};

ClassicalComponent.defaultProps = {
  message: 'Default message'
};

export default ClassicalComponent;
