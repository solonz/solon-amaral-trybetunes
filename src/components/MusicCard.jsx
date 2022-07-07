import React from 'react';
import PropTypes from 'prop-types';
import { removeSong, addSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      isFavorite: false,
      loading: false,
    };
  }

  componentDidMount() {
    const { favorite } = this.props;
    this.setState({ isFavorite: favorite });
    console.log(favorite);
  }

  handleChange = async (event) => {
    const { target: { checked } } = event;
    const { song } = this.props;
    this.setState({ loading: true });

    if (checked) {
      await addSong(song);
      console.log('add musica');
    } else {
      await removeSong(song);
      console.log('removi musica');
    }
    this.setState({ isFavorite: checked, loading: false });
  }

  render() {
    const { song } = this.props;
    const { isFavorite, loading } = this.state;
    return (
      <section>
        <div>
          <h1>{song.trackName}</h1>
          <audio data-testid="audio-component" src={ song.previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            {' '}
            <code>audio</code>
            .
          </audio>
        </div>
        <label htmlFor="favorite">
          <input
            data-testid={ `checkbox-music-${song.trackId}` }
            type="checkbox"
            id="favorite"
            checked={ isFavorite }
            onChange={ this.handleChange }
          />
          Favoritos
        </label>
        {loading && <Loading />}
      </section>
    );
  }
}

MusicCard.propTypes = {
  song: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    favorite: PropTypes.bool.isRequired,
  }),
}.isRequired;

export default MusicCard;
