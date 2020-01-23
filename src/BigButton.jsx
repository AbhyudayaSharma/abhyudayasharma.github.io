import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './scss/BigButton.scss';

class BigButton extends Component {
  render() {
    return (
      <a href={this.props.url} className="BigButton" draggable="false" onDragStart={(e) => e.preventDefault()}>
        {this.props.text}
      </a>
    );
  }
}

BigButton.propTypes = {
  url: PropTypes.string,
  text: PropTypes.string,
};

export default BigButton;
