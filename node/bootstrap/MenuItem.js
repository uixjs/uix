define(function(require) {
    var uix = require('uix/main');
    var Component = require('./Component');

    var $ = uix.$;

    return Component.extend({

        ATTR_text: {
            change: '_uiSet_text',
            value: false
        },

        ATTR_active: {
            change: '_uiSet_active',
            value: false
        },

        ATTR_disabled: {
            change: '_uiSet_disabled',
            value: false
        },

        _createDom: function() {
            var root = $('<li>');
            var link = $('<a>');
            link.appendTo(root);

            return {
                root: root,
                children: null,
                link: link
            };
        },

        _uiSet_text: function(name, text) {
            this._dom.link.text(''+text);
        },

        _uiSet_active: function (name, active) {
            if(active) {
                this._dom.root.addClass('active');
            } else {
                this._dom.root.removeClass('active');
            }
        },

        _uiSet_disabled: function (name, disabled) {
            if(disabled) {
                this._dom.root.addClass('disabled');
            } else {
                this._dom.root.removeClass('disabled');
            }
        }

    });
});