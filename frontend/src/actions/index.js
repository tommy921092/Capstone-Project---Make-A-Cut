import axios from 'axios';

export const fetchShops = () => async dispatch => {
  // our API call
  const response = await axios.get(`https://5c4548513858aa001418c3e2.mockapi.io/api/shops`)

  dispatch({type: "FETCH_SHOPS", payload: response.data})
} 