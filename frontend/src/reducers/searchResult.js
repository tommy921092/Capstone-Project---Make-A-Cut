// dispatching our action
const searchResult = (state = [], action) => {
  
  if(action.type==='FETCH_SHOPS') {
    console.log(action.payload);
    return action.payload;
  }
  return state;
} 

export default searchResult;