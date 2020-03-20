define(['jquery'], function ($) {
    var FeedbackView = function (options) {
        var el = $('.feedback-popover');

        function toggle () {
            $('body').trigger('hide-popovers')
                .trigger('attach-popover-overlay', {el: el});

            el.removeClass('hidden');
        }

        function close (e) {
            if (e) {
                e.preventDefault();
            }

            $('body').trigger('hide-popovers');
        }

        el.on('click', '.close-btn', close);

        return {
            toggle: toggle
        };
    };

    return FeedbackView;
});