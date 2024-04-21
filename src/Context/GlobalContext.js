
import React, { createContext, useReducer, useContext } from "react";

const initialState = {
  watchList: [],
  watched: [],
};

export const GlobalContext = createContext(initialState);

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_WATCHLIST":
      return {
        ...state,
        watchList: [...state.watchList, action.payload],
      };
    default:
      return state;
  }
};

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider value={{ ...state, MoviesDispatch: dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};