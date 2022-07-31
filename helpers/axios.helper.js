import axios from 'axios';
import { STRING_CONSTANTS } from '../constants/string.constant';

/** @module Helper_Axios */
/**
 * @function Axios
 * @description This function sets the base URL
 * */

const API_BASE_URL =
  STRING_CONSTANTS?.API_BASE_URL || 'https://api.unsplash.com';

export const Axios = axios.create({
  baseURL: API_BASE_URL
});
