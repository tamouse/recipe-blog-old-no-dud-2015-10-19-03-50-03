define([
    'jquery',
],
function ($) {
    var WhoToFollow = function (options) {
        var opts = options || {},
            el = opts.el || $('.who-to-follow');

        function close (e) {
            if (e) {
                e.preventDefault();
            }

            el.addClass('hidden');

            setTimeout(function () {
                el.addClass('off-screen');
            }, 90);
        }

        function toggle (e) {
            if (e) {
                e.preventDefault();
            }

            if (el.hasClass('off-screen')) {
                el.removeClass('off-screen');

                setTimeout(function () {
                    el.toggleClass('hidden');
                }, 100);
            }
            else {
                close();
            }
        }

        function toggleAmountShown (e) {
            var btn = $(e.target),
                list = el.find('.recommended-members-list');

            e.preventDefault();

            if (list.hasClass('truncated-list')) {
                list.removeClass('truncated-list');
                btn.text('Show fewer');
            }
            else {
                list.addClass('truncated-list');
                btn.text('Show more…');
            }
        }

        $('.who-to-follow-control').on('click', toggle);
        el.on('click', '.who-to-follow-close', close);

        function init () {
            var initDisplayNum = 6;

            if (el.find('.recommended-member').length > initDisplayNum) {

                $('.show-more-folks').removeClass('hidden').on('click', toggleAmountShown);
            }
        }

        init();

        return {};
    };

    return WhoToFollow;
});