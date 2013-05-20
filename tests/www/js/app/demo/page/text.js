define(function (require) {
    var BaseClass = require('uix/json!./text.uix');
    return BaseClass.extend({
        _connect : [
            ['text1', 'change_value', 'onText1ValueChange'],
            ['set-value-button', 'click', 'onSetValueButtonClick']
        ],

        onText1ValueChange : function (source, value) {
            this.byName('text1-value-echo').set('text', value);
        },

        onSetValueButtonClick : function (source) {
            this.byName('text1').set('value', 'yarr!');
        }
    });
});