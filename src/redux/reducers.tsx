import { combineReducers } from 'redux';

import { LoginReducer } from '../pages/login/Login.redux';
import { RegisterReducer } from '../pages/register/Register.redux';
import { HomeReducer } from '../pages/home/Home.redux';
import { AuthRouteReducer } from '../components/authroute/AuthRoute.redux';
import { PublishReducer } from '../pages/publish/Publish.redux';
import { MeReducer } from '../pages/me/Me.redux';
import { ArticleReducer } from '../pages/article/Article.redux';
import { DetailsReducer } from '../pages/details/Details.redux';
import { EditReducer } from '../pages/edit/Edit.redux';
import { CollectionReducer } from '../pages/collection/Collection.redux';
import { WriteReducer } from '../components/write/Write.redux';


const reducers = combineReducers({
  LoginReducer,
  RegisterReducer,
  HomeReducer,
  AuthRouteReducer,
  PublishReducer,
  MeReducer,
  ArticleReducer,
  DetailsReducer,
  EditReducer,
  CollectionReducer,
  WriteReducer,
});


export default reducers;