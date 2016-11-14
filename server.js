/**
 * Created by xuchaozheng on 2016/11/10.
 */
var koa = require('koa');
var app = new koa();

app.use(require('koa-static')('public'));
app.listen(3333, function(){
   console.log('server started')
});