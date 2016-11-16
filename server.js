/**
 * Created by xuchaozheng on 2016/11/10.
 */
'use strict';
var koa = require('koa'),
    route = require('koa-route'),
    websockify = require('koa-websocket');
var app = websockify(koa());
app.use(require('koa-static')('public'));
/**
 * We define a route handler for when a new connection is made.
 * The endpoint can be anything you want the client to connect to.
 * If our WebSocket server address is `ws://localhost:3000` and our route is `/`,
 * this will handle any new WebSocket connections to `ws://localhost:3000/`.
 * If our route was `/test`, the handler would fire only when
 * a connection was made to `ws://localhost:3000/test`.
 */
app.use(route.all('/', function* () {
    console.log(222)
}))
app.ws.use(route.all('/', function* (next) {
    /**
     *`this` refers to the context in the `app.ws` instance, not `app`. `app` and `app.ws` use separate middleware/contexts.
     * to access a middleware's context here, you must pass the middleware to `app.ws.use()`.
     */
    //this.websocket.on('connection', function () {
    //    console.log('connection')
    //});
        // the websocket is added to the context as `this.websocket`.
    var self = this;
    this.websocket.on('message', function(message) {
        // print message from the client
        console.log(message);
        // send a message to our client
        self.websocket.send('Hello Client! --- ' + message);
    });



    // yielding `next` will pass the context (this) on to the next ws middleware
    yield next;
}));

app.listen(3000);