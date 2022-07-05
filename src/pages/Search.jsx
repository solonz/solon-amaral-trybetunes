import React from 'react';
import AlbumCard from '../components/AlbumCard';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';
// import NotFound from './NotFound';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      buttonStatus: true,
      searchField: '',
      searchField2: '',
      artistData: [],
      loading: false,
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

  // https://bobbyhadz.com/blog/react-clear-input-after-submit
  handleSubmitForm = async (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const { searchField } = this.state;
    const artistData = await searchAlbumsAPI(searchField);
    this.setState({
      artistData, searchField: '', loading: false, searchField2: searchField,
    });
  }

  // if (artistData) this.setState({ album: true });
  // console.log(searchField);
  // event.target.reset();
  render() {
    const { buttonStatus, artistData, searchField, searchField2, loading } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <form onSubmit={ this.handleSubmitForm }>
          <input
            data-testid="search-artist-input"
            name="searchField"
            type="text"
            value={ searchField }
            onChange={ this.handleInput }
          />
          <button
            data-testid="search-artist-button"
            type="submit"
            disabled={ buttonStatus }
          >
            pesquisar
          </button>
          {artistData.length > 1 ? (
            <AlbumCard
              artistData={ artistData }
              value={ searchField2 }
            />
          ) : (
            <h5>Nenhum álbum foi encontrado</h5>
          )}
          {loading && <Loading />}
        </form>
      </div>
    );
  }
}

export default Search;
