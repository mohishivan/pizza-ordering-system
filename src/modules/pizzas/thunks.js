import { toast } from 'react-toastify';
import getGraph from '../../utils/getGraph'
import * as Queries from './queries'
import * as ActionsTypes from './actions-types'
import * as Actions from './actions'

//{{{ getPizzaSizes
export const getPizzaSizes = () => {
  return (dispatch) => {
    dispatch(Actions.getPizzaSizesAttempt())
    return getGraph({
      query: Queries.PizzaSizesQuery,
      operationName: null,
      variables: null
    })
    .then(
      res => res.json(),
      error => toast.error(JSON.stringify(error))
    )
    .then(res => {
      if(res && res.data){
        return dispatch(Actions.getPizzaSizesSuccess({ pizzaSizes: res.data.pizzaSizes }));
      }else{
        toast.error("Error: fetching pizza sizes")
        console.log("Error: fetching pizza sizes", res)
      }
      return dispatch(Actions.getPizzaSizesFailure());
    })
  };
};
//}}}

