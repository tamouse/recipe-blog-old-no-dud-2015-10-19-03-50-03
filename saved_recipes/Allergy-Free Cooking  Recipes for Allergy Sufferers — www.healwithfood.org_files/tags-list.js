define([
    'jquery',
    'modal-confirm'
],
function ($, ModalConfirmView) {
    var TagsListView = function (options) {
        var el = $('.tags-list-popover'),
            tagTemplate = $('#tag-list-tag').html(),
            zeroStateTemplate = $('#tag-list-zero-state').html(),
            deleteTemplate = $('#delete-tag-modal').html();

        function toggle () {
            $('body').trigger('hide-popovers')
                .trigger('attach-popover-overlay', {el: el});

            el.removeClass('hidden');
        }

        function close (e) {
            if (e) {
                e.preventDefault();
            }

            $('body').trigger('hide-popovers');
        }

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

        function deleteTag (e) {
            e.preventDefault();

            var target = $(e.target),
                tag = target.parent(),
                tagId = tag.attr('data-tag-id'),
                tagText = tag.find('.tag-filter').text().trim(),
                bmTags = $('.bookmark [data-tag-id=' + tagId + ']'),
                deleteConfirm = new ModalConfirmView({
                    html: _.template(deleteTemplate, {tagText: tagText})
                });

            deleteConfirm.render();
            bmTags.addClass('is-filtered');

            function deleteConfirmed () {
                tag.addClass('pending-removal');

                // Remove the tags from any visible bookmarks
                bmTags.addClass('pending-removal');

                setTimeout(function () {
                    tag.remove();
                    bmTags.remove();
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

            function deleteDenied () {
                bmTags.removeClass('is-filtered');
            }

            deleteConfirm.ask({
                'confirm': deleteConfirmed,
                'deny': deleteDenied
            });
        }

        // When a tag is added or removed this event will be triggered.
        $('body').on('tags-updated', function () {
            requestTagcloud(function (res) {
                var html = '';

                if (res.length) {
                    _.each(res, function (tag) {
                        html += _.template(tagTemplate, tag);
                    });
                }
                else {
                    html = zeroStateTemplate;
                }

                el.find('.tags-list').html(html);
            });
        });

        el.on('click', '.close-btn', close);
        el.on('click', '.tag-delete', deleteTag);

        return {
            toggle: toggle
        };
    };

    return TagsListView;
});