// Flyout elements that are used for the appearance and send to kindle on
// Reading View and the Add Bookmark on the Reading List
define(['jquery', 'utils'], function ($, Utils) {
    var Flyouts = function (options) {
        var utils = new Utils();

        function openFlyout (target) {
            var targetFlyout = $(target.attr('data-flyout-selector')),
                // If a flyout is opened by one target, but needs to be associated
                // with a different target, specify a data-flyout-target
                targetOverride = $(target.attr('data-flyout-target'));

            if (targetOverride.length) {
                target = targetOverride;
            }

            // Small screen touch devices were having trouble with inputs and textarea
            // in the fixed position flyouts. add/remove a special class to change
            // the position to absolute.
            // if (utils.getScreenSize() === 'small' && Modernizr.touch) {
            //     targetFlyout.find('input, textarea').on('focus', function (e) {
            //         targetFlyout.addClass('text-input-focused');
            //     })
            //     .on('blur', function (e) {
            //         targetFlyout.removeClass('text-input-focused');
            //     });
            // }

            // We need to make an association between the triggering element and
            // the flyout element
            targetFlyout.data('triggerEl', target);

            function hideFlyout () {
                target.removeClass('active');
                targetFlyout.addClass('hidden').removeAttr('style');

                $('body').trigger('closed.flyout');
            }

            function showFlyout () {
                target.addClass('active');
                targetFlyout.removeClass('hidden');

                $('body').trigger('opened.flyout', [target, targetFlyout]);
            }

            function positionFlyout () {
                var targetPos = target.position();

                targetFlyout.css({
                    'left': targetPos.left + target.width(),
                    'top': targetPos.top - target.height() * 0.8
                });
            }

            function closeOtherFlyouts () {
                $('.flyout').not('.hidden').addClass('hidden').removeAttr('style');
                $('.opens-flyout.active').removeClass('active');
            }

            if (targetFlyout.hasClass('hidden')) {
                if (!targetFlyout.hasClass('do-not-position') && utils.getScreenSize() !== 'small') {
                    positionFlyout();
                }
                else {
                    targetFlyout.removeAttr('style');
                }

                closeOtherFlyouts();
                showFlyout();
            }
            else {
                hideFlyout();
            }
        }

        function closeFlyout (target) {
            var openFlyouts = $('.flyout').not('.hidden');

            // We need to make sure there are open flyouts before trying to close
            if (openFlyouts.length > 0) {
                // Check to make sure we're not clicking around inside the flyout,
                // that should not close anything.
                if (target.parents('.flyout').length === 0) {
                    openFlyouts.addClass('hidden').removeAttr('style');

                    var triggerEl = openFlyouts.data('triggerEl');

                    if (triggerEl) {
                        triggerEl.removeClass('active');
                    }

                    $('body').trigger('closed.flyout');
                }
            }
        }

        return {
            init: function () {
                var el = $('body');

                // We're attaching this to the body because clicking outside of a flyout
                // needs to close it. Also, reasons.
                el.on('click.flyout', function (e) {
                    var target = $(e.target);

                    if (target.hasClass('opens-flyout')) {
                        e.preventDefault();
                        openFlyout(target);
                    }
                    else {
                        // This may be a bit short-sighted. We want to be able to click an
                        // item in any jquery ui autocomplete, so don't close the flyout.
                        if (!target.parents('.ui-autocomplete').length) {
                            closeFlyout(target);
                        }
                    }
                });

                el.on('keydown.flyout', function (e) {
                    if (e.which === 27) {
                        closeFlyout($('body'));
                    }
                });

                el.on('flyout.close', function (e) {
                    closeFlyout($('body'));
                });

                // Should probably use a debounce instead of this
                $(window).resize(function (e) {
                    if (utils.getScreenSize() !== 'small') {
                        closeFlyout($('body'));
                    }
                });
            }
        };
    };

    return Flyouts;
});