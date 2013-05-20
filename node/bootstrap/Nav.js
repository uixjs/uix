define(function(require) {
    var uix = require('uix/main');
    var Component = require('./Component');
    var utils = require('./utils');

    var $ = uix.$;

    return Component.extend({

        ATTR_active: {
            change: '_uiSet_stacked',
            value: false
        },

        ATTR_type: {
            change: '_uiSet_type',
            validate: '_validate_type',
            value: "DEFAULT",
            lookups: {
                "TABS": "nav-tabs",
                "PILLS": "nav-pills",
                "LIST": "nav-list",
                "DEFAULT": false
            }
        },

        _createDom: function() {
            var root = $('<ul class="nav">');

            return {
                root: root,
                children: root
            };
        },

        _uiSet_stacked: function(name, stacked) {
            if (stacked) {
                this._dom.root.addClass('stacked');
            } else {
                this._dom.root.removeClass('stacked');
            }
        },

        _validate_type: function(name, value) {
            var lookups = this._getAttributeDescription('type').lookups;
            utils.validateClassAttribute(lookups, name, value);
        },

        _uiSet_type: function(name, value) {
            var lookups = this._getAttributeDescription('type').lookups;
            utils.setClassAttribute(lookups, this._dom.root, name, value);
        }


    });
});