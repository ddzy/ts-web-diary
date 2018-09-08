const koa = require('koa');
const Router = require('koa-router');

const {
  User, 
  Posts, 
  changeId, 
  Comments, 
  Replys,
  Collections,
} = require('../model/model');
const { formatPath } = require('../utils/utils');

const details = new Router();
