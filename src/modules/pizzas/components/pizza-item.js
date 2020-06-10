import React from "react"
import { compose, withHandlers, withState } from 'recompose'
import {connect} from 'react-redux'
import styled from "styled-components";
import * as Selectors from '../selectors'
import * as Actions from '../actions'
import {FaCaretRight, FaCaretDown} from 'react-icons/fa'
import {capitalize} from '../../../utils/capitalize'

const PizzaItem = ({pizza, pizzaPrices, pizzaSizes, details, toggle, dispatch}) => {
  const toppings = pizza.toppings.join(", ")
  const pizzaSize = pizzaSizes[pizza.pizzaSize]
  const { total, topping_prices } = pizzaPrices[pizza.id]
  const rounded_total = Math.round(total * 100) / 100
  const ToggleIcon = details ? FaCaretDown : FaCaretRight
  return(
    <OrderItem>
      <div className="items">
        <h4  onClick={ toggle }>
          <div>
            <ToggleIcon />
            <span>{capitalize(pizza.pizzaSize)} Pizza</span>
          </div>
          <span className="price">
            ${ rounded_total }
          </span>
        </h4>
        { !details && (<p>{toppings}.</p>) }
        {details && (
          <div className="details">
            <div>
              <span>{pizza.pizzaSize} pizza base </span>
              <span>${ pizzaSize.basePrice }</span>
            </div>
            { pizza.toppings.map(t => {
              return(
                <div key={`topping-${t}`}>
                  <span>{ t }</span>
                  <span>${ topping_prices[t] }</span>
                </div>
              )
            } )}
          </div>
        )}
        <Buttons>
          <a href="#change" aria-label="change pizza" onClick={ () => dispatch(Actions.editPizza({id: pizza.id}))} className="change">change</a>
          <a href="#delete" aria-label="delete pizza from cart" onClick={ () => dispatch(Actions.deletePizza({id: pizza.id}))} className="delete">delete</a>
        </Buttons>
      </div>
    </OrderItem>
  )
}
//{{{ Buttons
export const Buttons = styled.div`
  position:absolute;
  bottom:0px;
  right:0px;
  justify-content:flex-end;
  a {
    margin:0px 0px 0px 10px;
    color:#666;
    cursor:pointer;
    font:400 13px Roboto;
    text-decoration:none;
    padding:2px 5px;
    &.delete {
      &:hover{
        background-color:red;
        color:#fff;
      }
      color:red;
    }
    &.change {
      color:darkcyan;
      &:hover{
        background-color:darkcyan;
        color:#fff;
      }
    }
  }
  `;
  //}}}
//{{{ OrderItem
export const OrderItem = styled.div`
  background-color:white;
  user-select: none;
  padding:10px 0px 18px 10px;
  text-align:left;
  border-bottom:1px dotted #ddd;
  position:relative;
  &:hover ${Buttons}{
    display:flex;
  }
  h4 { 
    cursor:pointer;
    font:400 18px Roboto; 
    user-select: none;
    padding:0px;
    margin:0px;
    color:#000;
    position:relative;
    display:flex;
    justify-content:space-between;
    .price {
      font:400 16px Roboto; 
    }
    div {
      display:flex;
      align-items:center;
    }
    svg {
      margin-left:-3px;
    }
  }
  .details {
    padding:0px 0px 10px 15px;
    div {
      color:#666;
      font:400 14px Roboto;
      display:flex;
      justify-content:space-between;
    }
  }
  p { 
    font:400 14px Roboto; 
    color:#666;
    padding:0px 0px 0px 15px;
    margin:0px;
    p {
      a {
        svg {
          margin-top:3px;
        }
      }
    }
  }
`;
//}}}
const enhance = compose(
  connect(state => ({ 
    pizzaSizes: Selectors.pizzaSizes(state),
    pizzaPrices: Selectors.pizzaPrices(state),
  })),
  withState('details', 'toggle', true),
  withHandlers({
    show: ({ toggle }) => (e) => toggle(true),
    hide: ({ toggle }) => (e) => toggle(false),
    toggle: ({ toggle }) => (e) => toggle((current) => !current)
  })
);

export default enhance(PizzaItem)
