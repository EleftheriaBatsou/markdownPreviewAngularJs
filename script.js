angular.module('markdownApp', ['ngSanitize'])

.controller('markdownController', function($scope, $filter) {
    $scope.input = 'Enter your [Markdown][1] here.' +
        '\n' +
        '\n- *first*' +
        '\n- **second**' +
        '\n- third' +
        '\n' +
        '\n[1]: http://daringfireball.net/projects/markdown/syntax';
    $scope.copyMessage = '';

    function copyText(text, label) {
        function done() {
            $scope.$applyAsync(function () {
                $scope.copyMessage = label + ' copied to clipboard.';
            });
        }
        function fallback() {
            var ta = document.createElement('textarea');
            ta.value = text;
            document.body.appendChild(ta);
            ta.select();
            try {
                document.execCommand('copy');
            } finally {
                document.body.removeChild(ta);
                done();
            }
        }
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(done, fallback);
        } else {
            fallback();
        }
    }

    $scope.copyMarkdown = function () {
        copyText($scope.input || '', 'Markdown');
    };

    $scope.copyHtml = function () {
        var html = $filter('markdown')($scope.input || '');
        copyText(html, 'HTML');
    };
})

.filter('markdown', function() {
    var converter = new Showdown.converter();
    return converter.makeHtml;
});
