/*global it:true, describe:true, expect:true*/
define(function(require) {
    return function() {
        describe('model: base', function() {
            var Model = require('uix/Model');
            var MyModel = Model.extend({
                ATTR_foo: {}
            });
            var m = new MyModel();
            it('should set allowed attribute', function() {
                m.set('foo', 'bar');
                expect(m.get('foo')).to.equal('bar');
            });
            it('should throw error when trying to set non-allowed attribute', function() {
                expect(function() {
                    m.set('asd');
                }).to.Throw(Error);
            });
        });

        describe('model: events', function() {
            var Model = require('uix/Model');
            var MyModel = Model.extend({
                ATTR_foo: {},
                ATTR_bar: {
                    change: 'onBarChange'
                }
            });

            it('should call "change_{ATTRNAME}" event when an attr ATTRNAME changes', function(done) {
                var m = new MyModel();
                m.event.on('change_foo', function() {
                    done();
                });
                m.set('foo', '123');
            });


            it('should call callback function in ATTR_{ATTRNAME}.change property when an attr ATTRNAME changes', function(done) {
                var m = new MyModel();
                m.onBarChange = function(attrName, attrVal) {
                    expect(attrName).to.equal('bar');
                    expect(attrVal).to.equal('123');
                    done();
                };
                m.set('bar', '123');
            });


            it('should neither call change handler, nor trigger event when options have silent:true', function(done) {
                var m = new MyModel();
                var handlerCalled = false;
                var eventTriggered = false;
                m.onBarChange = function(attrName, attrVal) {
                    expect(attrName).to.equal('bar');
                    expect(attrVal).to.equal('123');
                    handlerCalled = true;
                };
                m.event.on('change_bar', function () {
                    eventTriggered = true;
                });
                m.set('bar', '123', {silent:true});

                setTimeout(function () {
                    expect(handlerCalled).to.equal(false);
                    expect(eventTriggered).to.equal(false);
                    done();
                }, 10);
            });

            it('should call change handler (from _change() method), but not trigger event when options have internal:true', function(done) {
                var m = new MyModel();
                var handlerCalled = false;
                var eventTriggered = false;
                m.onBarChange = function(attrName) {
                    expect(attrName).to.equal('bar');
                    handlerCalled = true;
                };
                m.event.on('change_bar', function () {
                    eventTriggered = true;
                });
                m._change('bar', {internal:true});

                setTimeout(function () {
                    expect(handlerCalled).to.equal(true);
                    expect(eventTriggered).to.equal(false);
                    done();
                }, 10);
            });

        });
    };
});