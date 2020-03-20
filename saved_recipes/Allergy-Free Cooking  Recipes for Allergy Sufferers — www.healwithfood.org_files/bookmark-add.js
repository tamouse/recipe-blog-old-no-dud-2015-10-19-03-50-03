define([
    'jquery'
], function ($) {
    var BookmarkAddView = function (options) {
        var opts = options || {},
            el = $('.add-bookmark-popover'),
            form = el.find('.bookmark-add-form'),
            userTags = JSON.parse(localStorage.getItem('tags')) || [],
            bookmarks = opts.bookmarks;

        function toggle () {
            var input = el.find('input[type=url]');

            $('body').trigger('hide-popovers');
            el.removeClass('hidden');

            if (!el.hasClass('hidden')) {
                $('body').trigger('attach-popover-overlay', {el: el});
                input.focus();
            }
            else {
                input.blur();
            }
        }

        function close (e) {
            if (e) {
                e.preventDefault();
            }

            form.find('input[type=url]').val('');
            $('body').trigger('hide-popovers');
        }

        function submit (e) {
            e.preventDefault();
            var el = $(e.target),
                button = el.find('.standard-btn');

            button.blur().trigger('start.activity');

            $.ajax({
                type: 'POST',
                url: el.attr('action'),
                data: el.serialize(),
                success: function (res) {
                    var list = $('.unread').find('.bookmark-list'),
                        bookmark = $(res.bookmark_html),
                        articleId = bookmark.attr('data-article-id'),
                        existing = list.find('li[data-article-id=' + articleId + ']'),
                        addedEl = null;

                    button.trigger('stop.activity');

                    // This first check just makes sure you're on the unread
                    // list and not the favorites or archives.
                    if (list.length > 0) {
                        if (existing.length > 0) {
                            addedEl = existing;
                            list.prepend(existing);
                        }
                        else {
                            bookmark.find('.requires-js').removeClass('requires-js');
                            $('.no-bookmarks').remove();
                            addedEl = bookmark;
                            list.prepend(bookmark);
                        }

                        var newBookmark = bookmarks.add(addedEl);
                        newBookmark.tagsView.setAutocompleteSource(userTags);
                    }

                    close();
                },
                error: function (jqxhr) {
                    button.trigger('stop.activity');
                    console.log(jqxhr);
                }
            });
        }

        el.on('click', '.close-btn', close);
        form.on('submit', submit);

        return {
            toggle: toggle
        };
    };

    return BookmarkAddView;
});