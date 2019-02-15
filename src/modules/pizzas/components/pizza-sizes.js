import React from "react"
import { compose } from 'recompose'
import {connect} from 'react-redux'
import * as Actions from '../actions'
import * as Selectors from '../selectors'
import {capitalize} from '../../../utils/capitalize'
import { Section } from '../styled'

const PizzaSizes = ({sizesNames, current_pizza, dispatch}) => {
  if(!current_pizza) return null;
  const setSize = (pizzaSize) => () => dispatch(Actions.updatePizzaSize({pizzaSize})) 
  return(
    <Section>
      <h3>
        Choose Pizza Size
      </h3>
      <ul>
        { sizesNames && sizesNames.map((size, index) => {
          const selected = current_pizza.pizzaSize === size 
          const OnOff =  selected ? 'on' : 'off'
          const label_id = `pizza-size-label-${ index }`
          const checkbox_id = `pizza-topping-checkbox-${ index + 3 }`
          return(
            <li 
              key={`pizza-${size}`}
              className={ OnOff }
              onClick={ setSize(size) }
              onKeyPress={ setSize(size) }
              role="checkbox"
              tabIndex={ index + 1}
              aria-checked={ selected }
              aria-label={ `${size} size pizza` }
            >
              <label id={ label_id } htmlFor={ checkbox_id }>{ capitalize(size) }</label>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}


const enhance = compose(
  connect(state => ({ 
    pizzaSizes: Selectors.pizzaSizes(state),
    sizesNames: Selectors.sizesNames(state),
    current_pizza: state.pizzas.current_pizza,
  })),
  // withState('selectableGroupRef', 'setSelectableGroupRef', null),
  // with_lifecycle
);

export default enhance(PizzaSizes)
