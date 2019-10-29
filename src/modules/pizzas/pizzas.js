import React from "react"
import {connect} from 'react-redux'
import { compose } from 'recompose'
import withLifecycle from '@hocs/with-lifecycle';
import * as Actions from './actions'
import AddNewPizza from './components/add-new-pizza'
import OrderItems from './components/order-items'
import PizzaForm from './components/pizza-form'
import { Container, Builder, Cart, Panel } from "./styled";

const Pizzas = () => {
  return(
    <Container>
      <Builder>
        <Panel>
          <AddNewPizza />
          <PizzaForm />
        </Panel>
      </Builder>
      <Cart>
        <OrderItems />
      </Cart>
    </Container>
  )
}

  // With LifeCycle {{{
const with_lifecycle = withLifecycle({
  onWillMount({fetching, pizzaSizes, dispatch}){
    // Static pizzaSizes from json is placed in the redux store 
    //if(pizzaSizes.length===0 && !fetching) dispatch(Actions.getPizzaSizes());
  }
});
  //}}}

const enhance = compose(
  connect(state => ({ 
    pizzaSizes: state.pizzas.pizzaSizes
  })),
  with_lifecycle
);

export default enhance(Pizzas)
