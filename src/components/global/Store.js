import React, { createContext, useReducer, useEffect } from 'react'
import Reducer from './Reducer'

const initialState = {
  ids: [],
  error: null,
}

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState)

  // useEffect hook to retrieve saved cocktails in localStorage
  useEffect(() => {
    const stateData = JSON.parse(localStorage.getItem('state'))
    console.log(stateData)
    // if saved cocktails localstorage item exists, set global state to the cocktail IDs
    if (stateData) {
      dispatch({
        type: 'SET_IDS',
        payload: stateData,
      })
    }
  }, [])

  // useEffect hook to create localstorage for saved cocktails
  useEffect(() => {
    // if there are cocktails save in state,
    // create localStorage item 'state' containing global state ids
    if (state.ids.length > 0) {
      localStorage.setItem('state', JSON.stringify(state.ids))
    }
  }, [state])
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  )
}

export const Context = createContext(initialState)
export default Store
