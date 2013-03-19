define(function(require) {
    var BaseClass =require('uix/json!./NavItem.uix');
    return BaseClass.extend({
        ATTR_caption : {
            change : '_uiSet_caption'
        },
        render : function () {
            return BaseClass.prototype.render.call(this);
        },
        _uiSet_caption : function (name, value) {
            this.byName('caption').set('text', value);
        }
    });
});