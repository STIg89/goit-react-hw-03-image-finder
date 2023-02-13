import React, { Component } from 'react';
import { Backdrop, ModalWrap } from './Modal.styled';
import PropTypes from 'prop-types';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.props.onClose);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.props.onClose);
  }

  onCloseModal = e => {
    const clickedTo = e.target.id;
    const pressedKey = e.code;

    if (clickedTo === 'backdrop' || pressedKey === 'Escape') {
      this.props.onClose();
    }
  };

  render() {
    const { image, tags, onClose } = this.props;

    return (
      <Backdrop id="backdrop" onClick={this.onCloseModal}>
        <ModalWrap onClose={onClose}>
          <img src={image} alt={tags} />
        </ModalWrap>
      </Backdrop>
    );
  }
}

Modal.propTypes = {
  image: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  tags: PropTypes.string.isRequired,
};
