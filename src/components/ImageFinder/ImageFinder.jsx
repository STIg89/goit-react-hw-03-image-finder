import React, { Component } from 'react';
import { Wrapper } from './ImageFinder.styled';
import { Button } from 'components/Button/Button';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { SearchBar } from 'components/SearchBar/SearchBar';
import { Notify } from 'notiflix';
import getImages from 'api/api';

export class ImageFinder extends Component {
  state = {
    searchValue: '',
    page: 1,
    images: [],
    status: 'idle',
    error: null,
    totalPages: 0,
    per_page: 12,
  };

  async componentDidUpdate(_, prevState) {
    const { searchValue, page, totalPages, per_page } = this.state;
    if (prevState.searchValue !== searchValue || prevState.page !== page) {
      try {
        this.setState({ status: 'pending' });
        const data = await getImages(searchValue, page, per_page);
        this.setState(({ images }) => ({
          images: [...images, ...data.hits],
          status: 'resolved',
          totalPages: Math.ceil(data.totalHits / per_page),
        }));
      } catch (error) {
        Notify.failure('Sorry, try again');
        this.setState({
          status: 'rejected',
        });
      }
      if (totalPages === page) {
        Notify.info(`We're sorry, but you've reached the end of search`);
        this.setState({
          status: 'idle',
        });
      }
    }
  }

  onSearchClick = value => {
    if (value === '') {
      Notify.info('Please, write a request');
      return;
    }
    if (value !== this.state.searchValue) {
      this.setState({ searchValue: value, images: [], page: 1 });
    }
  };

  onLoadMoreClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, status, totalPages } = this.state;

    return (
      <Wrapper>
        <SearchBar onSubmitForm={this.onSearchClick} />
        <ImageGallery images={images} />
        {status === 'resolved' && totalPages > 1 && (
          <Button onClick={this.onLoadMoreClick} />
        )}
        {status === 'pending' && <Loader />}
      </Wrapper>
    );
  }
}
