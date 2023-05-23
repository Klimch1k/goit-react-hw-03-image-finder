import { Component } from 'react';
import { Container } from './App.styled';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import LoadMore from './Button/Button';

export default class App extends Component {
  state = {
    images: [],
    searchValue: '',
    page: 1,
    status: 'idle',
  };



  componentDidUpdate(prevProps, prevState) {
    const KEY = '35001315-ff900fe6dc9bb67b55de16f8c';
    
    if (
      prevState.searchValue !== this.state.searchValue ||
      this.state.page !== prevState.page
    ) {
      this.setState({ status: 'pending' });

      fetch(
        `https://pixabay.com/api/?q=${this.state.searchValue}&page=${this.state.page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(res => res.json())
        .then(data =>
          this.setState({
            images: [...this.state.images, ...data.hits],
            status: 'resolved',
          })
        );
    }
  }

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleFormSubmit = data => {
    this.setState({ images: [], page: 1, searchValue: data });
  };

  render() {
    const { images, status } = this.state;
    const { handleFormSubmit, toggleModal, handleLoadMore } = this;

    if (status === 'idle') {
      return (
        <Container>
          <Searchbar onSubmit={handleFormSubmit} />
        </Container>
      );
    }

    if (status === 'pending') {
      return (
        <Container>
          <Searchbar onSubmit={handleFormSubmit} />
          <Loader />
        </Container>
      );
    }

    // if (status === 'rejected') {
    //   return <h1>{error.message}</h1>;
    // }

    if (status === 'resolved') {
      return (
        <>
          <Container>
            <Searchbar onSubmit={handleFormSubmit} />
            <ImageGallery
              images={images}
              toggle={toggleModal}
              showModal={this.state.showModal}
            />
            <LoadMore onClick={handleLoadMore}></LoadMore>
          </Container>
        </>
      );
    }
  }
}
