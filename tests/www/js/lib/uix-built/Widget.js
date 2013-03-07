define(function(require) {
    var Model = require('./Model');
    var uix = require('uix/main');

    return Model.extend({
        initialize : function (attrs) {
            Model.prototype.initialize.call(this); //super
            attrs = attrs || {};
            this.setAttributes(attrs, {silent:true});
            this.set('id', uix.createUid(), {silent:true});
            this._nodesByName = {};
        },
        ATTR_id : {},
        ATTR_name : {},
        IS_WIDGET : true,
        _connect : [],
        // ATTR_id : {},

        setFactory : function (factory) {
            this._factory = factory;
        },
        build : function() {
            if(this._description) {
                this._processDescription(this._description);
                this._processConnections();
            }
        },
        _processDescription : function (desc) {
            this._node = this._factory.create(desc, this._onNodeCreate.bind(this));
        },
        _processConnection : function (conn) {
            var nodeName = conn[0];
            var eventName = conn[1];
            var handlerName = conn[2];

            this.byName(nodeName).event.on(eventName, this[handlerName].bind(this));
        },
        _processConnections : function () {
            for (var i = 0; i < this._connect.length; i++) {
                this._processConnection(this._connect[i]);
            }
        },
        _onNodeCreate : function (node) {
            // debugger
            var name = node.get('name');
            if(name) {
                if(this._nodesByName[name]) {
                    throw new Error('Widget._onNodeCreate: duplicate name ' + name);
                }
                this._nodesByName[name] = node;
            }
        },

        byName : function (name) {
            return this._nodesByName[name] || false;
        },

        render : function () {
            return this._node.render();
        }
    });
});