'use strict';
MathJax.Hub.Config({
    skipStartupTypeset: true,
    messageStyle: "none",
    "HTML-CSS": {
        showMathMenu: false
    }
});
MathJax.Hub.Configured();
angular.module('physicscalculatorApp', ['physicscalculatorApp.directives', 'ui.bootstrap'])
  .config(function ($routeProvider) {
  });
