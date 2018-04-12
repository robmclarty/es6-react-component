// This is a higher-order container component, using the style of the
// ComposableComponentNoThis example.

'use strict'

import React from 'react'
import PropTypes from 'prop-types'
import StatelessFunctionalComponent from './StatelessComponent'

const ContainerComponent = (props, context) => {
  const component = { ...React.Component.prototype }

  ContainerComponent.displayName = 'Container'

  ContainerComponent.propTypes = {
    message: React.PropTypes.string
  }

  ContainerComponent.defaultProps = {
    message: 'Default message'
  }

  const initialState = {
    someState: 'Default state value.'
  }

  const componentDidMount = () => {
    console.log('Container Component mounted.')
  }

  const shouldComponentUpdate = (nextProps, nextState) => {
    return nextProps.message !== component.props.message ||
        nextState.someState !== component.state.someState
  }

  // Takes a value as input and uses it to change `someState`. This function is
  // passed into the lower-level stateless functional component so it can be
  // executed with access to variables from that context.
  const onChangeStateValue = inputValue => {
    component.setState({ someState: inputValue })
  }

  const customFunc = () => {
    return 'This is custom!'
  }

  const render = () => (
    <div>
      <h2>Higher-Order/Container Component</h2>
      <p>
        A higher-order container component rendering a a lower-level
        stateless component.
      </p>

      <StatelessComponent
          message={message}
          someState={someState}
          customFunc={customFunc}
          onChangeStateValue={onChangeStateValue}
      />
    </div>
  )

  return Object.assign(component, {
    props,
    context,
    state: initialState,
    componentDidMount,
    shouldComponentUpdate,
    render
  })
}

export default ContainerComponent
