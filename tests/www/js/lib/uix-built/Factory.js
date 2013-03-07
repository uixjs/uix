define(function(require) {
    var Boop = require('boop');
    var Node = require('./Node');
    var Widget = require('./Widget');

    return Boop.extend({

        initialize : function() {
            this._typeMap = {};
        },

        addType: function(type, klass) {
            this._typeMap[type] = klass;
        },

        addTypes: function(types) {
            for(var type in types) {
                this.addType(type, types[type]);
            }
        },

        _getClass: function(type) {
            if(this._typeMap.hasOwnProperty(type)) {
                var klass = this._typeMap[type];
                return klass;
            }
            return null;
        },

        create: function(desc, nodeCallback) {
            var type = desc[0];
            var attrs = desc[1];
            var children = desc[2] || [];
            var klass = this._getClass(type);
            var isBaseNode = false;
            if(!klass) {
                klass = Node;
                isBaseNode = true;
            }
            var childNodes = [];
            var result;
            for(var i = 0; i < children.length; i++) {
                childNodes.push(this.create(children[i], nodeCallback));
            }
            if(klass.prototype.IS_WIDGET) {
                result = new klass(attrs);
            } else {
                result = new klass(attrs, childNodes);
                if(isBaseNode) {
                    //Node takes first part of description node as 'tag' attribute.
                    result.set('tag', type);
                }
            }
            if(nodeCallback) {
                nodeCallback(result);
            }
            return result;
        }
    });
});