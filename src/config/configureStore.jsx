import { createStore } from "redux";

import rootReducer from "../stores/reducers";

export const store = createStore(rootReducer);