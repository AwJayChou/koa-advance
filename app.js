const koa = require("./lib/koa-demo");
const Router = require('./middlewares/Router');
const router = new Router();
const app = new koa();

function sleep() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });
}

app.use(require('./middlewares/static')());
app.use(require('./middlewares/logger'));
// 黑名单测试的127.0.0.1
// app.use(require('./middlewares/blacklist'));

// app.use(async (ctx, next) => {
//   ctx.body = "1";
//   await sleep();
//   await next();
//   ctx.body += "2";
// });
// app.use(async (ctx, next) => {
//   ctx.body += "3";
//   await next();
//   ctx.body += "4";
// });
// app.use(async (ctx, next) => {
//   ctx.body += "5";
// });

app.use(async (ctx, next) => {
  ctx.body = 'docker ci test'
  await next()
})
app.use(router.routes())
// 设置host参数，表名ipv4
app.listen(3200, '0.0.0.0', () => {
  console.log(' server is running on '+ 3200)
});
