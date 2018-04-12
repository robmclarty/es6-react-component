'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import MyComponent from './ComposableComponentNoThis.js'

const msg = "This is my component. There are many components like it, but this one is mine."

ReactDOM.render(
  <MyComponent message={msg} />,
  document.getElementById('app-container')
)
