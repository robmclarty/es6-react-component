// This ComposableComponent uses Object.assign to compose a React component
// from the React.Component.prototype and a mix of custom functions, some of
// which will override the defaults of the prototype (e.g., render()).

import React from 'react'
import PropTypes from 'prop-types'

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

function componentDidMount() {
  console.log('Basic Component mounted.')
}

function shouldComponentUpdate(nextProps, nextState) {
  return nextProps.message !== this.props.message ||
      nextState.someState !== this.state.someState
}

function onEvent(e) {
  e.preventDefault()

  const input = this.refs.myInput.current

  if (input.value) {
    this.setState({ someState: input.value })
    input.value = ''
  }
}

// Example custom function.
const customFunc = () => 'This is custom!'

function render() {
  return (
    <div className="component">
      <h2><code>this</code> is Composable</h2>
      <div><b>Props Message</b>: {this.props.message}</div>
      <div><b>Custom Function Output</b>: {customFunc()}</div>
      <div><b>State Value</b>: {this.state.someState}</div>
      <div>
        <input type="text" ref={this.myInputRef} placeholder="Type something" />
        <button onClick={e => this.onEvent(e)}>Change State Value</button>
      </div>
    </div>
  )
}

function ComposableComponent(props, context) {
  return {
    ...React.Component.prototype,
    displayName,
    props,
    context,
    ...refs,
    state: initialState,
    componentDidMount,
    onEvent,
    render
  }
}

ComposableComponent.propTypes = propTypes
ComposableComponent.defaultProps = defaultProps

export default ComposableComponent
