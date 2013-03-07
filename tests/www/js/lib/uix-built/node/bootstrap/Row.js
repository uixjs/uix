define(function(require) {
    var uix = require('uix/main');
    var Component = require('./Component');

    var $ = uix.$;

    return Component.extend({
        ATTR_fluid : {
            change : '_uiSet_fluid',
            value : false
        },
        _createDom: function() {
            var root = $('<div class="row">');
            return {
                root: root,
                children: root
            };
        },
        _uiSet_fluid : function (name, value) {
            var root = this._dom.root;
            if(value) {
                root.removeClass('row');
                root.addClass('row-fluid');
            } else {
                root.removeClass('row-fluid');
                root.addClass('row');
            }
        }
    });

});