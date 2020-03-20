define(['jquery'], function ($) {
    var Utils = function (options) {
        return {
            getUpdatedClasses: function (classPrefixes) {
                var classes = _.map($('html').attr('class').split(' '), function (item) {
                    if (!item.match(classPrefixes)) {
                        return item;
                    }
                    else {
                        return '';
                    }
                });

                return classes;
            },

            getScreenSize: function () {
                if (!window.getComputedStyle) {
                    return null;
                }

                return window.getComputedStyle(document.body, ':after')
                    .getPropertyValue('content')
                    // Doing this for IE9. When it gets the string, it
                    // includes " and ". Weird. Dumb.
                    .replace(/\"/g, '');
            },

            getCookieByName: function (name) {
                var parts = document.cookie.split(name + '=');

                if (parts.length === 2) {
                    return parts.pop().split(';').shift();
                }
                else {
                    return null;
                }
            },

            // Users have a number of key:value settings that we can use to
            // customize their experience. Use this to set each key.
            // @param setting {obj}, key:value pair to set. Can only be one.
            setUserKeyValue: function (setting, callback) {
                if (!$.isFunction(callback)) {
                    callback = $.noop;
                }

                $.ajax({
                    url: '/account/ajax/setkv',
                    type: 'POST',
                    data: JSON.stringify(setting),
                    success: function (res) {
                        callback(res);
                    }
                });
            },

            isMethodCsrfSafe: function (method) {
                // these HTTP methods do not require CSRF protection
                return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
            },

            csrfProtect: function () {
                var utils = this,
                    csrftoken = utils.getCookieByName('csrftoken');

                if (csrftoken) {
                    $.ajaxSetup({
                        crossDomain: false,
                        beforeSend: function (xhr, settings) {
                            if (!utils.isMethodCsrfSafe(settings.type)) {
                                xhr.setRequestHeader('X-CSRFToken', utils.getCookieByName('csrftoken'));
                            }
                        }
                    });
                }
                else {
                    console.log('No CSRF token found');
                }
            }
        };
    };

    return Utils;
});