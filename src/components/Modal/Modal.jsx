import { Component } from 'react';
import { Overlay, Modal } from './Modal.styled';

export class ModalItem extends Component {
  handleClick = e => {
    if (e.target === e.currentTarget) {
      this.props.toggle();
    }
  };

  handleKeydown = e => {
    if (e.code === 'Escape') {
      this.props.toggle();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
  }

  render() {
    return (
      <Overlay onClick={this.handleClick}>
        <Modal>
          <img src={this.props.imgUrl} alt="" />
        </Modal>
      </Overlay>
    );
  }
}
