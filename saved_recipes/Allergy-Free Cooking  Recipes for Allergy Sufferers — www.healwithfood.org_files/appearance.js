define(['jquery', 'jqueryui/slider', 'utils'], function ($, $ui, Utils) {
    var AppearanceView = function (options) {
        var opts = options || {},
            el = opts.el || $('.flyout-appearance'),
            forms = el.find('form'),
            utils = new Utils(),
            // NOTE: This is pretty rough
            cloudHrefTemplate = '//cloud.typography.com/6996032/$fontId/css/fonts.css',
            fontIds = {
                'font-whitney': '793662',
                'font-mercury': '615662'
            };

        function modifyAppearance (opt) {
            var classes = utils.getUpdatedClasses(opt.option + '-'),
                fontLoadTimeout = 0;

            classes.push(opt.val);

            if (opt.option === 'font') {
                // Check to see if the font <link> is not already in the DOM.
                if (!$('link[data-css=' + opt.val + ']').length) {
                    // If it isn't need to create a <link> elem for it, which
                    // will load it.
                    $('head').append($('<link/>', {
                        'href': cloudHrefTemplate.replace('$fontId', fontIds[opt.val]),
                        'rel': 'stylesheet',
                        'data-css': opt.val
                    }));

                    // This is a total guess based off how long it was taking
                    // to load with an empty cache locally.
                    fontLoadTimeout = 500;
                }
            }

            // Very crud way to try and avoid a flash of the fallback font when
            // loading a H+FJ font for the first time.
            setTimeout(function () {
                $('html').attr('class', classes.join(' '));
            }, fontLoadTimeout);
        }

        function updateAppearanceSettings (opts, callback) {
            $.ajax({
                type: 'post',
                url: opts.url,
                data: opts.data,
                error: function (jqxhr) {
                    console.log(jqxhr);
                }
            });
        }

        function submit (e) {
            e.preventDefault();

            var el = $(e.target),
                serial = el.serialize(),
                optVal = serial.substring(serial.lastIndexOf('=') + 1, serial.length),
                opt = optVal.split('-')[0],
                settings = {};

            // Go ahead and update the appearance in the UI, don't wait for the
            // server response in case it doesn't make it.
            modifyAppearance({
                option: opt,
                val: optVal
            });

            // The server is expecting a JSON object where the key is the style
            // prop; e.g., {size: font-large}
            settings[opt] = optVal;

            updateAppearanceSettings({
                url: el.attr('action'),
                data: settings
            });
        }

        // NOTE: BEWARE! HERE BE DRAGONS!
        // TODO: Slay dragons by making this not so crazy-pants.
        function updateSliderUI (optionParent) {
            var select = optionParent.find('.controls-slider'),
                sliderParent = optionParent.find('.appearance-slider'),
                sliderActiveTrack = sliderParent.find('.slider-active .slider-track');

            var numOpts = select.find('option').length,
                width = (100 / numOpts - 1) * (select[0].selectedIndex),

                // magic number offset.
                offset = select[0].selectedIndex * 7.5;

            sliderActiveTrack.css('width', (width + offset) + '%');
            sliderParent.attr('data-selected-index', select[0].selectedIndex);
        }

        function formFieldChanged (e) {
            var el = $(e.target),
                isSlider = el.parents('.appearance-option').find('.appearance-slider').length;

            el.parents('form').submit();

            if (isSlider) {
                updateSliderUI(el.parents('.appearance-option'));
            }
        }

        // Make sure the settings forms have the correct items selected
        function setSelectedOpts () {
            var classes = $('html').attr('class').split(' ');

            _.each(classes, function (val) {
                var el = $('[value=' + val + ']');

                if (el.length > 0) {
                    if (el.is('input:radio')) {
                        el.attr('checked', 'checked');
                    }
                    else {
                        el.parent().val(val);
                    }
                }
            });
        }

        function initOptionSliders () {
            var selects = $('.controls-slider');

            _.each(selects, function (el) {
                var select = $(el),
                    sliderContainer = select.parent().next(),
                    slider = sliderContainer.find('.slider')
                    .slider({
                        min: 1,
                        max: select.find('option').length,
                        range: 'min',
                        value: select[0].selectedIndex + 1,
                        slide: function (e, ui) {
                            select[0].selectedIndex = ui.value - 1;
                            select.change();
                        }
                    }),
                    valueRange = _.range(slider.slider('option', 'max'));

                select.on('change', function (e) {
                    slider.slider('value', this.selectedIndex + 1);
                });

                sliderContainer.on('click', '.slider-control', function (e) {
                    e.preventDefault();
                    var el = $(e.target),
                        curVal = select[0].selectedIndex,
                        newVal = (el.hasClass('increase')) ? curVal + 1 : curVal - 1;

                    if (_.indexOf(valueRange, newVal) > -1) {
                        select[0].selectedIndex = newVal;
                        select.change();
                    }
                });

                select.parents('form').addClass('hidden');
                sliderContainer.removeClass('hidden');

                updateSliderUI($(el).parents('.appearance-option'));
            });
        }

        forms.on('submit', submit);
        el.find('input, select').on('change', formFieldChanged);

        return {
            init: function () {
                setSelectedOpts();
                initOptionSliders();
            }
        };
    };

    return AppearanceView;
});