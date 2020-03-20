define([
    'jquery',
    'bookmark'
],
function ($, BookmarkView) {
    var BookmarksCollection = function () {
        return {
            add: function (bm) {
                var view = new BookmarkView({
                        el: bm
                    }),
                    bmId = bm.attr('data-bookmark-id');

                this.views[bmId] = view;
                return this.views[bmId];
            },
            delete: function (bmId) {
                delete this.views[bmId];
                return this.views;
            },
            views: {}
        };
    };

    return BookmarksCollection;
});