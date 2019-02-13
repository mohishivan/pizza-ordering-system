import update from 'immutability-helper'
import uuidv4 from 'uuid/v4'
import * as ActionsTypes from './actions-types'

const InitialState = {
  pizzaSizes: [],
  current_pizza: {},
  cart: [],
  items: {}
}

export const PizzasReducer = (_state, action) => {
    const state = _state == null ? InitialState : _state
    switch (action.type) {
      //{{{ GET_PIZZA_SIZES_ATTEMPT
      case ActionsTypes.GET_PIZZA_SIZES_ATTEMPT:{
          return update(state,{
            fetching: { $set: true }
          })
      }
      //}}}
      //{{{ GET_PIZZA_SIZES_SUCCESS
      case ActionsTypes.GET_PIZZA_SIZES_SUCCESS:{
        const { pizzaSizes } = action.payload
        return update(state,{
          pizzaSizes: { $set: pizzaSizes },
          fetching: { $set: false }
        })
      }
      //}}}
      //{{{ GET_PIZZA_SIZES_FAILURE
      case ActionsTypes.GET_PIZZA_SIZES_FAILURE:{
        return update(state,{
          fetching: { $set: false }
        })
      }
      //}}}
      //{{{ ADD_NEW_PIZZA
      case ActionsTypes.ADD_NEW_PIZZA:{
        const uuid = uuidv4()
        return update(state,{
          current_pizza: { $set: { id: uuid } }
        })
      }
      //}}}
        default:
        return state;
    }
}

