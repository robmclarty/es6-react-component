'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

// NOTE: `CreateClasst.js` is now deprecated as of React v15.
//
// NOTE: `Stateless.js` is loaded by `Container.js`
// and has dependencies (e.g., event handler prop) which is provided by the
// container component. You can't include it here, directly, without defining
// the required props first.

import ComposableDepInjection from './ComposableDepInjection'
import ComposableClosure from './ComposableClosure'
import ComposableNested from './ComposableNested'
import ComposableThis from './ComposableThis'
import Container from './Container'
import Classical from './Classical'

// An example piece of content to be passed to components as a prop.
const msg = "This is my component. There are many like it, but this one is mine."

ReactDOM.render(
  <div>
    <ComposableDepInjection message={msg} />
    <ComposableClosure message={msg} />
    <ComposableNested message={msg} />
    <ComposableThis message={msg} />
    <Container message={msg} />
    <Classical message={msg} />
  </div>,
  document.getElementById('app-container')
)
