// WARNING: `React.createClass` has been deprecated as of version 15. This
// example is being left here for reference, but will no longer work with the
// updated version of React being employed now.

// This is an example of composing a React component in the more traditional
// way using the React.createClass() method.

import React from 'react'

const CreateClassicalComponent = React.createClass({
  displayName: 'MyComponent',

  propTypes: {
    message: React.PropTypes.string
  },

  defaultProps: {
    message: 'Default message'
  },

  getInitialState: () => ({
    someState: 'Default state value.'
  }),

  componentDidMount: () => {
    console.log('Basic Component mounted.')
  },

  shouldComponentUpdate: (nextProps, nextState) => {
    return nextProps.message !== this.props.message ||
        nextState.someState !== this.state.someState
  },

  onEvent: e => {
    e.preventDefault()

    const input = this.refs.myInput

    if (input.value) {
      this.setState({ someState: input.value })
      input.value = ''
    }
  },

  customFunc: () => {
    return 'This is custom!'
  },

  render: () => (
    <div>
      <h2>React.createClass Component</h2>
      <div>Props Message: {this.props.message}</div>
      <div>State Value: {this.state.someState}</div>
      <div>
        <input type="text" ref="myInput" placeholder="Type something" />
        <button onClick={this.onEvent}>Change State Value</button>
      </div>
    </div>
  )
})

export default CreateClassComponent
