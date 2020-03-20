define([
    'jquery'
],
function ($) {
    var RecommendView = function (options) {
        var body = $('body'),
            opts = options || {},
            el = opts.el || body,
            msgContainer = el.find('.msg-field-container'),
            charCount = msgContainer.find('.msg-length'),
            maxLen = msgContainer.find('textarea').attr('maxlength');

        function updateOnInput (e) {
            var target = $(e.target),
                len = target.val().length,
                charsLeft = maxLen - len;

            charCount.text(charsLeft);
        }

        function init () {
            el.on('input', 'textarea', updateOnInput);

            el.on('focus', 'textarea', function (e) {
                msgContainer.addClass('has-focus');
            });

            el.on('blur', 'textarea', function (e) {
                msgContainer.removeClass('has-focus');
            });
        }

        init();

        return {
            init: init
        };
    };

    return RecommendView;
});