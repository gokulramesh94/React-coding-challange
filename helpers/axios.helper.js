import axios from 'axios';
import { STRING_CONSTANTS } from '../constants/string.constant';

/** @module Helper_Axios */
/**
 * @function Axios
 * @description This function sets the base URL
 * */

const API_BASE_URL =
  STRING_CONSTANTS?.NEXT_PUBLIC_API_BASE_URL ||
  'https://0702-2604-3d08-5982-c200-880a-3a58-c00d-20f5.ngrok.io/api';

export const Axios = axios.create({
  baseURL: API_BASE_URL
});
