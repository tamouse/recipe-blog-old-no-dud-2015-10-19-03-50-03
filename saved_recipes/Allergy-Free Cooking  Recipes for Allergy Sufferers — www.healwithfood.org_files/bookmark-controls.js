define([
    'jquery',
    'bookmark-share-export'
],
function (
    $,
    BookmarkShareExportView,
    $ui
) {
    var BookmarkControls = function (options) {
        var body = $('body'),
            opts = options || {},
            el = opts.el || $('body'),
            bmAttrSuccessFuncs = {
                'favorite': toggleBookmarkFavorite,
                'archive': toggleBookmarkArchive,
                'is_active': toggleBookmarkActive
            },
            shareExportView = new BookmarkShareExportView(),
            bookmarks = opts.bookmarks;

        function toggleBookmarkFavorite (opts) {
            var btn = $('body').find('.toggle-bm-attr .icon-favorite'),
                title = btn.attr('title'),
                alt = btn.attr('data-alt-title');

            opts.bookmarkEl.toggleClass('favorite');

            btn.attr('title', alt)
                .attr('data-alt-title', title);

            if (!body.hasClass('reading-list')) {
                body.trigger('success.favorite');
            }
        }

        function toggleBookmarkArchive (opts) {
            var archiveClass = 'icon-archive',
                unarchiveClass = 'icon-unarchive';

            if (opts.bookmarkEl.find('.' + archiveClass).length) {
                opts.bookmarkEl.find('.' + archiveClass)
                    .addClass(unarchiveClass)
                    .removeClass(archiveClass);
            }
            else {
                opts.bookmarkEl.find('.' + unarchiveClass)
                    .addClass(archiveClass)
                    .removeClass(unarchiveClass);
            }

            if (!body.hasClass('reading-list')) {
                body.trigger('success.archive');
            }

            // Only remove the element if we're not on favorites
            if (body.hasClass('reading-list') && !body.hasClass('favorites')) {
                opts.bookmarkEl.addClass('pending-removal');

                // Decided to use a timeout here instead of css transition events for
                // better browser support and a whole lot less code
                setTimeout(function () {
                    opts.bookmarkEl.remove();
                }, 200);
            }
        }

        function toggleBookmarkActive (opts) {
            opts.bookmarkEl.addClass('pending-removal');

            setTimeout(function () {
                opts.bookmarkEl.remove();
            }, 200);
        }

        // Something like this will need to be used on both the reading list and
        // the reading view. Finding a way to abstract it would be good.
        function toggleBookmarkAttr (reqOpts) {
            var settings = reqOpts,
                successOpts = {
                    bookmarkEl: $('[data-bookmark-id=' + settings.bmId + ']')
                };

            // Update the UI before making the request
            bmAttrSuccessFuncs[settings.bmAttr](successOpts);

            // TODO: Handle errors here
            $.ajax({
                type: 'POST',
                url: settings.url,
                error: function (jqxhr) {
                    console.log('error', jqxhr);
                }
            });
        }

        function deleteTagFromBookmark (e) {
            e.preventDefault();

            var target = $(e.target),
                tag = target.parent(),
                bookmark = tag.parents('.bookmark'),
                tags = bookmark.find('.tag');

            // Go ahead and remove the tag from the DOM.
            tag.addClass('pending-removal');
            setTimeout(function () {
                tag.remove();

                if (tags.length === 1) {
                    bookmark.removeClass('has-tags');
                    bookmark.find('.bookmark-tags').addClass('hidden');
                }
            }, 150);

            $.ajax({
                type: 'DELETE',
                url: target.attr('href'),
                success: function () {
                    $('body').trigger('tags-updated');
                },
                error: function (jqhxr) {
                    console.log(jqhxr);
                }
            });
        }

        function showShareExport (e) {
            e.preventDefault();
            shareExportView.init($(e.target).parents('.bookmark'));
            shareExportView.toggle();
            $(e.target).blur();
        }

        function toggleAddTagForm (e) {
            var bookmarkEls = null;

            // This is a check to see if the form was closed by clicking one of
            // the tag buttons or by pressing the esc key.
            if (e) {
                e.preventDefault();
                bookmarkEls = $(e.target).parents('.bookmark');
            }
            else {
                bookmarkEls = $('.bookmark-add-tags:not(.hidden)').parents('.bookmark');
            }

            bookmarkEls.each(function (i, bookmark) {
                bookmarks.views[$(bookmark).attr('data-bookmark-id')].tagsView.toggle();
            });
        }

        // Handle Bookmark Favorite, Archive, Delete
        el.on('submit', '.toggle-bm-attr', function (e) {
            var target = $(e.target),
                reqOpts = {
                    url: target.attr('action'),
                    bmAttr: target.attr('data-bm-attr'),
                    bmId: target.attr('data-bm-id')
                };

            // Deleting an article from the article view should just submit
            // the form which will redirect back to the Reading List?
            if (body.hasClass('article') && target.attr('data-bm-attr') === 'is_active') {
                return true;
            }

            e.preventDefault();
            toggleBookmarkAttr(reqOpts);

            // this is a weird aesthetic thing. In the latest Chrome,
            // they've started applying focus to any button that is
            // clicked and it looks bad. I don't want to remove the
            // default outline for :focus though.
            target.find('[type=submit]').blur();
        });

        // Show/hide bookmark controls on small screens
        el.on('click', '.item-controls-toggle', function (e) {
            e.preventDefault();
            $(e.target).parents('.bookmark').toggleClass('controls-visible');
        });

        el.on('click', '.bookmark-share-export', showShareExport);
        el.on('click', '.bookmark .tag-delete', deleteTagFromBookmark);
        el.on('click', '.bookmark-tag', toggleAddTagForm);
        el.on('click', '.toggle-tag-form', toggleAddTagForm);

        body.on('keydown.addTagForm', function (e) {
            if (e.which === 27) {
                toggleAddTagForm();
            }
        });

        _.each(el.find('.bookmark'), function (bookmark) {
            bookmarks.add($(bookmark));
        });

        // TODO: This will only happen on page load, we should update it when
        // tags are added/removed.
        function requestTagcloud (callback) {
            $.ajax({
                type: 'GET',
                url: '/tagging/tagcloud/ajax?b=' + new Date().getTime(),
                success: function (res) {
                    if ($.isFunction(callback)) {
                        callback(res);
                    }
                },
                error: function (jqhxr) {
                    console.log(jqhxr);
                }
            });
        }

        if (body.attr('data-user-authed')) {
            requestTagcloud(function (data) {
                var tags = _.pluck(data, 'tag_text');

                // This is probably a short-term solution. We need to store the
                // tags somewhere that they'll be available in the bookmark-add view.
                // So that when a new bookmark is added we can set the autocomplete source.
                localStorage.setItem('tags', JSON.stringify(tags));

                _.each(bookmarks.views, function (bm, i, list) {
                    bm.tagsView.setAutocompleteSource(tags);
                });
            });
        }

        return {};
    };

    return BookmarkControls;
});