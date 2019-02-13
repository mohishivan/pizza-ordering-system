import * as ActionsTypes from './actions-types'
export const getPizzaSizesAttempt = (payload) => ({ type: ActionsTypes.GET_PIZZA_SIZES_ATTEMPT,  payload: payload })
export const getPizzaSizesSuccess = (payload) => ({ type: ActionsTypes.GET_PIZZA_SIZES_SUCCESS,  payload: payload })
export const getPizzaSizesFailure = (payload) => ({ type: ActionsTypes.GET_PIZZA_SIZES_FAILURE,  payload: payload })
export const addNewPizza          = (payload) => ({ type: ActionsTypes.ADD_NEW_PIZZA,            payload: payload })
