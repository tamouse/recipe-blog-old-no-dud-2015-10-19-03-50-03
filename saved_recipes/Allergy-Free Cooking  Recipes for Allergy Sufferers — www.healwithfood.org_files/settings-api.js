define([
    'jquery'
],
function ($) {
    var SettingsApiView = function (options) {
        function resendValidationEmail (e) {
            e.preventDefault();

            var el = $(e.target);

            if (el.data('sent')) {
                return false;
            }

            $.ajax({
                url: el.attr('href'),
                type: 'POST',
                dataType: 'json',
                data: {
                    'resend': true
                },
                success: function (data) {
                    if (data.success) {
                        el.text('An email verification has been sent').addClass('disabled icon icon-check').data('sent', 1);
                    }
                    else {
                        alert(data.error);
                    }
                },
                error: function(XMLHttpRequest){
                    alert('There was an issue sending your activation email. If you continue to have trouble, please contact Readability support.');
                }
            });
        }

        $('.api-verify-email').on('click', 'a', resendValidationEmail);

        return {};
    };

    return SettingsApiView;
});