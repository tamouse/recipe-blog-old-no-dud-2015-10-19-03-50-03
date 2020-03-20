define([
    'jquery'
],
function ($) {
    var ToolbarToggle = function (options) {
        var body = $('body'),
            toolbar = $('.tools'),
            el = $('.toolbar-visibility'),
            key = 'toolbar_visibility',
            hentry = $('.hentry:first');

        function toggle (e) {
            if (e) {
                e.preventDefault();
            }

            toolbar.toggleClass('hidden');
            body.toggleClass('toolbar-hidden');

            if (toolbar.hasClass('hidden')) {
                el.attr('title', 'Show toolbar')
                    .removeClass('icon-left-triangle')
                    .addClass('icon-right-triangle');


                localStorage.setItem(key, 'hidden');
            }
            else {
                el.attr('title', 'Hide toolbar')
                    .removeClass('icon-right-triangle')
                    .addClass('icon-left-triangle');

                localStorage.setItem(key, 'visible');
            }
        }

        function init () {
            var setting = localStorage.getItem(key) || null;

            if (setting === 'hidden' || Modernizr.touch) {
                toolbar.trigger('toggle');
            }
        }

        toolbar.on('click', '.toolbar-visibility', toggle);
        toolbar.on('toggle', toggle);

        // Show/hide the toolbar on touch for devices that support it.
        if (Modernizr.touch) {
            hentry.on('click', function (e) {
                if (e.target.nodeName !== 'A') {
                    toolbar.trigger('toggle');
                }
            });

            hentry.on('touchmove', function (e) {
                if (!body.hasClass('toolbar-hidden')) {
                    toolbar.trigger('toggle');
                }
            });
        }

        return {
            init: init
        };
    };

    return ToolbarToggle;
});