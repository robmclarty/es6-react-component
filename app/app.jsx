'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import BasicComponent from './basicComponent2.jsx';

ReactDOM.render(
  <BasicComponent message="This is my component." />,
  document.getElementById('app-container')
);
