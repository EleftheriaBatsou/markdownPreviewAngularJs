angular.module('markdownApp', ['ngSanitize'])

.controller('markdownController', function($scope) {
    $scope.input = 'Enter your [Markdown][1] here.' +
        '\n' +
        '\n- *first*' +
        '\n- **second**' +
        '\n- third' +
        '\n' +
        '\n[1]: http://daringfireball.net/projects/markdown/syntax';
})

.filter('markdown', function() {
    var converter = new Showdown.converter();
    return converter.makeHtml;
});
