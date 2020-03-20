define(['jquery'], function ($) {
    var BookmarkShareExportView = function (options) {
        var opts = options || {},
            el = opts.el || $('.bookmark-share-export-popover');

        function init (bookmarkEl) {
            bookmark = bookmarkEl;
            el = bookmark.find('.bookmark-share-export-popover');
            el.on('click.close', '.close-btn', close);
        }

        function toggle () {
            $('body').trigger('hide-popovers')
                .trigger('attach-popover-overlay', {el: el});

            el.removeClass('hidden');
        }

        function close (e) {
            if (e) {
                e.preventDefault();
            }

            el.off('click.close');
            $('body').trigger('hide-popovers');
        }

        return {
            init: init,
            toggle: toggle
        };
    };

    return BookmarkShareExportView;
});