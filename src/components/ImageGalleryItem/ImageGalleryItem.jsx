import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';
import { ModalItem } from 'components/Modal/Modal';
import { Component } from 'react';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };
  toggleModal = () => {
    return this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  render() {
    const { image } = this.props;
    const { webformatURL, largeImageURL } = image;
    const { toggleModal } = this;
    const { showModal } = this.state;
    return (
      <GalleryItem>
        <GalleryItemImage src={webformatURL} onClick={() => toggleModal()} />
        {showModal && (
          <ModalItem toggle={toggleModal} imgUrl={largeImageURL}></ModalItem>
        )}
      </GalleryItem>
    );
  }
}

export default ImageGalleryItem;

