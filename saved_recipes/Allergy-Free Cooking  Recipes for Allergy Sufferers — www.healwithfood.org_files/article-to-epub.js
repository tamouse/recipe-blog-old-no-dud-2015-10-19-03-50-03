define([
    'jquery'
],
function ($) {
    var ArticleToEpub = function (options) {
        var opts = options || {},
            el = opts.el || $('body');

        function requestError () {
            el.find('.article-to-epub.activated').trigger('stop.activity');
            alert('We\'re having trouble creating an ePub. Mind trying again?');
        }

        function makeRequest (url, success) {
            $.ajax({
                type: 'GET',
                url: url,
                error: requestError,
                success: success
            });
        }

        function download (e) {
            e.preventDefault();

            var button = $(e.currentTarget),
                requestAttempts = 0,
                maxAttempts = 8,
                url = button.attr('data-ajax-href');

            button.blur().trigger('start.activity');

            function requestSuccess (data) {
                requestAttempts += 1;

                if (data.url) {
                    button.trigger('stop.activity');

                    // Redirect to trigger the download
                    window.location.href = data.url;
                }
                else {
                    // Try the request again
                    if (requestAttempts < maxAttempts) {
                        setTimeout(function () {
                            makeRequest(url, requestSuccess);
                        }, 1000);
                    }
                    else {
                        button.trigger('stop.activity');
                        requestError();
                    }
                }
            }

            makeRequest(url, requestSuccess);
        }

        el.on('click', '.article-to-epub', download);

        return {};
    };

    return ArticleToEpub;
});