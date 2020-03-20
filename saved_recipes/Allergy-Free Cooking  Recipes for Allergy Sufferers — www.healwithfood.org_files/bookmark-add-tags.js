define([
    'jquery',
    'jqueryui/autocomplete'
], function ($, $ui) {
    var BookmarkAddTagsView = function (options) {
        var opts = options || {},
            bookmark = opts.bookmark || null,
            autocompleteTags = [];

        if (bookmark === null) {
            console.log('BookmarkAddTagsView requires options.bookmark');
            return false;
        }

        var el = bookmark.find('.bookmark-add-tags'),
            form = bookmark.find('.add-tags-form'),
            input = form.find('.add-tags-input');

        form.on('submit', submit);

        input.autocomplete({
            minLength: 0,
            source: function (request, response) {
                // Delegate back to autocomplete, but extract the last term
                // This is what allows for comma-separated values.
                response($.ui.autocomplete.filter(autocompleteTags, extractLast(request.term)));
            },
            focus: function () {
                // prevent value inserted on focus
                return false;
            },
            select: function(e, ui) {
                var terms = split(this.value);
                terms.pop();
                terms.push(ui.item.value);
                // add placeholder to get the comma-and-space at the end
                terms.push('');
                this.value = terms.join(', ');
                return false;
            }
        });

        input.on({
            'autocompleteopen': function (e, ui) {
                input.attr('data-menu-active', '1');
            },
            'autocompleteclose': function (e, ui) {
                input.attr('data-menu-active', '0');
            },
            'focus': function (e) {
                $(this).autocomplete('enable');
            },
            'keydown': function (e) {
                // don't navigate away from the field on tab when selecting an item
                if (e.keyCode === $.ui.keyCode.TAB && input.attr('data-menu-active') === '0') {
                    e.preventDefault();
                }
            }
        });

        function setAutocompleteSource (tags) {
            autocompleteTags = tags;
        }

        function split (val) {
            return val.split(/,\s*/);
        }

        function extractLast (term) {
            return split(term).pop();
        }

        function toggle () {
            var input = el.find('.add-tags-input'),
                parent = el.parent();

            if (!el.hasClass('hidden')) {
                bookmark.removeClass('adding-tags');
                el.addClass('hidden');

                if (parent.find('.bookmark-tags-list .tag').length === 0) {
                    parent.addClass('hidden');
                }

                input.blur();
            }
            else {
                bookmark.addClass('adding-tags');
                el.removeClass('hidden');
                parent.removeClass('hidden');
                input.focus();
            }
        }

        function submit (e) {
            e.preventDefault();

            var el = $(e.target),
                input = el.find('.add-tags-input'),
                button = el.find('.standard-btn');

            button.blur().trigger('start.activity');

            $.ajax({
                type: 'POST',
                url: el.attr('action'),
                data: {
                    'tag_string': $.trim(input.val().replace(/,+$/, ''))
                },
                success: function (tags) {
                    button.trigger('stop.activity');

                    if (tags.length) {
                        var html = '',
                            template = $('#bookmark-tag').html(),
                            data = {
                                bookmark_id: bookmark.attr('data-bookmark-id')
                            };

                        _.each(tags, function (tag) {
                            $.extend(data, tag);

                            html += _.template(template, data);
                        });

                        bookmark.find('.bookmark-tags-list').append(html);
                        bookmark.addClass('has-tags');

                        $('body').trigger('tags-updated');
                    }

                    input.val('');

                    if (!$('body').hasClass('article')) {
                        toggle();
                    }
                },
                error: function (jqxhr) {
                    button.trigger('stop.activity');
                    console.log(jqxhr);
                }
            });
        }

        return {
            toggle: toggle,
            setAutocompleteSource: setAutocompleteSource,
            getAutocompleteSource: function () {
                return autocompleteTags;
            }
        };
    };

    return BookmarkAddTagsView;
});