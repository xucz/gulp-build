/**
 * Created by xuchaozheng on 2016/11/10.
 */
require(["/js/page/demo.js","jquery","/js/common/scope.js"], function (d,$,Scope) {
    new Scope({
        el:'body',
        events: {
            'click .main':'clickMe'
        },
        clickMe: function (e) {
            alert('click logo');
        },
        init: function () {
            console.log('this is init');
        }
    });
});