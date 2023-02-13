import React, { Component } from 'react';
import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';
import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component {
  state = {
    isVisible: false,
  };

  onToggleModal = () => {
    const { isVisible } = this.state;
    this.setState({ isVisible: !isVisible });
  };

  onCloseModal = e => {
    const clickedTo = e.target.id;
    const pressedKey = e.code;

    if (clickedTo === 'backdrop' || pressedKey === 'Escape') {
      this.onToggleModal();
    }
  };

  render() {
    const { webformatURL, tags, largeImageURL } = this.props;
    const { isVisible } = this.state;

    return (
      <GalleryItem>
        <GalleryItemImage
          src={webformatURL}
          alt={tags}
          onClick={this.onToggleModal}
        />
        {isVisible && (
          <Modal
            image={largeImageURL}
            tags={tags}
            onClose={this.onCloseModal}
          />
        )}
      </GalleryItem>
    );
  }
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
