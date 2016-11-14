/**
 * Created by xuchaozheng on 2016/11/11.
 */
define(function () {
    function parser(str){
        var fnString = "var p=[];with(obj||{}){p.push('" +
            str.replace(/[\r\t\n]/g, " ")
                .split("<%")
                .join("\t")
                //.replace(eval("/((^|%>)[^\\t]*)'/g"), "$1\r")
                .replace(/\t=(.*?)%>/g, "',$1,'")
                .split("\t")
                .join("');")
                .split("%>")
                .join("p.push('")
                //.split("\r")
                //.join("\\'")
            + "');}return p.join('');";
        var fn = new Function('obj', fnString);
        return fn;
    }
    return parser;
});