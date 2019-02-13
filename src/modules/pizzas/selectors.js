import { createSelector } from 'reselect'

const getPizzaSizes = (state) => state && state.pizzas && state.pizzas.pizzaSizes 

export const sizesNames = createSelector(
  [getPizzaSizes],
  (pizzaSizes) => pizzaSizes ? pizzaSizes.map(i => i.name) : null
) 

export const pizzaSizes = createSelector(
  [getPizzaSizes],
  (pizzaSizes) => {
    if(!pizzaSizes) return null;
    return pizzaSizes.reduce((acc, item) => {
      acc[item.name] = item
      return acc;
    },{})
  }
)
