import React, { Component } from 'react';
import './scss/BigButton.scss';

interface Props {
  url: string;
  text: string;
}

class BigButton extends Component<Props, {}> {
  render(): JSX.Element {
    return (
      <a href={this.props.url} className="BigButton" draggable="false"
        onDragStart={(e): void => e.preventDefault()}>
        {this.props.text}
      </a>
    );
  }
}

export default BigButton;
