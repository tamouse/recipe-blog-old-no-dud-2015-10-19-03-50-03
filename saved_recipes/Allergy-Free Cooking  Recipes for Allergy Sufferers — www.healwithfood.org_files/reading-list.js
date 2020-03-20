define([
    'jquery',
    'bookmark-add',
    'tags-list',
    'bookmarks',
    'bookmark-controls',
    'article-share-export',
    'bookmark-search'
],
function (
    $,
    BookmarkAddView,
    TagsListView,
    BookmarksCollection,
    BookmarkControlsView,
    ArticleShareExportView,
    BookmarkSearchView
) {
    var ReadinglistView = function (options) {
        var bookmarksCollection = new BookmarksCollection(),
            bookmarkAdd = new BookmarkAddView({
                bookmarks: bookmarksCollection
            }),
            bookmarkControls = new BookmarkControlsView({
                bookmarks: bookmarksCollection,
                el: $('[role=main]')
            }),
            tagsList = new TagsListView(),
            articleShareExport = new ArticleShareExportView({
                el: $('[role=main]')
            }),
            bookmarkSearchView = new BookmarkSearchView({
                bookmarks: bookmarksCollection
            });

        function openAddBookmarkPopover (e) {
            e.preventDefault();
            bookmarkAdd.toggle();
        }

        function openTagsListPopover (e) {
            e.preventDefault();
            tagsList.toggle();
        }

        function openBookmarkSearch (e) {
            e.preventDefault();
            bookmarkSearchView.toggle();
        }

        $('.app-container')
            .on('click', '.add-bookmark', openAddBookmarkPopover)
            .on('click', '.show-tags-list', openTagsListPopover)
            .on('click', '.show-list-search', openBookmarkSearch);

        return {};
    };

    return ReadinglistView;
});
