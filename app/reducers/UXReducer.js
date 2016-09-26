const initialUXState = {
  loading: true,
  modal: false
}

const UXReducer = (state=initialUXState, action) => {
  switch (action.type) {
  case "TOGGLE_LOADER":
    return  {...state, loading: action.visible}
  }
  return state
}

export default UXReducer
