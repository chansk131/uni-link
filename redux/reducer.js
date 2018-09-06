import { combineReducers } from "redux";

import { UPDATE_USER } from "./actions";

const userReducer = (state = {}, action) => {
  if (action.type === UPDATE_USER) return { ...action.payload };
  return state;
};

const reducer = combineReducers({
  user: userReducer
});

export default reducer;
