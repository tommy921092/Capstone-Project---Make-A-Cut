import axios from 'axios';
import queryString from 'query-string';

export const fetchShops = () => async dispatch => {
  // our API call
  const response = await axios.get(`https://5c4548513858aa001418c3e2.mockapi.io/api/shops`)

  dispatch({type: "FETCH_SHOPS", payload: response.data})
}

const fetchListings = () => async dispatch => {
  const name = queryString.parse(this.props.location.search) // ?name=${name}

  const response = await axios.get(`/api/search?name=${name.name}`)

  dispatch({type: "FETCH_LISTINGS", payload: response.data })
}