import { createStore } from "redux";

import { updateUser } from "./actions";
import reducer from "./reducer";

const store = createStore(reducer);

store.dispatch(
  updateUser({
    username: "chan",
    rating: 90,
    created_at: "21 Sept 2018",
    location: "Bristol",
    followers: 100,
    following: 200
  })
);

export default store;
