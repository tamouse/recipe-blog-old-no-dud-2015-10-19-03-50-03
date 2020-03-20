define([
    'jquery',
    'modal'
],
function ($, ModalView) {
    var AvatarView = function (options) {
        var body = $('body'),
            opts = options || {},
            modal = new ModalView({
                baseClass: 'avatar-modal',
                html: $('#avatar-modal').html()
            });

        function init () {
            modal.render();

            $('body').on('click', '.avatar-view', function (e) {
                e.preventDefault();
                modal.open();
            });
        }

        init();

        return {};
    };

    return AvatarView;
});