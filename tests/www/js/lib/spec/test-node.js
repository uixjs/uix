/*global it:true, describe:true, expect:true*/
define(function(require) {
    var Node = require('uix/Node');
    return function() {
        describe('node: base', function () {
            it('should generate HTML node', function () {
                var n = new Node({tag:'span'});
                var dom = n.render();
                expect(dom.is('span')).to.be.true;
            });
            it('should set text', function () {
                var n = new Node({
                    tag:'span',
                    text: 'hello'
                });
                var dom = n.render();
                expect(dom.text()).to.equal('hello');
            });
            it('should set html', function () {
                var n = new Node({
                    tag:'span',
                    html: '<b>hello</b>'
                });
                var dom = n.render();
                expect(dom.html()).to.equal('<b>hello</b>');
            });
        });
    };
});