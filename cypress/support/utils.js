import { MOCK_DATA, URL_ENDPOINTS } from './mockData';

export const basePath = 'http://localhost:3000';

export class MockServiceCall {
  /**
   * This function returns a list of images
   */
  static fetchImageList = (cy, page, images_per_page) => {
    cy.intercept(
      {
        method: 'GET',
        url: URL_ENDPOINTS.FETCH_PHOTOS
      },
      MOCK_DATA
    );
  };
}
