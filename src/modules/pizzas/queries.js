export const PizzaSizesQuery = `
{ 
  pizzaSizes {
    name
    maxToppings
    basePrice
    toppings {
      topping {
        name
        price
      }
      defaultSelected
    }
  }
}
`
