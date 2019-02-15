import React from "react"
import { compose } from 'recompose'
import {connect} from 'react-redux'
import  {FiCheckSquare, FiSquare} from 'react-icons/fi'
import * as Selectors from '../selectors'
import * as Actions from '../actions'
import {capitalize} from '../../../utils/capitalize'
import { Section } from '../styled'


const Toppings = ({currentPizza, sizeToppings, sizeDefaultToppings, pizzaSizes, dispatch}) => {
  if(!currentPizza || (currentPizza && !currentPizza.pizzaSize)) return null;

  const toggleTopping = (topping) => currentPizza.toppings.includes(topping) 
    ? () => dispatch(Actions.removeTopping({topping}))
    : () => dispatch(Actions.addTopping({topping}))

  const pizzaSize = pizzaSizes && pizzaSizes[currentPizza.pizzaSize]
  const maxToppings = pizzaSize && pizzaSize.maxToppings 
  const toppingsCounter = currentPizza.pizzaSize !== "large" && (
    <span className="count">
      {currentPizza.toppings.length} / {maxToppings}
    </span>
  );
  return(
    <Section>
      <h3> Add Pizza Toppings { toppingsCounter }</h3>
      <ul>
        { 
          sizeToppings && sizeToppings.map(({topping}, index) => {
            const name = topping && topping.name
            const selected = topping && (topping.defaultSelected || currentPizza.toppings.includes(name))
            const OnOff = selected ? 'on' : 'off'
            const Icon  = selected ? FiCheckSquare : FiSquare
            const label_id = `pizza-topping-label-${ index + 3 }`
            const checkbox_id = `pizza-topping-checkbox-${ index + 3 }`
            return(
              <li
                key={`topping-${name}`}
                id={ checkbox_id }
                className={ OnOff }
                onClick={ toggleTopping(topping.name) }
                onKeyPress={ toggleTopping(topping.name) }
                role="checkbox"
                tabIndex={ index + 3 }
                aria-checked={ selected }
                aria-label={ `add ${name} topping` }
              >
                <Icon/> 
                <label id={ label_id } htmlFor={ checkbox_id }>{ capitalize(name) }</label>
              </li>
            )
          }) 
        }
      </ul>
    </Section>
  )
}

const enhance = compose(
  connect(state => ({ 
    pizzaSizes:   Selectors.pizzaSizes(state),
    currentPizza: Selectors.currentPizza(state),
    sizeToppings: Selectors.sizeToppings(state),
    // sizeDefaultToppings: Selectors.sizeDefaultToppings(state),
  })),
  // withState('selectableGroupRef', 'setSelectableGroupRef', null),
  //with_lifecycle
);

export default enhance(Toppings)
