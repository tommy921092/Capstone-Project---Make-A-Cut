import axios from "axios";

export const shopSignupRequest = (shopData) => {
  return dispatch => {
    return axios.post('/api/shop', shopData, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    });
  }
};