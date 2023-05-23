import { Component } from 'react';
import { BsSearch } from 'react-icons/bs';

import {
  Header,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';

export default class Searchbar extends Component {
  state = {
    data: '',
  };

  handleDataChange = event => {
    this.setState({ data: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.data.trim() === '') {
      alert('enter name');
      return;
    }
    this.props.onSubmit(this.state.data);
    this.setState({ data: '' });
  };

  render() {
    return (
      <Header>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit">
            <BsSearch />
            <SearchFormButtonLabel>Search</SearchFormButtonLabel>
          </SearchFormButton>

          <SearchFormInput
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.data}
            onChange={this.handleDataChange}
          />
        </SearchForm>
      </Header>
    );
  }
}
