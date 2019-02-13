import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import reduxThunk from 'redux-thunk'
import { PizzasReducer } from '../modules/pizzas/reducer'

const middleware = [ reduxThunk ];
if (process.env.NODE_ENV !== 'production') {
    let redux_logger = require('redux-logger').createLogger
    middleware.push(redux_logger());
}

const configureStore = () => {

  const reducers = combineReducers({
    pizzas: PizzasReducer,
  })
  
  const store = createStore(
      reducers,
      {},
      compose(
        applyMiddleware(...middleware)
      )
  )
  return { store }
}

export default configureStore

