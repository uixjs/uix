define(function(require) {
    require('css!bootstrap/css/bootstrap.css');
    require('css!bootstrap/css/bootstrap-responsive.css');

    var DemoWidget = require('uix/json!./demo.uix');
    var Path = require('path');

    var demo = new DemoWidget();
    demo.render().appendTo('body');

    function loadPage(p) {
        require(['./demo/page/'+p], function (Page) {
            var panel = demo.byName('panel');
            panel.clearChildren();
            panel.appendChild(new Page());
        });
    }

    Path.map('#button').to(loadPage.bind(null, 'button'));
    Path.map('#text').to(loadPage.bind(null, 'text'));

    Path.listen();
});