import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const initialState = {
    open: false,
    message: ''
}

const messageShow = (state, action) => {
    return updateObject(state, {
        open: true,
        message: action.message,
        variant: action.variant
    })
}

const messageClear = (state, action) => {
    return updateObject(state, {
        open: false
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.MESSAGE_SHOW: return messageShow(state, action)
        case actionTypes.MESSAGE_CLEAR: return messageClear(state, action)
        default:
            return state
    }
}

export default reducer