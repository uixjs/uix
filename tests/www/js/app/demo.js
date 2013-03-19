define(function(require) {
    require('css!bootstrap/css/bootstrap.css');
    require('css!bootstrap/css/bootstrap-responsive.css');

    var DemoWidget = require('uix/json!./demo.uix');
    var w = new DemoWidget();
    w.render().appendTo('body');
});