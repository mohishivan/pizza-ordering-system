import { toast } from 'react-toastify';
import getGraph from '../../utils/getGraph'
import * as Queries from './queries'
import * as ActionsTypes from './actions-types'

export const getPizzaSizesAttempt = (payload) => ({ type: ActionsTypes.GET_PIZZA_SIZES_ATTEMPT,  payload: payload })
export const getPizzaSizesSuccess = (payload) => ({ type: ActionsTypes.GET_PIZZA_SIZES_SUCCESS,  payload: payload })
export const getPizzaSizesFailure = (payload) => ({ type: ActionsTypes.GET_PIZZA_SIZES_FAILURE,  payload: payload })
export const addNewPizza          = (payload) => ({ type: ActionsTypes.ADD_NEW_PIZZA,            payload: payload })
export const updatePizzaSizeDo    = (payload) => ({ type: ActionsTypes.UPDATE_PIZZA_SIZE,        payload: payload })
export const setDefaultToppings   = (payload) => ({ type: ActionsTypes.SET_DEFAULT_TOPPINGS,     payload: payload })
export const addTopping           = (payload) => ({ type: ActionsTypes.ADD_TOPPING,              payload: payload })
export const removeTopping        = (payload) => ({ type: ActionsTypes.REMOVE_TOPPING,           payload: payload })
export const addToCart            = (payload) => ({ type: ActionsTypes.ADD_TO_CART,              payload: payload })
export const editPizza            = (payload) => ({ type: ActionsTypes.EDIT_PIZZA,               payload: payload })
export const deletePizza          = (payload) => ({ type: ActionsTypes.DELETE_PIZZA,             payload: payload })

//{{{ getPizzaSizes
export const getPizzaSizes = () => {
  return (dispatch) => {
    dispatch(getPizzaSizesAttempt())
    return getGraph({
      query: Queries.PizzaSizesQuery,
      operationName: null,
      variables: null
    })
    .then(
      res => res.json(),
      error => toast.error(JSON.stringify(error))
    )
    .then(res => {
      if(res && res.data){
        return dispatch(getPizzaSizesSuccess({ pizzaSizes: res.data.pizzaSizes }));
      }else{
        toast.error("Error: fetching pizza sizes")
        console.log("Error: fetching pizza sizes", res)
      }
      return dispatch(getPizzaSizesFailure());
    })
  };
};
//}}}
//{{{ updatePizzaSize
export const updatePizzaSize = ({pizzaSize}) => {
  return (dispatch) => {
    dispatch(updatePizzaSizeDo({pizzaSize}))
    dispatch(setDefaultToppings())
  };
};
//}}}
