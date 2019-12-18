import React from 'react';
import PropTypes from 'prop-types';
import './scss/big-button.scss';

class BigButton extends React.Component {
  render() {
    return (
      <a href={this.props.url} className="big-button" draggable="false" onDragStart={(e) => e.preventDefault()}>
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
