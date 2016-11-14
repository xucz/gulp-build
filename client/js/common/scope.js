/**
 * Created by xuchaozheng on 2016/11/11.
 */
define(function () {
    var Scope = function (object) {
        $.extend(Scope.prototype,object);
        this._init();
    };
    Scope.prototype._init = function () {
        var self = this;
        var events = self.events;
        if(events) {
            for(var key in events) {
                var handler = events[key];
                var e = key.split(' ')[0];
                var ele = key.split(' ')[1];
                (function(handler){
                    $(self.el).on(e, ele, function (e) {
                        self[handler].call(self, e)
                    });
                })(handler);
            }
        }
        self.init && self.init.call(self);
    };
    return Scope
});