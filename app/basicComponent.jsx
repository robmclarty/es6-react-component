'use strict';

import React from 'react';
import assign from 'object-assign';

// Module pattern for creating a component:
let extend = function (target, source) {
  Object.keys(source).forEach(function (key) {
    if (typeof target[key] !== 'undefined') {
      return;
    }
    target[key] = source[key];
  });
};

let BasicComponent = function (props, context) {
  const propTypes = {
    message: React.PropTypes.string
  };
  const defaultProps = {
    message: ''
  };

  let render = function () {
    return (
      <div>{this.props.message}</div>
    );
  };

  return assign({}, React.Component.prototype, {
    props,
    propTypes,
    defaultProps,
    context,
    render
  });
};

// Classic method of creating component:
//
// let BasicComponent = React.createClass({
//   propTypes: {
//     message: React.PropTypes.string
//   },

//   defaultProps: {
//     message: ''
//   },

//   render: function () {
//     return (
//       <div>{this.props.message}</div>
//     );
//   }
// });

export default BasicComponent;
