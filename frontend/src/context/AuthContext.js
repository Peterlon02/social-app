import React, { createContext, useReducer, useContext } from 'react';

// Definisci le azioni per il reducer
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

// Definisci lo stato iniziale
const initialState = {
  isAuthenticated: false,
  user: null,
};

// Definisci il reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

// Crea il contesto
const AuthContext = createContext();

// Crea un hook personalizzato per accedere al contesto
export const useAuth = () => useContext(AuthContext);

// Crea il provider per il contesto
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};