define(function(require) {

    var uix = require('uix/main');
    var Model = require('./Model');

    var $ = uix.$;


    var Node = Model.extend({

        initialize : function (attrs, children) {
            Model.prototype.initialize.call(this); //super
            this.set('id', uix.createUid(), {silent:true});
            // this.attrs = attrs || {};
            this.children = children || [];
            this.setAttributes(attrs, {silent:true});
        },

        ATTR_id : {
            change : '_uiSet_id',
            validate : '_validate_id'
        },

        ATTR_name : {},

        ATTR_tag : {
            change : '_uiSet_tag'
        },

        ATTR_text : {
            change : '_uiSet_text'
        },

        ATTR_html : {
            change : '_uiSet_html'
        },

        ATTR_color : {
            change : '_uiSet_color'
        },

        ATTR_NS_css : {
            change : '_uiSet_css'
        },

        ATTR_NS_attr : {
            change : '_uiSet_attr'
        },

        render: function() {
            var dom = this._dom = this._createDom();
            //Rendering children nodes.
            this._renderChildren();
            //Calling `_change` in order to reflect current attributes' values to UI.
            this._change(null, {internal:true});
            if('function' === typeof this._bindEvents) {
                this._bindEvents();
            }
            return dom.root;
        },

        _renderChildren : function () {
            var childrenContainer = this._dom.children;
            if(!childrenContainer) {
                return;
            }
            for(var i = 0; i < this.children.length; i++) {
                childrenContainer.append(this.children[i].render());
            }
        },

        _createDom : function () {
            var root = $(document.createElement(this.get('tag').toUpperCase()));
            return {
                root : root,
                children : root
            };
        },

        _validate_id: function(name, value) {
            if(this.get('id')) {
                throw new Error('Node._validate_id');
            }
        },

        _uiSet_id: function(name, value) {
            this._dom.root.attr('data-uix-id', value);
        },

        _uiSet_tag: function(name, value) {
            this._tag = value;
        },

        _uiSet_text: function(name, value) {
            this._dom.root.text(value);
        },

        _uiSet_html: function(name, value) {
            this._dom.root.html(value);
        },

        _uiSet_color: function(name, value) {
            this._dom.root.css('color', value);
        },

        _uiSet_css: function(name, value) {
            var className = name.replace(/^css./, '');
            if(value) {
                this._dom.root.addClass(className);
            } else {
                this._dom.root.removeClass(className);
            }
        },

        _uiSet_attr: function(name, value) {
            var attrName = name.replace(/^attr./, '');
            this._dom.root.attr(attrName, value);
        }

    });

    return Node;
});