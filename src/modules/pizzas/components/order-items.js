import React from "react"
import { compose } from 'recompose'
import {connect} from 'react-redux'
import styled from "styled-components";
import { Panel, Section } from '../styled'
import * as Selectors from '../selectors'
import * as Actions from '../actions'
import PizzaItem from './pizza-item'

const OrderItems = ({cart, items, pizzaPrices, dispatch}) => {
  const no_items = cart.length === 0
  const add_new_pizza = () => dispatch(Actions.addNewPizza())
  const total = Object.keys(pizzaPrices).reduce((total_prices, pizza_id) => {
    total_prices = total_prices + pizzaPrices[pizza_id].total
    return total_prices;
  },0)
  const rounded_total = Math.round(total * 100) / 100
  return(
    <Panel>
      <Section>
        <h3>Order Items</h3>
        { no_items 
        ? (<NoItems>No pizzas are ordered yet. <span role="button" onClick={ add_new_pizza } aria-label="Add a pizza">Add a pizza</span>.</NoItems> )
        : cart.map( (id) => <PizzaItem key={`order-item-${ id }`} pizza={ items[id] }/>)
        }
        { !no_items && <Total>Total ${ rounded_total }</Total> }
      </Section>
    </Panel>
  )
}

export const Total = styled.div`
  margin:10px 0px;
  display:flex;
  justify-content:flex-end;
  text-align:right;
`;

export const NoItems = styled.div`
  align-self:center;
  margin:30px 0px 0px 0px;
  font:400 14px Roboto;
  span {
    color:darkcyan;
    cursor:pointer;
  }
`;

const enhance = compose(
  connect(state => ({ 
    pizzaSizes: Selectors.pizzaSizes(state),
    pizzaPrices: Selectors.pizzaPrices(state),
    cart: state.pizzas.cart,
    items: state.pizzas.items,
  })),
  // withState('selectableGroupRef', 'setSelectableGroupRef', null),
  //with_lifecycle
);

export default enhance(OrderItems)
