define([
    'jquery'
],
function ($) {
    var ModalView = function (options) {
        var body = $('body'),
            opts = options || {},
            el = null,
            template = '<div class="modal hidden"><a class="modal-close-btn">&times;</a><div class="modal-cover"></div><div class="modal-content"></div></div>',
            html = opts.html || null;

        function open () {
            body.append(el);
            el.on('click', '.modal-close-btn', close);
            el.on('click', '.modal-cover', close);

            body.on('keydown.modal', function (e) {
                if (e.which === 27) {
                    close();
                }
            });

            if (opts.baseClass) {
                el.addClass(opts.baseClass);
            }

            el.removeClass('hidden');
        }

        function render () {
            el.find('.modal-content').html(html);
        }

        function close (e) {
            if (e) {
                e.preventDefault();
            }

            body.off('keydown.modal');
            el.off().remove();
        }

        function init () {
            el = $(template);
        }

        init();

        return {
            init: init,
            close: close,
            render: render,
            open: open
        };
    };

    return ModalView;
});