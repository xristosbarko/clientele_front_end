import * as actionTypes from './actionTypes'

export const messageShow = (message, variant) => {
    return {
        type: actionTypes.MESSAGE_SHOW,
        message,
        variant
    }
}

export const messageClear = () => {
    return {
        type: actionTypes.MESSAGE_CLEAR
    }
}

export const showMessage = (message, variant) => {
  return dispatch => {
    dispatch(messageShow(message, variant))
  }
}

export const clearMessage = () => {
  return dispatch => {
    dispatch(messageClear())
  }
}