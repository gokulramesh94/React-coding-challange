import React, { memo, useState } from 'react';
import FALLBACK_IMAGE from '../../assets/images/no-image-available.png';
import PropTypes from 'prop-types';

const Image = ({ source, sourceset, altText, fallbackImage, loading }) => {
  const [load, setLoad] = useState(false);

  const addDefaultSrc = (event) => {
    event.target.src = fallbackImage || FALLBACK_IMAGE;
  };

  const handleImageLoad = () => {
    setLoad(true);
  };

  return (
    <>
      {!load ? (
        <div className="image-loader-wrapper">
          <div className="image-loader"></div>
        </div>
      ) : null}
      <img
        className="image"
        src={source}
        srcSet={sourceset}
        alt={altText}
        onLoad={handleImageLoad}
        onError={addDefaultSrc}
        loading={loading}
      />
    </>
  );
};

Image.defaultProps = {
  source: '',
  sourceset: '',
  altText: '',
  fallbackImage: '',
  loading: 'eager'
};

Image.propTypes = {
  source: PropTypes.string,
  sourceset: PropTypes.string,
  altText: PropTypes.string,
  fallbackImage: PropTypes.string,
  loading: PropTypes.string
};

export default memo(Image);
