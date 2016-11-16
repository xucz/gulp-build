/**
 * Created by xuchaozheng on 2016/11/10.
 */
require(["/js/page/demo.js","jquery","/js/common/scope.js"], function (d,$,Scope) {
    new Scope({
        el:'body',
        events: {
            'click .aa':'clickMe'
        },
        clickMe: function (e) {
            console.log(e)
        },
        init: function () {
            console.log('this is bodyddd');
            var socket = new WebSocket('ws://localhost:3000/');
            socket.onopen = function (event) {
                // send a message to the server
                socket.send('Hello server!');
            };

            socket.onmessage = function (event) {
                // print message from server
                console.log(event.data);

            };
        }
    });
});