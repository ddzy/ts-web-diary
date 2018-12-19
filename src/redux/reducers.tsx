import { combineReducers } from 'redux';

import { HomeReducer } from '../pages/home/Home.redux';
import { AuthRouteReducer } from '../components/authroute/AuthRoute.redux';


const reducers = combineReducers({
  HomeReducer,
  AuthRouteReducer,
});


export default reducers;