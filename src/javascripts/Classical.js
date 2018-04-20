// This is an example of a classical React component (i.e., one that uses the
// `class` keyword for encapsulation). I personally don't like this as much as
// plain, simple, function + object composition.
//
// Things I don't like about `class`:
// - it is not a normal class (like in Java), it's a prototype
// - it adds a bunch of extra jargon (like `super`, `constructor`, `extends`, etc.)
// - it requires a lot of garbage code to bind `this` correctly
// - it comes with some wierd function definition syntax (like, is it defining
// a function, or executing one? idk)
//
// It all just seems really unnecessary and introduces added complexity. I
// prefer expressing inention explicitly rather than through magical language
// keywords, and I like
//
// Programming is hard enough already. Why make it harder (read: more complex) if
// you don't need to?
//
// IMHO ignore everything to do with `class` and learn how to use JS (hint: it's not Java ;)

'use strict'

import React from 'react'
import PropTypes from 'prop-types'

// Create a React component by extending the React.Component class.
class ClassicalComponent extends React.Component {
  constructor(props) {
    super(props) // ...because, constructors! :P

    // Set initial state.
    this.state = {
      someState: 'Default state value.'
    }

    // Bind the component's context to the following methods. Redundant much?
    this.onEvent = this.onEvent.bind(this)
    this.customFunc = this.customFunc.bind(this)
  }

  componentDidMount() {
    console.log('Basic Component mounted.')
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.message !== this.props.message ||
        nextState.someState !== this.state.someState
  }

  // Example event handler.
  onEvent(e) {
    e.preventDefault()

    const input = this.refs.myInput

    if (input.value) {
      this.setState({ someState: input.value })
      input.value = ''
    }
  }

  // Example custom function.
  customFunc() {
    return 'This is custom!'
  }

  // Main render method. So many thises.
  render() {
    return (
      <div className="component">
        <h2>Classical</h2>
        <div><b>Props Message</b>: {this.props.message}</div>
        <div><b>Custom Function Output</b>: {this.customFunc()}</div>
        <div><b>State Value</b>: {this.state.someState}</div>
        <div>
          <input type="text" ref="myInput" placeholder="Type something" />
          <button onClick={this.onEvent}>Change State Value</button>
        </div>
      </div>
    )
  }
}

ClassicalComponent.displayName = 'MyComponent'

ClassicalComponent.propTypes = {
  message: PropTypes.string
}

ClassicalComponent.defaultProps = {
  message: 'Default message'
}

export default ClassicalComponent
