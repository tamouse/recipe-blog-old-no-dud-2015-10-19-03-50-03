define([
    'jquery',
    'appearance',
    'settings-api',
    'settings-kindle',
    'utils',
    'modal',
    'avatar'
],
function ($, AppearanceView, SettingsApiView, SettingsKindleView, Utils, ModalView, AvatarView) {
    var SettingsView = function (options) {
        var appearanceView = new AppearanceView({
                el: $('.appearance-options')
            }),
            settingsApiView = new SettingsApiView(),
            settingsKindleView = new SettingsKindleView(),
            utils = new Utils(),
            fbOptionModal = new ModalView({
                baseClass: 'fb-share-opt-modal',
                html: $('#fb-share-opt-modal').html()
            });

        fbOptionModal.render();
        new AvatarView();

        // Settings for each social network. This will probably grow in the future
        $('.revokable-item').on('change', 'input[type=checkbox]', function (e) {
            var el = $(e.target),
                key = el.attr('data-key') || null,
                data = {};

            if (key !== null) {
                data[key] = el.is(':checked');
                utils.setUserKeyValue(data);
            }
        });

        $('.fb-option-info').on('click', function (e) {
            e.stopPropagation();
            e.preventDefault();

            fbOptionModal.open();
        });

        return {};
    };

    return SettingsView;
});