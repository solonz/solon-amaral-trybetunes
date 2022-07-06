import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { song } = this.props;
    return (
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
    );
  }
}

MusicCard.propTypes = {
  song: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
  }),
}.isRequired;

export default MusicCard;
