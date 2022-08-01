import { Axios } from '../helpers/axios.helper';
import { STRING_CONSTANTS } from '../constants/string.constant';

/** @module Service_ImageService */
class ImageService {
  /**
   * @function fetchImageList
   * @description This function returns a list of images
   * @param {int} page Page Number
   * @param {int} images_per_page Number Of Images to be returned
   * @returns {Object} Returns an array of images
   */
  fetchImageList = async (page, images_per_page) => {
    try {
      const response = await Axios.get(STRING_CONSTANTS.API_ENDPOINTS.PHOTOS, {
        params: {
          client_id: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
          page,
          per_page: images_per_page
        }
      });

      return response.data;
    } catch (error) {
      console.error('Error - ImageService -> fetchImageList: ', error);
    }
  };
}

export default new ImageService();
