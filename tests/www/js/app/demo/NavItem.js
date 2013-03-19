define(function(require) {
    var BaseClass =require('uix/json!./NavItem.uix');
    return BaseClass.extend({
        ATTR_caption : {
            change : '_uiSet_caption'
        },

        ATTR_active : {
            change : '_uiSet_active'
        },

        ATTR_href : {
            change : '_uiSet_href'
        },

        render : function () {
            return BaseClass.prototype.render.call(this);
        },

        _uiSet_caption : function (name, value) {
            this.byName('caption').set('text', value);
        },

        _uiSet_active : function (name, value) {
            this.byName('caption').set('css.active', value);
        },

        _uiSet_href : function (name, value) {
            this.byName('caption').set('attr.href', value);
        }
    });
});