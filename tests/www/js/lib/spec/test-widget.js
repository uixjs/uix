/*global it:true, describe:true, expect:true*/
define(function(require) {
    var TestWidget = require('uix/json!./test-widget.uix');

    return function() {
        describe('widget: smoke', function () {
            it('should work', function () {
                var w = new TestWidget();
                var dom = w.render();
                expect(dom.find('button.btn.span2')).to.have.length(1);
            });
            it('should find children by name', function () {
                var w = new TestWidget();
                var btn = w.byName('my_button');
                expect(btn.get('text')).to.equal('Hello');
            });
        });
    };
});