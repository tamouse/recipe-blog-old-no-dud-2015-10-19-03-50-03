define([
    'jquery',
    'modal-confirm'
],
function ($, ModalConfirmView) {
    var RecoControls = function (options) {
        var body = $('body'),
            opts = options || {},
            el = opts.el || $('body'),
            allowDefault = false,
            deleteConfirm = new ModalConfirmView({
                html: $('#delete-reco-modal').html()
            });

        deleteConfirm.render();

        el.on('submit', '.delete-recommendation', function (e) {
            var target = $(e.target),
                recoEl = target.parents('.recommendation');

            // On the single reco view we want to submit the form normally, if
            // they've confirmed the delete. See below.
            if (allowDefault) {
                return true;
            }

            e.preventDefault();

            function deleteConfirmed () {
                // Deleting an article from a single Reco view should direct you
                // back to your Recommended list
                if (body.hasClass('single-recommendation')) {
                    allowDefault = true;
                    target.trigger('submit');
                }
                else {
                    $.ajax({
                        type: 'POST',
                        url: target.attr('action'),
                        success: function (res) {
                            recoEl.addClass('pending-removal');

                            setTimeout(function () {
                                recoEl.remove();
                            }, 200);
                        },
                        error: function (jqxhr) {
                            console.log('error', jqxhr);
                        }
                    });
                }
            }

            deleteConfirm.ask({
                'confirm': deleteConfirmed
            });

            // this is a weird aesthetic thing. In the latest Chrome,
            // they've started applying focus to any button that is
            // clicked and it looks bad. I don't want to remove the
            // default outline for :focus though.
            target.find('[type=submit]').blur();
        });

        return {};
    };

    return RecoControls;
});
