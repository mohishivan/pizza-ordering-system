import React from "react"
import { compose, withHandlers, withStateHandlers, withState } from 'recompose'
import styled from "styled-components";
import {connect} from 'react-redux'
import withLifecycle from '@hocs/with-lifecycle';
import * as Selectors from '../selectors'

const PizzaSizes = ({sizesNames}) => {
  return(
    <Container>
      <h3>
        Pizza Sizes
      </h3>
      <ul>
        { sizesNames && sizesNames.map(size => <li>{ size }</li>)}
      </ul>
    </Container>
  )
}

//{{{ Container
export const Container = styled.div`
h3 {
  font:600 22px Roboto;
}
ul {
  margin:0px;
  display:flex;
  flex-flow:row nowrap;
  justify-content:center;
  li {
    border:1px solid #ddd;
    list-style:none;
    margin:10px 10px;
    padding:10px 30px;
  }
}
`;
//}}}

const enhance = compose(
  connect(state => ({ 
    pizzaSizes: Selectors.pizzaSizes(state),
    sizesNames: Selectors.sizesNames(state),
  })),
  // withState('selectableGroupRef', 'setSelectableGroupRef', null),
  // with_lifecycle
);

export default enhance(PizzaSizes)
