import React, { Component } from 'react';
import { Backdrop, ModalWrap } from './Modal.styled';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.props.onClose);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.props.onClose);
  }

  render() {
    const { image, tags, onClose } = this.props;

    return (
      <Backdrop id="backdrop" onClick={onClose}>
        <ModalWrap>
          <img src={image} alt={tags} />
        </ModalWrap>
      </Backdrop>
    );
  }
}
