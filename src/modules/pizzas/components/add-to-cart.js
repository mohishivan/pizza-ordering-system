import React from "react"
import { compose } from 'recompose'
import {connect} from 'react-redux'
import * as Selectors from '../selectors'
import * as Actions from '../actions'
import {Button} from '../styled'

const AddToCart = ({currentPizza, cart, dispatch}) => {
  const is_pizza_complete = currentPizza && currentPizza.pizzaSize
  if(!is_pizza_complete) return null;
  const add_to_cart = () => dispatch(Actions.addToCart())
  const action_label = cart.includes(currentPizza.id) ? "Update Pizza" : "Add To Cart"
  return(
    <Button 
      tabIndex="11" 
      aria-label="add pizza to cart"
      onClick={ add_to_cart }
      onKeyPress={ add_to_cart }
    >{ action_label }</Button>
  )
}

const enhance = compose(
  connect(state => ({ 
    pizzaSizes: state.pizzas.pizzaSizes,
    cart: state.pizzas.cart,
    currentPizza: Selectors.currentPizza(state),
  })),
  // withState('selectableGroupRef', 'setSelectableGroupRef', null),
  //with_lifecycle
);

export default enhance(AddToCart)
