import { combineReducers } from 'redux';

import { LoginReducer } from '../pages/login/Login.redux';
import { RegisterReducer } from '../pages/register/Register.redux';
import { HomeReducer } from '../pages/home/Home.redux';
import { AuthRouteReducer } from '../components/authroute/AuthRoute.redux';


const reducers = combineReducers({
  LoginReducer,
  RegisterReducer,
  HomeReducer,
  AuthRouteReducer,
});


export default reducers;