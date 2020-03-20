define([
    'jquery',
    'bookmarks',
    'bookmark-controls',
    'toolbar-toggle',
    'article-share-export'
],
function (
    $,
    BookmarksCollection,
    BookmarkControlsView,
    ToolbarToggleView,
    ArticleShareExportView
) {
    var Article = function (options) {
        var bookmarksCollection = new BookmarksCollection(),
            bookmarkControls = new BookmarkControlsView({
                bookmarks: bookmarksCollection
            }),
            toolbarToggle = new ToolbarToggleView(),
            articleShareExport = new ArticleShareExportView({
                el: $('.container')
            });

        toolbarToggle.init();

        // Given a bit of text, analyze it for right-to-left style characters.
        function langIsRTL (sampleText) {
            var t = sampleText.replace(/@\w+/, ''),
                countHeb = countMatches('[\\u05B0-\\u05F4\\uFB1D-\\uFBF4]'),
                countArb = countMatches('[\\u060C-\\u06FE\\uFB50-\\uFEFC]');

            function countMatches (match) {
                var matches = t.match(new RegExp(match, 'g'));
                return matches !== null ? matches.length : 0;
            }

            // if 20% of chars are Hebrew or Arbic then direction is rtl
            return (countHeb + countArb) * 100 / t.length > 20;
        }

        function layoutImages () {
            $('.entry-content img').each(function (i, img) {
                var el = $(img);

                $('<img/>').attr('src', el.attr('src')).load(function () {
                    var w = this.width,
                        h = this.height;

                    if (w > 250) {
                        el.addClass('img-large')
                            .css('max-width', w * 1.5);
                    }
                    else if (w < 250) {
                        el.addClass('img-small');
                    }
                });
            });
        }

        // This was copied almost wholesale from bookmark-controls.js in a hurry, becase
        // we found out this didn't work at all until after launch.
        function deleteTagFromBookmark (e) {
            e.preventDefault();

            var target = $(e.target),
                tag = target.parent();

            // Go ahead and remove the tag from the DOM.
            tag.addClass('pending-removal');
            setTimeout(function () {
                tag.remove();
            }, 150);

            $.ajax({
                type: 'DELETE',
                url: target.attr('href'),
                error: function (jqhxr) {
                    console.log(jqhxr);
                }
            });
        }

        $('body').on('click', '.flyout-add-tags .tag-delete', deleteTagFromBookmark);

        function init () {
            layoutImages();

            if ($('body').attr('data-print') == 1) {
                window.print();
            }

            if (langIsRTL($('h1.entry-title').text() + $('.entry-content p:lt(3)').text())) {
                $('html').attr('dir', 'rtl');
            }
        }

        init();

        return {};
    };

    return Article;
});