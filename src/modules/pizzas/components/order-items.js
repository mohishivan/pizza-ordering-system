import React from "react"
import { compose, withHandlers, withStateHandlers, withState } from 'recompose'
import {connect} from 'react-redux'
import withLifecycle from '@hocs/with-lifecycle';

const OrderItems = () => {
  return(
    <div>Order Items</div>
  )
}

const enhance = compose(
  connect(state => ({ 
    pizzaSizes: state.pizzas.pizzaSizes
  })),
  // withState('selectableGroupRef', 'setSelectableGroupRef', null),
  //with_lifecycle
);

export default enhance(OrderItems)
