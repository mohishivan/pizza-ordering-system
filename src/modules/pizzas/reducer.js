import React from 'react';
import update from 'immutability-helper'
import uuidv4 from 'uuid/v4'
import * as ActionsTypes from './actions-types'
import * as Selectors from './selectors'
import { toast } from 'react-toastify';

//{{{ pizzaSizes
const pizzaSizes = [
      {
        "name": "small",
        "maxToppings": 3,
        "basePrice": 9.89,
        "toppings": [
          {
            "topping": {
              "name": "pepperoni",
              "price": 0.4
            },
            "defaultSelected": false
          },
          {
            "topping": {
              "name": "bannana peps",
              "price": 0.89
            },
            "defaultSelected": false
          },
          {
            "topping": {
              "name": "sausage",
              "price": 1.29
            },
            "defaultSelected": false
          },
          {
            "topping": {
              "name": "onion",
              "price": 0.29
            },
            "defaultSelected": false
          },
          {
            "topping": {
              "name": "green olives",
              "price": 0.39
            },
            "defaultSelected": false
          },
          {
            "topping": {
              "name": "cheese",
              "price": 0.1
            },
            "defaultSelected": true
          },
          {
            "topping": {
              "name": "bell peps",
              "price": 0.22
            },
            "defaultSelected": false
          }
        ]
      },
      {
        "name": "medium",
        "maxToppings": 5,
        "basePrice": 10.89,
        "toppings": [
          {
            "topping": {
              "name": "pepperoni",
              "price": 0.4
            },
            "defaultSelected": true
          },
          {
            "topping": {
              "name": "bannana peps",
              "price": 0.89
            },
            "defaultSelected": false
          },
          {
            "topping": {
              "name": "sausage",
              "price": 1.29
            },
            "defaultSelected": false
          },
          {
            "topping": {
              "name": "onion",
              "price": 0.29
            },
            "defaultSelected": false
          },
          {
            "topping": {
              "name": "green olives",
              "price": 0.39
            },
            "defaultSelected": false
          },
          {
            "topping": {
              "name": "cheese",
              "price": 0.1
            },
            "defaultSelected": true
          },
          {
            "topping": {
              "name": "bell peps",
              "price": 0.22
            },
            "defaultSelected": false
          }
        ]
      },
      {
        "name": "large",
        "maxToppings": null,
        "basePrice": 13.49,
        "toppings": [
          {
            "topping": {
              "name": "pepperoni",
              "price": 0.4
            },
            "defaultSelected": true
          },
          {
            "topping": {
              "name": "bannana peps",
              "price": 0.89
            },
            "defaultSelected": false
          },
          {
            "topping": {
              "name": "sausage",
              "price": 1.29
            },
            "defaultSelected": false
          },
          {
            "topping": {
              "name": "onion",
              "price": 0.29
            },
            "defaultSelected": false
          },
          {
            "topping": {
              "name": "green olives",
              "price": 0.39
            },
            "defaultSelected": false
          },
          {
            "topping": {
              "name": "cheese",
              "price": 0.1
            },
            "defaultSelected": true
          },
          {
            "topping": {
              "name": "bell peps",
              "price": 0.22
            },
            "defaultSelected": false
          }
        ]
      }
    ]
//}}}
let toast_id = null

//{{{ cannot_remove
const cannot_remove = ({topping, size}) => (
      <p aria-label={`cannot remove  ${topping} it is added by default to ${size} pizza size`}>
        <span  aria-hidden={ true }>
        Cannot remove <b>{topping}</b>
        <br/>
        it is added by default to {size} pizza size
        </span>
      </p>)
      //}}}
//{{{ cannot_add
const cannot_add = ({maxToppings, size}) => (
  <p aria-label={`Can only add up to ${maxToppings} toppings to ${size} pizza size`}>
    <span  aria-hidden={ true }>
      Can only add {maxToppings} toppings
      <br/>
      to { size } pizza size
    </span>
  </p>
)
//}}}
//{{{ alert_message
const alert_message = ({message, ...props}) => {
  if (toast.isActive(toast_id)) {
    toast.update(toast_id, { render: message(props)})
  }else{
    toast_id = toast.info(message(props))
  }
}
//}}}

/*
 *  PizzaID = string //uuidv4
 *  PizzaSize = string
 *  Pizza = {
 *   pizzaSize: PizzaSize,
 *   toppings: [string]
 *  }
 *  State = {
 *    pizzaSizes: GraphqlJSON,
 *    current_pizza: {
 *      pizzaSize: PizzaSize,
 *      toppings: [string]
 *    },
 *    cart: [PizzaID],
 *    items: {
 *      [PizzaID]: Pizza 
 *    }
 *  }
 * */

const InitialState = {
  pizzaSizes,
  current_pizza: null,
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
          current_pizza: { 
            $set: { 
              id: uuid, 
              toppings: [] 
            } 
          }
        })
      }
      //}}}
      //{{{ UPDATE_PIZZA_SIZE
      case ActionsTypes.UPDATE_PIZZA_SIZE:{
        const { pizzaSize } = action.payload
        return update(state,{
          current_pizza: { 
            pizzaSize: { $set: pizzaSize }
          }
        })
      }
      //}}}
      //{{{ SET_DEFAULT_TOPPINGS
      case ActionsTypes.SET_DEFAULT_TOPPINGS:{
        const default_toppings = Selectors.sizeDefaultToppings({pizzas: state})
        return update(state,{
          current_pizza: { 
            toppings: { $set: default_toppings }
          }
        })
      }
      //}}}
      //{{{ ADD_TOPPING
      case ActionsTypes.ADD_TOPPING:{
        const { topping } = action.payload
        const { current_pizza } = state
        const currentPizzaSize = current_pizza && current_pizza.pizzaSize
        const pizzaSize = Selectors.pizzaSizes({pizzas: state})[currentPizzaSize]
        if(state.current_pizza.toppings.length === pizzaSize.maxToppings) {
          alert_message({maxToppings: pizzaSize.maxToppings, size: currentPizzaSize, message: cannot_add})
          return state
        }
        return update(state,{
          current_pizza: { 
            toppings: { $push: [ topping ] }
          }
        })
      }
      //}}}
      //{{{ REMOVE_TOPPING
      case ActionsTypes.REMOVE_TOPPING:{
        const { topping } = action.payload
        const default_toppings = Selectors.sizeDefaultToppings({pizzas: state})
        const { current_pizza } = state
        const size = current_pizza && current_pizza.pizzaSize
        if(default_toppings.includes(topping)) {
          alert_message({topping, size, message: cannot_remove})
          return state;
        }
        return update(state,{
          current_pizza: { 
            toppings: { $set: state.current_pizza.toppings.filter(t => t !== topping  ) }
          }
        })
      }
      //}}}
      //{{{ ADD_TO_CART
      case ActionsTypes.ADD_TO_CART:{
        const { current_pizza } = state
        return update(state,{
          items: { $merge: { [current_pizza.id]: current_pizza } },
          cart: { $push: state.cart.includes(current_pizza.id) ? [] : [current_pizza.id] },
          current_pizza: { $set: null }
        })
      }
      //}}}
      //{{{ EDIT_PIZZA
      case ActionsTypes.EDIT_PIZZA:{
        const { id } = action.payload
        return update(state,{
          current_pizza: { $set: state.items[id] }
        })
      }
      //}}}
      //{{{ DELETE_PIZZA
      case ActionsTypes.DELETE_PIZZA:{
        const { id } = action.payload
        return update(state,{
          items: { $unset: [id] },
          cart:  { $set: state.cart.filter(pid => pid!==id) },
          current_pizza: { $set: null }
        })
      }
      //}}}
        default:
        return state;
    }
}

