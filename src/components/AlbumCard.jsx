import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class AlbumCard extends React.Component {
  render() {
    const { artistData, value } = this.props;
    return (
      <div>
        <h1>{`Resultado de álbuns de: ${value}`}</h1>
        <ul>
          {artistData.map((lemento) => (
            <Link
              key={ lemento.collectionId }
              data-testid={ `link-to-album-${lemento.collectionId}` }
              to={ `/album/${lemento.collectionId}` }
            >
              <li>
                <img src={ lemento.artworkUrl100 } alt={ lemento.artistName } />
                {lemento.collectionName}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    );
  }
}

AlbumCard.propTypes = {
  artistData: PropTypes.shape({
    artistId: PropTypes.number,
    artistName: PropTypes.string,
    collectionId: PropTypes.number,
    collectionName: PropTypes.string,
    collectionPrice: PropTypes.number,
    artworkUrl100: PropTypes.string,
    releaseDate: PropTypes.string,
    trackCount: PropTypes.number,
  }),
}.isRequired;

export default AlbumCard;
