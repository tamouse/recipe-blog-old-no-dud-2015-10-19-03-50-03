define(['jquery'], function ($) {
    var BookmarkSearchView = function (options) {
        var opts = options || {},
            el = opts.el || $('.bookmark-search'),
            form = el.find('.bookmark-search-form'),
            searchField = el.find('[type=search]'),
            searchTimeout = null,
            bookmarks = opts.bookmarks,
            bookmarksContainer = $('.bookmark-list');

        function toggle () {
            if (el.hasClass('hidden')) {
                el.removeClass('hidden');

                setTimeout(function () {
                    form.removeClass('off-screen');
                    searchField.focus();
                }, 75);
            }
            else {
                close();
            }
        }

        function close (e) {
            if (e) {
                e.preventDefault();
            }

            form.addClass('off-screen');
            searchField.val('');
            searchField.blur();

            setTimeout(function () {
                inputOnKeyup();
                el.addClass('hidden');
            }, 150);
        }

        function search (val) {
            if (val) {
                $.ajax({
                    url: form.attr('action'),
                    dataType: 'json',
                    data: {
                        'q': val,
                        'article_view': form.attr('data-article-view')
                    },
                    success: function (res) {
                        // NOTE: all of this is pretty rough.
                        if (res.success) {
                            var bookmarkEls = $(res.content);
                            bookmarkEls.find('.requires-js').removeClass('requires-js');
                            bookmarksContainer.find('.bookmark').addClass('hidden');
                            bookmarksContainer.find('.no-bookmarks').remove();

                            _.each(bookmarkEls, function (bookmark) {
                                var bm = $(bookmark),
                                    bmId = bm.attr('data-bookmark-id'),
                                    bmInList = bookmarksContainer.find('[data-bookmark-id=' + bmId + ']');

                                if (bm.hasClass('no-bookmarks')) {
                                    bookmarksContainer.find('.no-bookmarks').remove();
                                    bookmarksContainer.find('.list-paging').before(bm);
                                }
                                else {
                                    if (bmInList.length === 0) {
                                        bm.addClass('added-from-search');
                                        bookmarksContainer.find('.list-paging').before(bm);

                                        bookmarks.add(bm);
                                    }
                                    else {
                                        bmInList.removeClass('hidden');
                                    }
                                }
                            });
                        }
                        else {
                            resetBookmarks();
                        }

                    },
                    error: function (jqxhr) {
                        resetBookmarks();
                    }
                });
            }
        }

        function inputOnKeyup (e) {
            var val = searchField.val();
            clearTimeout(searchTimeout);

            if (val.length > 0) {
                searchTimeout = setTimeout(function () {
                    search(val);
                }, 500);
            }
            else {
                resetBookmarks();
            }
        }

        function resetBookmarks () {
            bookmarksContainer.find('.bookmark.hidden').removeClass('hidden');

            // Clean up any bookmarks added from other pages
            _.each(bookmarksContainer.find('.added-from-search'), function (bookmark) {
                var bm = $(bookmark);
                bookmarks.delete(bm.attr('data-bookmark-id'));
                bm.remove();
            });
        }

        el.on('click.close', '.close-btn', close);
        searchField.on('keyup', inputOnKeyup);
        form.on('submit', function (e) {
            e.preventDefault();
            search(searchField.val());
        });

        // This is a webkit only addition. This event fires when the "x" is
        // clicked. It only appears in webkit browsers right now?
        if (document.addEventListener) {
            searchField.get(0).addEventListener('search', inputOnKeyup);
        }

        $('body').on('keydown.bookmark-search', function (e) {
            if (e.which === 27) {
                close();
            }
        });

        return {
            toggle: toggle
        };
    };

    return BookmarkSearchView;
});
