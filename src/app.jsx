'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import MyComponent from './composableComponentNoThis.jsx';

ReactDOM.render(
  <MyComponent message="This is my component." />,
  document.getElementById('app-container')
);
