import React from "react"
import styled from "styled-components";
import {connect} from 'react-redux'
import withLifecycle from '@hocs/with-lifecycle';
import * as Actions from '../actions'

const AddNewPizza = ({dispatch}) => {
  return(
    <Button onClick={ () => dispatch(Actions.addNewPizza()) }>
      Add Pizza
    </Button>
  )
}

//{{{ Button
export const Button = styled.button`
  font:600 22px Roboto;
  border:1px solid darkcyan;
  border-radius:5px;
`;
//}}}

export default connect()(AddNewPizza)
