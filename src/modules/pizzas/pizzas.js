import React from "react"
import {connect} from 'react-redux'
import { compose, withHandlers, branch, renderComponent, withStateHandlers, withState } from 'recompose'
import withLifecycle from '@hocs/with-lifecycle';
import * as Actions from './actions'
import * as Thunks from './thunks'
import PizzaSizes from './components/pizza-sizes'
import AddNewPizza from './components/add-new-pizza'
import Toppings from './components/toppings'
import AddToCart from './components/add-to-cart'
import OrderItems from './components/order-items'
import { Container, Builder, Cart } from "./styled";

const Pizzas = () => {
  return(
    <Container>
      <Builder>
        <AddNewPizza />
        <PizzaSizes />
        <Toppings />
        <AddToCart />
      </Builder>
      <Cart>
        <OrderItems />
      </Cart>
    </Container>
  )
}

  // With LifeCycle {{{
const with_lifecycle = withLifecycle({
  onWillMount({fetching, dispatch}){
    if(!fetching) dispatch(Thunks.getPizzaSizes());
  }
});
  //}}}

const enhance = compose(
  connect(state => ({ 
    pizzaSizes: state.pizzas.pizzaSizes
  })),
  // withState('selectableGroupRef', 'setSelectableGroupRef', null),
  with_lifecycle
);

export default enhance(Pizzas)
