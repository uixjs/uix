define(function(require) {
    var uix = require('uix/main');
    var IconButton = require('./IconButton');
    // var utils = require('./utils');

    var $ = uix.$;

    return IconButton.extend({
        // initialize : function (attrs, children) {
        //     IconButton.prototype.initialize.apply(this, arguments); //super
        // },
        // 
        ATTR_open : {
            change : '_uiSet_open',
            value : false
        },

        _createDom: function() {
            var dom = IconButton.prototype._createDom.call(this);
            var button = dom.root;
            dom.button = button;
            var group = $('<div class="btn-group">');
            group.append(button);

            var dropdown = $('<ul class="dropdown-menu">');
            group.append(dropdown);

            dom.children = dropdown;

            dom.root = group;
            return dom;
        },

        _bindEvents: function() {
            // IconButton.prototype._bindEvents.call(this);
            this._dom.button.on('click', this._onButtonClick.bind(this));
        },

        _uiSet_open: function (name, open) {
            if(open) {
                this._dom.button.addClass('active');
            } else {
                this._dom.button.removeClass('active');
            }
            this.set('css.open', open);
        },

        _onButtonClick: function () {
            this.set('open', !this.get('open'));
        }
    });

});