import { applyMiddleware, createStore } from "redux";
import { createWrapper, HYDRATE, Context } from "next-redux-wrapper";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers/rootReducer";
import thunk from "redux-thunk";
const bindMidware = (middleware) => {
  if (process.env.NODE_ENV !== "production") {
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    return nextState;
  } else {
    return rootReducer(state, action);
  }
};

const initStore = () => {
  return createStore(reducer, bindMidware([thunk]));
};

export const StoreWrapper = createWrapper(initStore);
