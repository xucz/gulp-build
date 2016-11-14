/**
 * Created by xuchaozheng on 2016/11/11.
 */
document.write('<script src="/lib/require.js"></script>');
document.write('<script>require('+setConfig()+')</script>');
function setConfig(){
    var config = {
         baseUrl:"/lib/",
        paths:{
            "jquery": "jquery"
        },
        //      shim: {
        //    'underscore':{
        // 	exports: '_'
        // },
        //    'backbone':{
        //        deps: ['underscore', 'jquery'],
        // 	exports: 'Backbone'
        // }
        //      }
    };
    return JSON.stringify(config);
}