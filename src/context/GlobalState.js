import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

const initialStates = {
  language: "English",
};

export const GlobalContext = createContext(initialStates);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialStates);

  const changeLanguage = (language) => {
    dispatch({
      type: "CHANGE_LANGUAGE",
      payload: language,
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        language: state.language,
        changeLanguage,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
