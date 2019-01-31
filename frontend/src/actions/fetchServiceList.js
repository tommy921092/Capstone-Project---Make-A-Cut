import axios from "axios";

export const setShopServiceSetting = (data) => {
  return {
    type: "SET_SHOP_SERVICE",
    data: data
  }
}

export const fetchServiceList = (merchantID) => {
  return dispatch => {
    console.log(merchantID)
    return axios.get(`/api//shop/service/${merchantID}`)
      .then(
        (res) => {
          console.log(res.data)
          dispatch(setShopServiceSetting(res.data))
        }
      )
  }
};