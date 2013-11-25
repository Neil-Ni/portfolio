angular.module('physicscalculatorApp.directives', [])
.directive("mathjaxBind", function() {
    return {
        restrict: "A",
        controller: ["$scope", "$element", "$attrs", function($scope, $element, $attrs) {
            $scope.$watch($attrs.mathjaxBind, function(value) {
                var $script = angular.element("<script type='math/tex'>")
                    .html(value == undefined ? "" : value);
                $element.html("");
                $element.append($script);
                MathJax.Hub.Queue(["Reprocess", MathJax.Hub, $element[0]]);
            });
        }]
    };
})
.directive('autoComplete', function($rootScope, locationAutoCompleteService, $timeout, $http, programLocationModel) {
    return {
        restrict: 'A',
        scope: {
            serviceType: '@serviceType'
        },
        link: function(scope, elem, attr, ctrl) {
            var autoItem = [];
            scope.change = function() {
                locationAutoCompleteService.unSubscribe();
                var service = locationAutoCompleteService.getServiceDefinition();
                service.filters.pattern = scope.inputVal;
                locationAutoCompleteService.subscribe();
            };
            scope.$on('myData', function(event, message) {
                if (message !== null && message.results !== null) {
                    autoItem = [];
                    for (var i = 0; i < message.results.length; i++) {
                        autoItem.push({
                            label: message.results[i].name,
                            id: message.results[i].id
                        });
                    }
                    elem.autocomplete({
                        source: autoItem,
                        select: function(event, ui) {
                            $timeout(function() {
                                elem.trigger('input');
                            }, 0);
                        }
                    });
                }
            });
        }
    };
});
