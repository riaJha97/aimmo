import types from './types'

const editorReducer = (state = {}, action) => {
  switch (action.type) {
    case types.GET_CODE_SUCCESS:
    case types.CHANGE_CODE:
      return {
        ...state,
        code: action.payload.code
      }
    case types.ZOOM_IN_REQUEST:
      return {
        ...state,
        textSize: state.textSize += 2
      }
    case types.ZOOM_OUT_REQUEST:
      return {
        ...state,
        textSize: state.textSize -= 2
      }
    default:
      return state
  }
}

export default editorReducer
