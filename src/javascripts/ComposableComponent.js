// This ComposableComponent uses Object.assign to compose a React component
// from the React.Component.prototype and a mix of custom functions, some of
// which will override the defaults of the prototype (e.g., render()).

'use strict'

import React, { PropTypes } from 'react'
//import PropTypes from 'prop-types'

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

function componentDidMount() {
  console.log('Basic Component mounted.')
}

function shouldComponentUpdate(nextProps, nextState) {
  return nextProps.message !== this.props.message ||
      nextState.someState !== this.state.someState
}

function onEvent(e) {
  e.preventDefault()

  const input = this.refs.myInput

  if (input.value) {
    this.setState({ someState: input.value })
    input.value = ''
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
  )
}

function ComposableComponent(props, context) {
  return {
    ...React.Component.prototype,
    displayName,
    props,
    context,
    state: initialState,
    componentDidMount,
    onEvent,
    render
  }
}

ComposableComponent.propTypes = propTypes
ComposableComponent.defaultProps = defaultProps

export default ComposableComponent
