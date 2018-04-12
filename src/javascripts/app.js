'use strict'

import React from 'react'
import ReactDOM from 'react-dom'

// NOTE: Change the filename of the component module imported to `MyComponent`
// to test different component styles.
//
// Valid values include:
// - 'ClassicalComponent.js'
// - 'ComposableComponent.js'
// - 'ComposableComponentNoThis.js'
// - 'ContainerComponent.js'
//
// NOTE: `CreateClassComponent.js` is now deprecated as of React v15.
//
// NOTE: `StatelessFunctionalComponent.js` is loaded by `ContainerComponent.js`
// and has dependencies (e.g., event handler prop) which is provided by the
// container component. You can't include it here, directly, without defining
// the required props first.
import MyComponent from './ComposableComponentNoThis.js'

const msg = "This is my component. There are many components like it, but this one is mine."

ReactDOM.render(
  <MyComponent message={msg} />,
  document.getElementById('app-container')
)
