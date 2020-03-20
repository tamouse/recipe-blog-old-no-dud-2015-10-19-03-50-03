define([
    'jquery',
    'bookmark-add-tags'
],
function ($, BookmarkAddTagsView) {
    var BookmarkView = function (options) {
        var body = $('body'),
            opts = options || {},
            el = opts.el || null,
            tagsView = null;

        if (el === null) {
            console.log('BookmarkView requires options.el');
            return false;
        }

        function init () {
            var localTags = localStorage.getItem('tags') || null;

            tagsView = new BookmarkAddTagsView({
                bookmark: el
            });

            if (tagsView.getAutocompleteSource().length === 0 && localTags !== null) {
                tagsView.setAutocompleteSource(JSON.parse(localTags));
            }
        }

        init();

        return {
            tagsView: tagsView
        };
    };

    return BookmarkView;
});