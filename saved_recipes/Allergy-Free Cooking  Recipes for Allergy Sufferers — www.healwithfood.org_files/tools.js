define([
    'jquery',
    'email-into'
],
function ($, EmailIntoView) {
    var ToolsView = function (options) {
        var opts = options || {},
            el = opts.el || $('body'),
            emailIntoView = new EmailIntoView({
                el: $('#add-via-email')
            });

        return {};
    };

    return ToolsView;
});