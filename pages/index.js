import { memo, useEffect, useState } from 'react';
import _ from 'lodash';
import Head from 'next/head';
import IconButton from '@mui/material/IconButton';
import Image from '../components/Image/Image';
import List from '../components/List/List';
import Modal from '../components/Modal/Modal';
import ImageService from '../services/image.service';
import { useModal } from '../hooks';
import { theme } from '../helpers/theme.helper';

const Home = () => {
  const [imageList, setImageList] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);

  const { mobileScreen, tabScreen } = theme();
  const { modalstate, handleModalOpen, handleModalClose } = useModal(false);

  useEffect(() => {
    if (!allImagesLoaded) {
      const throttledScroll = _.throttle(handleScroll, 500);
      window.addEventListener('scroll', throttledScroll);
      return () => window.removeEventListener('scroll', throttledScroll);
    }
  }, []);

  useEffect(() => {
    if (!allImagesLoaded) fetchImages();
  }, [pageNo]);

  const handleScroll = () => {
    const wrappedElement =
      document.getElementsByClassName('MuiImageList-root')[0];
    if (!isBottom(wrappedElement)) return;
    setPageNo((oldPageNo) => oldPageNo + 1);
  };

  const isBottom = (element) => {
    return element.getBoundingClientRect().bottom <= window.innerHeight;
  };

  const fetchImages = () => {
    setIsLoading(true);
    ImageService.fetchImageList(pageNo)
      .then((response) => {
        if (response.length === 0) {
          setAllImagesLoaded(true);
        } else {
          setImageList(() => {
            return [...imageList, ...response];
          });
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error('Exception ImageService -> fetchImageList : ', error);
      });
  };

  const handleSelectedImage = (image) => {
    console.log('selected image : ', image);
    handleModalOpen();
    setSelectedImage(image);
  };

  return (
    <div>
      <Head>
        <title>Photo Grid</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <List data={imageList} viewItem={(image) => handleSelectedImage(image)} />
      {modalstate ? (
        <Modal modalstate={modalstate} handleModalClose={handleModalClose}>
          <div
            className={`modal-content-wrapper ${
              !tabScreen || !mobileScreen ? 'mobile' : ''
            }`}
          >
            <div className="image-wrapper">
              <Image
                source={selectedImage?.urls?.regular}
                sourceset={selectedImage?.urls?.regular}
                altText={selectedImage?.user?.username}
                loading="lazy"
              />
            </div>
            <div className="details">
              <div className="close-button">
                <IconButton onClick={handleModalClose}>X</IconButton>
              </div>
              <div className="title">{selectedImage?.user?.username}</div>
              <div className="bio">{selectedImage?.user?.bio}</div>
              <div className="personal-details">
                {selectedImage?.user?.name ? <b>Name : </b> : null}
                {selectedImage?.user?.name}
              </div>
              <div className="personal-details">
                {selectedImage?.user?.social?.instagram_username ? (
                  <b>Instagram Username : </b>
                ) : null}
                {selectedImage?.user?.social?.instagram_username}
              </div>
              <div className="personal-details">
                {selectedImage?.user?.social?.portfolio_url ? (
                  <b>Portfolio : </b>
                ) : null}
                <a href={selectedImage?.user?.social?.portfolio_url}>
                  {selectedImage?.user?.social?.portfolio_url}
                </a>
              </div>
            </div>
          </div>
        </Modal>
      ) : null}
      {isLoading ? <div className="loading">Loading more images...</div> : null}
    </div>
  );
};

export default memo(Home);
