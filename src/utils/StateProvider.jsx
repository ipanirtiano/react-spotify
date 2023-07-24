/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer } from "react";

export const StateContext = createContext()

export const StateProvider = ({children, initialState, reducer}) => {
    return(
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider> 
    )
}


export const useStateProvider = () => useContext(StateContext)