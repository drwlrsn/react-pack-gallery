import React from 'react';

// const PackItem = (props) => {
//   return (
//     <div data-aspect-ratio={props.aspectRatio}>{props.children}</div>
//   );
// };
//
// import React, { PropTypes } from 'react'

class PackItem extends React.Component {
  render () {
    return <div onClick={this.props.clickHandler} data-aspect-ratio={this.props.aspectRatio}>{this.props.children}</div>;
  }
}

// export default PackItem;

export default PackItem;
