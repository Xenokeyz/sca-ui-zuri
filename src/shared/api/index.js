import axios from "axios";
import config from "../config";

const $axios = axios.create({ baseURL: config().apiUrl });
const parseError = (error) => {
  if (error.isAxiosError) {
    const message = error?.response?.data?.message || error.message;
    throw new Error(message);
  }

  throw error;
};
const $api = {
  $axios,
  async $get(url, config) {
    try {
      const { data } = await $axios.get(url, config);
      return data;
    } catch (error) {
      parseError(error);
    }
  },
  async $delete(url, config) {
    try {
      const { data } = await $axios.delete(url, config);
      return data;
    } catch (error) {
      parseError(error);
    }
  },
  async $post(url, body, config) {
    try {
      const { data } = await $axios.post(url, body, config);
      return data;
    } catch (error) {
      parseError(error);
    }
  },
  async $put(url, body, config) {
    try {
      const { data } = await $axios.put(url, body, config);
      return data;
    } catch (error) {
      parseError(error);
    }
  },
};

export default $api;
