import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      buttonStatus: true,
      searchField: '',
    };
  }

  handleButton = () => {
    const { searchField } = this.state;
    const MIN_CHAR = 2;
    if (searchField.length >= MIN_CHAR) {
      this.setState({
        buttonStatus: false,
      });
    } else {
      this.setState({
        buttonStatus: true,
      });
    }
  }

  handleInput = ({ target }) => {
    const { value } = target;
    this.setState({
      searchField: value,
    }, () => this.handleButton());
  }

  render() {
    const { buttonStatus } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <form type="submit">
          <input
            data-testid="search-artist-input"
            name="searchField"
            type="text"
            onChange={ this.handleInput }
          />
          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ buttonStatus }
          >
            pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
