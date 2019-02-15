
import React, { Fragment } from "react"
import { compose } from 'recompose'
import {connect} from 'react-redux'
import PizzaSizes from './pizza-sizes'
import Toppings from './toppings'
import AddToCart from './add-to-cart'

const PizzaForm = ({current_pizza}) => {
  if(!current_pizza) return null;
  return(
    <Fragment>
      <PizzaSizes />
      <Toppings />
      <AddToCart />
    </Fragment>
  )
}


const enhance = compose(
  connect(state => ({ 
    current_pizza: state.pizzas.current_pizza,
  })),
);

export default enhance(PizzaForm)
