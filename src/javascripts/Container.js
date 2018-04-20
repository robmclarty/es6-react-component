// This is a higher-order container component, using the style of the
// ComposableComponentNoThis example.

'use strict'

import React from 'react'
import PropTypes from 'prop-types'
import StatelessComponent from './Stateless'

const ContainerComponent = (props, context) => {
  ContainerComponent.displayName = 'Container'

  ContainerComponent.propTypes = {
    message: PropTypes.string
  }

  ContainerComponent.defaultProps = {
    message: 'Default message'
  }

  const initialState = {
    someState: 'Default state value.'
  }

  const component = { ...React.Component.prototype }

  const componentDidMount = () => console.log('Container Component mounted.')

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

  const customFunc = () => 'This is custom!'

  const render = () => (
    <div className="component">
      <h2>Higher-Order/Container</h2>
      <p>
        A higher-order container component rendering a a lower-level
        stateless component.
      </p>

      <StatelessComponent
          message={component.props.message}
          higherOrderState={component.state.someState}
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
