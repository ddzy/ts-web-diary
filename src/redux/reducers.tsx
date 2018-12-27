import { combineReducers } from 'redux';

import { AuthRouteReducer } from '../components/authroute/AuthRoute.redux';


const reducers = combineReducers({
  AuthRouteReducer,
});


export default reducers;