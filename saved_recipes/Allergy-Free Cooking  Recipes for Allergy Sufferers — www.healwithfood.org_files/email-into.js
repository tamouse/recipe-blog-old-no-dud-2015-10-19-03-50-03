define([
    'jquery'
],
function ($) {
    var EmailIntoView = function (options) {
        var opts = options || {},
            el = opts.el || $('body'),
            addrField = el.find('.email-addr-field'),
            editFields = el.find('.email-slug-edit-fields');

        function enterEditMode (e) {
            e.preventDefault();
            addrField.addClass('hidden');
            editFields.removeClass('hidden');
        }

        function exitEditMode (e) {
            if (e.preventDefault) {
                e.preventDefault();
            }

            editFields.addClass('hidden');
            addrField.removeClass('hidden');
        }

        function init () {
            editFields.addClass('hidden');
        }

        el.on('click', '[type=reset]', exitEditMode);
        el.on('click', '.edit-mode-btn', enterEditMode);

        init();

        return {
            init: init
        };
    };

    return EmailIntoView;
});