import { createSelector } from 'reselect'

const getPizzaSizes = (state) => state && state.pizzas && state.pizzas.pizzaSizes 
const getCurrentPizza = (state) => state && state.pizzas && state.pizzas.current_pizza 
const getCartItems = (state) => state && state.pizzas && state.pizzas.items 

//{{{ sizesNames
export const sizesNames = createSelector(
  [getPizzaSizes],
  (pizzaSizes) => pizzaSizes ? pizzaSizes.map(i => i.name) : null
) 
//}}}
//{{{currentPizza
export const currentPizza = createSelector(
  [getCurrentPizza],
  (currentPizza) => currentPizza
) 
//}}}
//{{{ pizzaSizes
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
//}}}
//{{{ sizeToppings
export const sizeToppings = createSelector(
  [pizzaSizes, currentPizza],
  (pizzaSizes, currentPizza) => {
    if(!pizzaSizes ||
       !currentPizza || 
       !currentPizza.pizzaSize ||
       !pizzaSizes[currentPizza.pizzaSize]
      ) return null;
    return pizzaSizes[currentPizza.pizzaSize].toppings
  }
)
//}}}
//{{{ sizeDefaultToppings
export const sizeDefaultToppings = createSelector(
  [sizeToppings],
  (toppings) => {
    const defaultToppings =  toppings.filter(({defaultSelected}) => defaultSelected ).map(({topping}) => topping.name)
    return defaultToppings 
  }
)
//}}}
//{{{ pizzaPrice
export const pizzaPrices = createSelector(
  [pizzaSizes, getCartItems],
  (sizes, items) => {
    const _pizzaPrices = Object.keys(items).reduce((prices, pizza_id) => {
      const pizza = items[pizza_id]
      const size  = sizes[pizza.pizzaSize]

      const total = size.toppings.reduce((total, {topping}) => {
        const { price } = topping
        if(pizza.toppings.includes(topping.name)) total = total + price;
        return total
      }, size.basePrice)

      const topping_prices = size && size.toppings.reduce((acc, {topping}) => {
        acc[topping.name] = topping.price;
        return acc
      }, {})
      
      prices[pizza_id] = { total, topping_prices}
      return prices;
    },{})
    return _pizzaPrices;
  }
)
//}}}
