import React from 'react';
import './css/big-button.sass';

class BigButton extends React.Component {
  render() {
    return (
      <a href={this.props.url} className="big-button" draggable="false" onDragStart={(e) => e.preventDefault()}>
        {this.props.text}
      </a>
    )
  }
}


export default BigButton;
