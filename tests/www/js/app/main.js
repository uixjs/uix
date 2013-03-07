define(function (require) {
    window.mocha.setup('bdd');
    window.expect = window.chai.expect;
    require('spec/test1')();
    require('spec/test-node')();
    require('spec/test-widget')();
    window.mocha.run();
});