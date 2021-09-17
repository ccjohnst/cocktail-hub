const Reducer = (state, action) => {
  switch (action.type) {
    case 'SET_IDS':
      return {
        ...state,
        ids: action.payload,
      }
    case 'ADD_ID':
      return {
        ...state,
        ids: state.ids.concat(action.payload),
      }
    case 'REMOVE_ID':
      return {
        ...state,
        ids: state.ids.filter(id => id.id !== action.payload),
      }
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      }
    default:
      return state
  }
}

export default Reducer
