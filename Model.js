define(function(require) {

    var Boop = require('boop');
    var EventEmitter = require('EventEmitter');
    var $ = require('zepto'); //TODO: required only for extend(). Remove it.

    return Boop.extend({
        initialize : function () {
            this._attrs = {};
            this.event = new EventEmitter();
            this._bufferedChanges = {};
            this._setDefaultAttributes();
        },

        trigger : function (eventName, args) {
            args = args || [];
            var _args = [];
            // _args.push(eventName);
            _args.push(this);
            this.event.trigger.call(this.event, eventName, _args.concat(args));
        },

        _change : function (attr, options) {
            options = options || {};
            if(!attr) {
                for(var attrName in this._bufferedChanges) {
                    var attrDesc = this._getAttributeDescription(attrName);
                    if(attrDesc) {
                        this._change(attrName, options);
                    }
                }
                return;
            }
            var desc = this._getAttributeDescription(attr);
            var val = this._attrs[attr];
            if(desc.change) {
                this[desc.change](attr, val);
            }
            if(!options.internal) {
                this.trigger('change_' + attr, val);
            }
            delete this._bufferedChanges[attr];
        },

        _setDefaultAttributes: function() {
            var attrs = this._getAttributeDescriptions();
            for(var attrName in attrs) {
                var desc = attrs[attrName];
                if('value' in desc) {
                    this.set(attrName, desc.value, {silent:true});
                }
            }
        },

        _getAttributeDescriptions: function() {
            var output = {};
            for(var propName in this) {
                if(0 === propName.indexOf('ATTR_')) {
                    var attr = propName.replace(/^ATTR_/, '');
                    output[attr] = this._getAttributeDescription(attr);
                }
            }
            return output;
        },

        _getAttributeDescription: function(attr) {
            var descName = 'ATTR_' + attr;
            var ns = this._getAttributeNamespace(attr);
            var attrDesc = this[descName];
            if(ns) {
                var nsDesc = this._getAttributeNamespaceDescription(ns);
                return $.extend({}, nsDesc, attrDesc);
            } else {
                return attrDesc;
            }
        },

        _getAttributeNamespaceDescription: function(ns) {
            return this['ATTR_NS_' + ns];
        },

        _getAttributeNamespace: function (attr) {
            if(-1 !== attr.indexOf('.')) {
                return attr.split('.')[0];
            }
            return null;
        },

        _validateAttribute : function (attr, val) {
            var desc = this._getAttributeDescription(attr);
            if(desc && desc.validate) {
                if('function' === typeof this[desc.validate]) {
                    this[desc.validate](attr, val);
                }
            }
        },

        set: function(attr, val, options) {
            options = options || {};
            var desc = this._getAttributeDescription(attr);
            if(!desc) {
                throw new Error('Model.set: no such attribute ' + attr);
            }
            this._validateAttribute(attr, val);
            if(this._attrs[attr] !== val) {
                this._bufferedChanges[attr] = val;
                this._attrs[attr] = val;
                if(!options.silent) {
                    this._change(attr);
                }
            }
        },

        setAttributes: function(attributes, options) {
            options = options || {};
            // _options = $.extend({}, options, {silent:true});

            for(var attrName in attributes) {
                if(!attributes.hasOwnProperty(attrName)) {
                    continue;
                }
                var attrValue = attributes[attrName];
                this.set(attrName, attrValue, options);
            }
            if(!options.silent) {
                this._change(null, options);
            }
        },

        get: function(attr) {
            var desc = this._getAttributeDescription(attr);
            if(!desc) {
                throw new Error('Model.set: no such attribute ' + attr);
            }
            return this._attrs[attr];
        }

    });

});