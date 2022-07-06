import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      albumInfo: {},
      songs: [],
    };
  }

componentDidMount = async () => {
  await this.pegaMusica();
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
    const { albumInfo, songs } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h1 data-testid="artist-name">{albumInfo.artistName}</h1>
        <h1 data-testid="album-name">{albumInfo.collectionName}</h1>
        {songs.map((song) => <MusicCard song={ song } key={ song.trackId } />)}
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
