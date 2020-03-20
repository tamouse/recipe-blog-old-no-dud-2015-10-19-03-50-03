define([
    'jquery',
    'avatar'
],
function ($, AvatarView) {
    var ProfileView = function (options) {
        var body = $('body'),
            opts = options || {},
            el = opts.el || body;

        function init () {
            new AvatarView();
        }

        init();

        return {};
    };

    return ProfileView;
});