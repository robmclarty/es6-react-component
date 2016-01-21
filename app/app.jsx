'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import MyComponent from './thisFreeComposableComponent.jsx';

ReactDOM.render(
  <MyComponent message="This is my component." />,
  document.getElementById('app-container')
);
