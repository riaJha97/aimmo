/* eslint-env jest */
import editorReducer from './reducers'
import actions from './actions'

describe('editorReducer', () => {
  it('should return the initial state', () => {
    expect(editorReducer(undefined, {})).toEqual({})
  })

  it('should handle GET_CODE_SUCCESS', () => {
    const expectedState = {
      code: 'class Avatar'
    }
    const action = actions.getCodeReceived('class Avatar')
    expect(editorReducer({}, action)).toEqual(expectedState)
  })

  it('should handle CHANGE_CODE', () => {
    const expectedState = {
      code: 'class Avatar'
    }
    const action = actions.changeCode('class Avatar')
    expect(editorReducer({}, action)).toEqual(expectedState)
  })

  it('should handle ZOOM_IN_REQUEST', () => {
    const stateBeforeReducing = {
      textSize: 14
    }
    const expectedState = { 
      textSize: 16
    }
    const action = actions.zoomInRequest()
    expect(editorReducer(stateBeforeReducing, action)).toEqual(expectedState)
  })

  it('should handle ZOOM_OUT_REQUEST', () => {
    const stateBeforeReducing = {
      textSize: 14
    }
    const expectedState = { 
      textSize: 12
    }
    const action = actions.zoomOutRequest()
    expect(editorReducer(stateBeforeReducing, action)).toEqual(expectedState)
  })
})
