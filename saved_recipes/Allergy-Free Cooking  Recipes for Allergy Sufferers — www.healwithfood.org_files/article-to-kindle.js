define([
    'jquery',
    'utils'
],
function ($, Utils) {
    var ArticleToKindle = function (options) {
        var opts = options || {},
            el = opts.el || $('body'),
            utils = new Utils(),
            kindleUserDetails = {};

        function submit (e) {
            e.preventDefault();

            var target = $(e.target),
                button = target.find('[type=submit]');

            if (!kindleUserDetails.username) {
                window.location.href = '/settings/kindle';
            }
            else {
                button.blur().trigger('start.activity');

                $.ajax({
                    type: 'POST',
                    url: target.attr('action'),
                    data: {
                        'article_id': target.find('input[name=article_id]').val()
                    },
                    success: function (res) {
                        button.trigger('stop.activity');
                        $('body').trigger('success.kindle');
                    },
                    error: function (jqxhr) {
                        button.trigger('stop.activity');
                        console.log(jqxhr);
                    }
                });
            }
        }

        function init () {
            var cookie = utils.getCookieByName('kindleUserDetails');

            if (cookie) {
                kindleUserDetails = JSON.parse(decodeURIComponent(cookie));
            }
        }

        el.on('submit', '.article-to-kindle', submit);

        init();

        return {};
    };

    return ArticleToKindle;
});