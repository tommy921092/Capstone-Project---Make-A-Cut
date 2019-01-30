// dispatching our action
const searchListings = (state = [], action) => {
  
  if(action.type==='FETCH_LISTINGS') {
    console.log(action.payload);
    return action.payload;
  }
  return state;
} 

export default searchListings;