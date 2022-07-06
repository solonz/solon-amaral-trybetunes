import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      albumInfo: {},
      songs: [],
      favoritesList: [],
      loading: false,
    };
  }

componentDidMount = async () => {
  this.pegaMusica();
  this.handleFavorites();
}

handleFavorites = async () => {
  this.setState({ loading: true });
  const favoritesList = await getFavoriteSongs();
  this.setState({ loading: false });
  this.setState(favoritesList);
}

  pegaMusica = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const apiMusica = await getMusics(id);
    const [albumInfo, ...songs] = apiMusica;
    this.setState({ albumInfo, songs });
  }

  render() {
    const { albumInfo, songs, favoritesList, loading } = this.state;
    return (
      <div data-testid="page-album">
        {loading && <Loading />}
        <Header />
        <h1 data-testid="artist-name">{albumInfo.artistName}</h1>
        <h1 data-testid="album-name">{albumInfo.collectionName}</h1>
        {songs.map((song) => (<MusicCard
          song={ song }
          key={ song.trackId }
          trackId={ song.trackId }
          favorite={ favoritesList.some((favorite) => favorite.trackId === song.trackId) }
        />))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number,
    }),
  }),
}.isRequired;

export default Album;
