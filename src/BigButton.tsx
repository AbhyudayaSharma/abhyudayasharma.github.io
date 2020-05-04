import React, { Component, SyntheticEvent } from 'react';
import './scss/BigButton.scss';
import { Link } from 'react-router-dom';

interface Props {
  url: string;
  text: string;
}

class BigButton extends Component<Props, {}> {
  render(): JSX.Element {
    const linkProps = {
      draggable: false,
      onDragStart: (e: SyntheticEvent): void => e.preventDefault(),
      className: 'BigButton-btn',
    };

    const link: JSX.Element = this.props.url.startsWith('/')
      ? (<Link {...linkProps} to = {this.props.url}>{this.props.text}</Link>)
      : (<a {...linkProps} href = {this.props.url}>{this.props.text}</a>);

    return (
      <div className='BigButton'>
        {link}
      </div>
    );
  }
}

export default BigButton;
