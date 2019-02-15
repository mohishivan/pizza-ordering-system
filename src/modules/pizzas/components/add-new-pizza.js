import React from "react"
import {connect} from 'react-redux'
import * as Actions from '../actions'
import {Button} from '../styled'

const AddNewPizza = ({current_pizza, dispatch}) => {
  if(current_pizza) return null;
  const add_new_pizza = () => dispatch(Actions.addNewPizza())
  return(
    <Button 
      tabIndex="1" 
      onClick={ add_new_pizza }
      onKeyPress={ add_new_pizza }
      aria-label="add pizza"
    >
      Add Pizza
    </Button>
  )
}

export default connect(state => ({
  current_pizza: state.pizzas.current_pizza
}))(AddNewPizza)
