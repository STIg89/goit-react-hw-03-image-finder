import { Component } from 'react';
import {
  SearchWrap,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './SearchBar.styled';
import loupe from 'img/loupe.png';

export class SearchBar extends Component {
  state = {
    searchValue: '',
  };

  onChange = e => {
    this.setState({ searchValue: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.onSubmitForm(this.state.searchValue.trim());
    this.resetInput();
  };

  resetInput = () => {
    this.setState({ searchValue: '' });
  };

  render() {
    return (
      <SearchWrap>
        <SearchForm onSubmit={this.onSubmit}>
          <SearchFormButton
            type="submit"
            style={{ backgroundImage: `url(${loupe})` }}
          />
          <SearchFormInput
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.onChange}
            value={this.state.searchValue}
          />
        </SearchForm>
      </SearchWrap>
    );
  }
}
