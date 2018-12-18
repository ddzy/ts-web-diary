import { combineReducers } from 'redux';

import { LoginReducer } from '../pages/login/Login.redux';
import { RegisterReducer } from '../pages/register/Register.redux';
import { HomeReducer } from '../pages/home/Home.redux';
import { AuthRouteReducer } from '../components/authroute/AuthRoute.redux';
import { PublishReducer } from '../pages/publish/Publish.redux';
import { MeReducer } from '../pages/me/Me.redux';
import { EditReducer } from '../pages/edit/Edit.redux';


const reducers = combineReducers({
  LoginReducer,
  RegisterReducer,
  HomeReducer,
  AuthRouteReducer,
  PublishReducer,
  MeReducer,
  EditReducer,
});


export default reducers;