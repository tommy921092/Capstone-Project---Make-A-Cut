const shopServiceSettings = (state = {services:[]}, action = {}) => {
  switch (action.type) {
    case "SET_SHOP_SERVICE":
    return {
      services:action.data
    }

    default: return state;
  }
};

export default shopServiceSettings;

// return {
//   services: [

//   ]
// };