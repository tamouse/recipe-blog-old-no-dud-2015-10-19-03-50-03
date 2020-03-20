define([
    'jquery'
],
function ($) {
    var ModalConfirmView = function (options) {
        var body = $('body'),
            opts = options || {},
            el = null,
            template = '<div class="modal modal-confirm hidden"><div class="modal-cover"></div><div class="modal-content"></div></div>',
            html = opts.html || null;

        function open () {
            body.append(el);

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

            // Using detach so we don't have do un/re-bind events
            el.detach();
        }

        function ask (options) {
            opts = $.extend(true, opts, options);
            open();
        }

        function answer (e) {
            if (e.preventDefault) {
                e.preventDefault();
            }

            var val = $(e.currentTarget).val();

            if ($.isFunction(opts[val])) {
                opts[val]();
            }

            close();
        }

        function init () {
            el = $(template);
            el.on('click', '.confirm-control', answer);
        }

        init();

        return {
            init: init,
            close: close,
            render: render,
            open: open,
            ask: ask
        };
    };

    return ModalConfirmView;
});