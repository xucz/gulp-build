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
            console.log('this is body')
        }
    });
});