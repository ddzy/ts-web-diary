import * as Router from 'koa-router';

const homeController: Router = new Router();


homeController.get('/', async (ctx) => {
  ctx.body = {};
});


export default homeController;