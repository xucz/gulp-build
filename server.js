/**
 * Created by xuchaozheng on 2016/11/10.
 */
'use strict';
var koa = require('koa'),
    config = require('./config/config'),
    app = new koa();
app.use(require('koa-static')('public'));

app.listen(config.port);