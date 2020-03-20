define([
    'jquery',
    'underscore',
    'utils',
    'fastclick',
    'follow-form',
    'who-to-follow',
    'feedback',
    'reco-controls'
],
function ($, _, Utils, Fastclick, FollowFormView, WhoToFollowView, FeedbackView, RecoControlsView) {
    var AppView = function (options) {
        var body = $('body'),
            utils = new Utils(),
            followBtnView = new FollowFormView(),
            whoToFollow = new WhoToFollowView(),
            feedback = new FeedbackView(),
            // NOTE: Loading this here isn't a long term solution...i don't think
            // should probably only be loaded on Reco List/Single Reco/Profile > Recos
            recoControlsView = new RecoControlsView();

        $('.toggle-nav-btn').on('click', function (e) {
            e.preventDefault();
            body.toggleClass('app-nav-opened');
        });

        $('.important-msg').on('click', '.close-btn', function (e) {
            e.preventDefault();
            $(e.delegateTarget).remove();
        });

        // This is used for recos and bookmarks...i think
        // NOTE: This is a little ham-handed right now.
        function saveArticle (e) {
            if (e.preventDefault) {
                e.preventDefault();
            }

            var form = $(e.target),
                button = form.find('.standard-btn');

            button.trigger('start.activity');

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

                    // Change the UI
                    button
                        .prop('disabled', true)
                        .prop('title', 'Saved to Reading List')
                        .blur();

                    button.find('span')
                        .text('Saved')
                        .removeClass('icon-read-later')
                        .addClass('icon-couch');
                },
                error: function (jqxhr) {
                    button.trigger('stop.activity');
                }
            });
        }

        $('[role=main]').on('submit', '.save-article', saveArticle);

        // don't allow multiple popovers to open at the same time.
        body.on('hide-popovers', function (e) {
            $('.popover-overlay').remove();
            $('.popover:not(.hidden)').addClass('hidden');
        });

        body.on('attach-popover-overlay', function (e, data) {
            var d = data || {},
                html = '<div class="popover-overlay"></div>';

            if (d.el) {
                $(d.el).parent().append(html);
            }
        });

        body.on('click.popover-overlay', '.popover-overlay', function (e) {
            body.trigger('hide-popovers');
        });

        body.on('keydown.flyout', function (e) {
            if (e.which === 27) {
                body.trigger('hide-popovers');
            }
        });

        body.on('follow.user', function (e) {
            $('.new-recos-msg').removeClass('hidden');
        });

        body.on('success.msg', function (e, data) {
            var msg = $('.success-indicator'),
                displayTime = 1800;

            if (data) {
                msg.find('span').attr('class', 'icon icon-' + data.action);
                msg.removeClass('hidden');

                setTimeout(function () {
                    msg.removeClass('off-screen');
                }, 100);

                setTimeout(function () {
                    msg.addClass('off-screen');
                }, displayTime);

                setTimeout(function () {
                    msg.addClass('hidden');
                }, displayTime + 100);
            }
            else {
                return false;
            }
        });

        body.on({
            'success.kindle': function (e) {
                body.trigger('success.msg', {'action': 'kindle'});
            },
            'success.archive': function (e) {
                body.trigger('success.msg', {'action': 'archive'});
            },
            'success.unarchive': function (e) {
                body.trigger('success.msg', {'action': 'unarchive'});
            },
            'success.favorite': function (e) {
                body.trigger('success.msg', {'action': 'favorite'});
            },
            'success.save': function (e) {
                body.trigger('success.msg', {'action': 'read-later'});
            }
        });

        // Activate a button's working state.
        function standardBtnActivate (e) {
            var el = $(e.currentTarget),
                initHeight = el.outerHeight(),
                initWidth = el.find('span:visible').outerWidth();

            el.blur();

            if (el.hasClass('activated')) {
                el.prop('disabled', false)
                    .css({
                        'width': '',
                        'height': ''
                    });
            }
            else {
                el.prop('disabled', true)
                    .css({
                        'width': initWidth,
                        'height': initHeight
                    });
            }

            el.toggleClass('activated');
        }

        // deactivate does the same as activate, it felt
        // strange to call activate in other parts of the code.
        // Trying to make it a bit more clear what's happening.
        $('.standard-btn, .share-export-btn')
            .on('start.activity', standardBtnActivate)
            .on('stop.activity', standardBtnActivate);

        $('.feedback-link').on('click', function (e) {
            e.preventDefault();
            feedback.toggle();
        });

        return {
            init: function () {
                utils.csrfProtect();
                FastClick.attach(document.body);

                // JavaScript is enabled and loaded. Safe(r) to display functions
                // that require JS.
                $('.requires-js').removeClass('requires-js');

                // temporary local storage cleanup
                // TODO: Remove this after a few days
                localStorage.removeItem('rdb-font');
                localStorage.removeItem('rdb-mode');
                localStorage.removeItem('rdb-size');
                localStorage.removeItem('rdb-width');
            }
        };
    };

    return AppView;
});
