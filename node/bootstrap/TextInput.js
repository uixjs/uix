define(function(require) {
    var uix = require('uix/main');
    var Component = require('./Component');
    var utils = require('./utils');

    var $ = uix.$;

    return Component.extend({

        ATTR_value : {
            change : '_uiSet_value'
        },

        ATTR_size : {
            validate : '_validate_size',
            change : '_uiSet_size',
            value : 'DEFAULT',
            _toClass : {
                'DEFAULT' : false,
                'MINI' : 'input-mini',
                'SMALL' : 'input-small',
                'MEDIUM' : 'input-medium',
                'LARGE': 'input-large',
                'XLARGE' : 'input-xlarge',
                'XXLARGE' : 'input-xxlarge'
            }
        },

        _createDom: function() {
            var root = $('<input type="text">');
            return {
                root: root,
                children: root
            };
        },

        _bindEvents : function () {
            this._dom.root.on('change', this._onDomChange.bind(this));
            // this._dom.root.on('click', this._onDomClick.bind(this));
        },

        _validate_size : function (name, value) {
            utils.validateClassAttribute(this.ATTR_size._toClass, name, value);
        },

        _uiSet_size : function (name, value) {
            utils.setClassAttribute(this.ATTR_size._toClass,
                this._dom.root, name, value);
        },

        _uiSet_value : function (name, value) {
            this._dom.root.val(value);
        },

        _onDomChange : function () {
            this.set('value', this._dom.root.val());
        }

        // _onDomClick : function () {
        //     this.event.emitEvent('click');
        // },

    });

});