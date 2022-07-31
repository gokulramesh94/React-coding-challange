import { useEffect, useState } from 'react';
import _ from 'lodash';
import Head from 'next/head';
import Image from '../components/Image/Image';
import List from '../components/List/List';
import ImageService from '../services/image.service';

export default function Home() {
  const [imageList, setImageList] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const throttledScroll = _.throttle(handleScroll, 500);
    fetchImages();
    window.addEventListener('scroll', throttledScroll);
    return () => window.removeEventListener('scroll', throttledScroll);
  }, []);

  useEffect(() => {
    fetchImages();
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
        setImageList(() => {
          return [...imageList, ...response];
        });
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error('Exception ImageService -> fetchImageList : ', error);
      });
  };

  return (
    <div>
      <Head>
        <title>Photo Grid</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <List data={imageList} viewItem={(image) => handleSelectedImage(image)} />
      {isLoading ? <div className="loading">Loading more images...</div> : null}
    </div>
  );
}
