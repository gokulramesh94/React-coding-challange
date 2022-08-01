import React, { memo } from 'react';
import PropTypes from 'prop-types';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Image from '../Image/Image';
import { theme } from '../../helpers/theme.helper';

const List = ({ data, viewItem }) => {
  const { mobileScreen, tabScreen } = theme();
  const renderListItems = () => {
    let imageList = [];
    data.map((image, index) =>
      imageList.push(
        <ImageListItem key={index} onClick={() => viewItem(image)}>
          <div className="image-wrapper">
            <Image
              source={image?.urls?.regular}
              sourceset={image?.urls?.regular}
              altText={image?.user?.username}
              loading="lazy"
            />
          </div>
          <ImageListItemBar
            title={image?.user?.username}
            subtitle={image?.user?.name}
          />
        </ImageListItem>
      )
    );
    return imageList;
  };

  return (
    <>
      {data.length === 0 ? (
        <div className="no-images" key={0}>
          No Images to Display!
        </div>
      ) : (
        <ImageList
          variant="masonry"
          cols={mobileScreen ? (tabScreen ? 3 : 2) : 1}
          gap={15}
        >
          {renderListItems()}
        </ImageList>
      )}
    </>
  );
};

List.propTypes = {
  data: PropTypes.array,
  viewItem: PropTypes.func
};

List.defaultProps = {
  data: [],
  viewItem: () => {}
};

export default memo(List);
