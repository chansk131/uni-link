import { combineReducers } from "redux";

import { UPDATE_USER, UPDATE_SEARCH } from "./actions";

const userReducer = (state = {}, action) => {
  if (action.type === UPDATE_USER) return { ...action.payload };
  return state;
};

const searchReducer = (state = {}, action) => {
  if (action.type === UPDATE_SEARCH) return { ...action.payload };
  return state;
};

const reducer = combineReducers({
  user: userReducer,
  search: searchReducer
});

export default reducer;
