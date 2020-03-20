define([
    'jquery'
],
function ($) {
    var SettingsKindleView = function (options) {
        var el = $('.settings-kindle'),
            digestsEl = $('.kindle-digests-options');

        function digestOptChanged (e) {
            var val = $(e.target).val().toLowerCase();

            if (val == 'true') {
                digestsEl.removeClass('hidden');
            }
            else {
                digestsEl.addClass('hidden');
            }
        }

        function sendDigest (e) {
            e.preventDefault();

            var button = $(e.target),
                postData = {
                    'username': $.trim($('#id_kindle_username').val()),
                    'domain': $('#id_kindle_domain').val()
                };

            if (!postData.username) {
                alert('You\'ll need to set up your Kindle email address first');
                return;
            }

            button.blur().trigger('start.activity');

            $.ajax({
                url: '/kindle/ajax/send-digest',
                type: 'POST',
                data: postData,
                dataType: 'json',
                success: function (res) {
                    $('body').trigger('success.kindle');
                    button.blur().trigger('stop.activity');
                },
                error: function (jqxhr) {
                    alert('There was an error sending your digest. Mind trying again?');
                    button.blur().trigger('stop.activity');
                }
            });
        }

        function init () {
            el.on('click', '.send-digest-btn', sendDigest);
            el.on('change', '[name=digest_enabled]', digestOptChanged);
        }

        init();

        return {};
    };

    return SettingsKindleView;
});