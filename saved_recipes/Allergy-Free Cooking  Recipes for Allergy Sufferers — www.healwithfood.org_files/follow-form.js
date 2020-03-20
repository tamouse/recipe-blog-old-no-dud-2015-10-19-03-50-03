define([
    'jquery',
],
function ($) {
    var FollowFormView = function (options) {
        var el = $('.follow-form');

        // Along with the updateUi function, this type of thing is a bit rough
        // should be using templates.
        var followBtnHtml = '<span class="follow"><b>Follow</b></span>',
            unfollowBtnHtml = '<span class="following"><b>Following</b></span><span class="unfollow"><b>Unfollow</b></span>';

        // TODO: This type of manual DOM manipulation is not the best. We should
        // bet doing this with templates. Doing it this way for now, just to get
        // it out the door.
        function updateUi (form) {
            var btn = form.find('button[type=submit]'),
                isFollowing = btn.hasClass('user-unfollow'),
                formAction = form.attr('action'),
                btnTitle = btn.attr('title');

            if (isFollowing) {
                form.attr('action', formAction.replace('unfollow', 'follow'));
                btn.addClass('user-follow')
                    .removeClass('user-unfollow');
                btn.attr('title', btnTitle.replace('Unfollow', 'Follow'));
                btn.html(followBtnHtml);
            }
            else {
                form.attr('action', formAction.replace('follow', 'unfollow'));
                btn.addClass('user-unfollow')
                    .removeClass('user-follow');
                btn.attr('title', btnTitle.replace('Follow', 'Unfollow'));
                btn.html(unfollowBtnHtml);
            }
        }

        function submit (e) {
            e.preventDefault();

            var submitEvent = e,
                form = $(e.target),
                button = form.find('button[type=submit]');

            button.blur().trigger('start.activity');

            $.ajax({
                type: 'POST',
                url: form.attr('action'),
                statusCode: {
                    401: function () {
                        window.location.href = '/login';
                    }
                },
                success: function () {
                    button.trigger('stop.activity');
                    updateUi(form);
                    $('body').trigger('follow.user');
                },
                error: function (jqxhr) {
                    button.trigger('stop.activity');
                }
            });
        }

        el.on('submit', submit);

        return {};
    };

    return FollowFormView;
});
