//var baseURL = 'http://paywall.sg/';
var baseURL = 'https://paywall.subscriptiongenius.com/';
//var baseURL = '/';

(function() {

    // Localize jQuery variable
    var jQuery;

    /******** Load jQuery if not present *********/
    if (window.jQuery === undefined || window.jQuery.fn.jquery !== '1.4.2') {
        var script_tag = document.createElement('script');
        script_tag.setAttribute("type","text/javascript");
        script_tag.setAttribute("src",
            "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
        if (script_tag.readyState) {
            script_tag.onreadystatechange = function () { // For old versions of IE
                if (this.readyState == 'complete' || this.readyState == 'loaded') {
                    scriptLoadHandler();
                }
            };
        } else {
            script_tag.onload = scriptLoadHandler;
        }
        // Try to find the head, otherwise default to the documentElement
        (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
    } else {
        // The jQuery version on the window is the one we want to use
        jQuery = window.jQuery;
        main();
    }

    /******** Called once jQuery has loaded ******/
    function scriptLoadHandler() {
        // Restore $ and window.jQuery to their previous values and store the
        // new jQuery in our local jQuery variable
        jQuery = window.jQuery.noConflict(true);
        // Call our main function
        main();
    }

    /******** Our main function ********/
    function main() {

        var sessionID;
        var isMobile;


        jQuery(document).ready(function($)
        {

            $('#sg_logout,.sg_logout').live('click', function () {
                setCookie('subscriptiongenius_api', null, 0);
                setCookie('subscriptiongenius_admin', null, 0);
                setCookie('subscriptiongenius_api', null, 0);
                location.reload();
            });

            if(getQueryVariable('sgpassid'))
            {
                setCookie('subscriptiongenius_api', getQueryVariable('sgpassid'), 1);
                setCookie('subscriptiongenius_admin', 1, 1);

                location.href = document.URL.substring(0,document.URL.indexOf("?"));
            }

            var surveyID = null

            surveyID = getQueryVariable('sgSurveyID');

            $('#sg_page_url').keyup(function () {
                return false;
            });

            $.fn.updateSecurity = function ()
            {
                switch($(this).val())
                {
                    case 'none':
                    case 'public':
                        $(this).closest('form').find('.sg_subscription,.sg_register').hide();
                        break;

                    case 'register':
                        $(this).closest('form').find('.sg_subscription').hide();
                        $(this).closest('form').find('.sg_register').show();
                        break;

                    case 'subscription':
                        $(this).closest('form').find('.sg_register').hide();
                        $(this).closest('form').find('.sg_subscription').show();
                        break;
                }
            };


            /******* Load CSS *******/
            var css_link = $("<link>", {
                rel: "stylesheet",
                type: "text/css",
                href: baseURL + "media/paywall.css"
            });

            css_link.appendTo('head');

            var data = "?url=" + encodeURI(document.URL);
            data = data + "&pageTitle=" + encodeURI($('title').html());
            data = data + "&sgSurveyID=" + getQueryVariable('sgSurveyID');

            if(getCookie('subscriptiongenius_api'))
                data = data + '&sgsID=' + getCookie('subscriptiongenius_api');


            data = data + "&date=" + encodeURI($('meta[name="date"]').attr('content'));

            if(getCookie('subscriptiongenius_admin') == '1')
            {
                $('#sg_radio_section,#sg_radio_page').live('change', function () {

                    if($('#sg_radio_section').is(':checked'))
                    {
                        $('#sg_section_security_page').hide();
                        $('#sg_section_security_section').show();
                    }
                    else
                    {
                        $('#sg_section_security_page').show();
                        $('#sg_section_security_section').hide();
                    }
                });

                $('body').prepend('<div id="sg_security_panel" class="cleanslate"></div>');


                $('.sg_security_panel').submit(function (e) {
                    e.preventDefault();
                });

                //SAVE SECURITY ACTION
                $('.sg_save_security_button').live('click', function () {

                    var saveData = $(this).parent('form').serialize();
                    var button = $(this);

                    button.val('Saving...');

                    $.ajax({
                        url: baseURL + 'admin/save.php?sgsID=' + getCookie('subscriptiongenius_api'),
                        type: "POST",
                        cache: false,
                        data: saveData,
                        xhrFields: {
                            withCredentials: true
                        },
                        crossDomain: false,
                        success: function (returnData)
                        {
                            var data = jQuery.parseJSON(returnData)

                            if(data.success)
                                button.val('Updated');
                            else
                            {
                                button.val('Save Failed');
                                alert(data.message);
                            }

                            button.delay(2000).fadeOut();

                            window.setTimeout(function () {
                                button.val('Save');
                            }, 3000);

                        }
                    });

                });

                var data = "?url=" + encodeURI(document.URL);

                if(getCookie('subscriptiongenius_api'))
                    data = data + '&sgsID=' + getCookie('subscriptiongenius_api');

                //PULL MENU FOR PAGE
                $.ajax({
                    url: baseURL + 'admin/' + data,
                    type: "POST",
                    cache: false,
                    xhrFields: {
                        withCredentials: true
                    },
                    crossDomain: false,
                    success: function (returnData)
                    {
                        var data = jQuery.parseJSON(returnData)

                        if(data.html)
                            $('#sg_security_panel').append(data.html);


                        $('.sg_securityType').change(function () {
                            $(this).updateSecurity();
                        });

                        $('.sg_securityType').each(function () {
                            $(this).updateSecurity();
                        });


                        $("#sg_security_logo").toggle(function() {
                            $('#sg_security_panel').animate({ height: 40 }, 300);
                            setCookie('sgPanelOpen', 'closed', 1);
                            $('#sg_security_panel_holder').css('height', '100%');

                        }, function() {
                            $('#sg_security_panel').animate({ height: ($(window).height() - 20) }, 300);
                            setCookie('sgPanelOpen', 'open', 1);
                            $('#sg_security_panel_holder').css('height', $(window).height() - 40);
                        });

                        if(getCookie('sgPanelOpen') == 'closed')
                        {
                            $('#sg_security_panel').css('height', '40px');
                        }
                        else
                        {
                            $('#sg_security_panel').animate({ height: ($(window).height() - 20) }, 300);
                            setCookie('sgPanelOpen', 'open', 1);
                        }
                    }
                });
            }
            else
            {
                $.ajax({
                    url: baseURL + 'index.php' + data,
                    type: "POST",
                    cache: false,
                    xhrFields: {
                        withCredentials: true
                    },
                    crossDomain: false,
                    success: function (returnData) {
                        var data = jQuery.parseJSON(returnData)

                        if(data != null)
                        {
                            if(data.sessionID)
                            {
                                sessionID = data.sessionID;
                                setCookie('subscriptiongenius_api', sessionID, 100);
                            }

                            if(data.html)
                                $('body').prepend(data.html);

                            isMobile = data.isMobile;

                            if(data.subscriberID == null)
                            {
                                $('.sg_logout').hide();
                            }
                            else
                            {
                                $('.sg_logout').show();
                            }

                            if(data.lockPage)
                            {
                                if(data.isMobile)
                                {
                                    location.href = data.mobileURL;
                                    return;
                                }

                                disable_scroll();
                                $('html,body').animate({ scrollTop: 0 }, 'slow');
                                $('#sg_screen_lock').show();
                                $('#sg_login_form').show();
                                $('#sg_paywall_login').show();
                                $('#sg_login_subscription').hide();

                                var height = $(window).height() / 2 - 200;
                                $('#sg_paywall_login').css('top', height + 'px');


                                $(window).scroll(function () {
                                    $('html,body').animate({ scrollTop: 0 }, 0);
                                });
                            }
                            else
                            {
                                if(surveyID)
                                {
                                    showSurvey(surveyID);
                                }
                            }

                            if(data.message)
                            {
                                displayMessage(data.message);
                            }
                        }
                        else
                        {
                            if(surveyID)
                            {
                                showSurvey(surveyID);
                            }
                        }
                    }
                });
            }

            $('.sg_security_panel select,.sg_security_panel input[type="checkbox"]').live('change', function () {
                $(this).closest('.sg_security_panel').find('.sg_save_security_button').fadeIn();
            });

            $('a').each(function () {

                var tmpURL = $(this).attr('href');


                if(strpos(tmpURL, 'checkout.subscriptiongenius.com') > 0)
                {
                    $(this).click(function (e) {
                        e.preventDefault();

                        var height = $(window).height();
                        var top = 0;


                        //$('html,body').animate({ scrollTop: 0 }, 'slow');
                        $('#sg_screen_lock').show();
                        $('#sg_login_form').show();


                        if(strpos(tmpURL, '?'))
                            tmpURL = tmpURL + "&paywall=true";
                        else
                            tmpURL = tmpURL + "?paywall=true";


                        if(isMobile)
                        {
                            location.href = tmpURL;
                            return;
                        }
                        else
                            $('#sg_paywall_login').attr('src', tmpURL);


                        $('#sg_paywall_login').css('top', ((height) / 2) + 'px')
                        $('#sg_paywall_login').css('height', '10px').show();

                        $('#sg_login_subscription').hide();

                        $('#sg_paywall_login').animate({
                            top: 0 + 'px',
                            height: height + 'px'
                        }, 500);



                        $('#sg_screen_lock').click(function () {
                            $('#sg_screen_lock').hide();
                            $('#sg_login_form').hide();
                            $('#sg_paywall_login').hide();
                        });

                    });
                }
            });

            window.addEventListener("message", receiveMessage, false);

            function receiveMessage(event)
            {
                if (event.data == "sgCheckout")
                {
                    var height = $(window).height();
                    //$('#sg_paywall_login').css('height', height + 'px');

                    var top = 0;
                    //$('#sg_paywall_login').css('top', top + 'px');

                    $('#sg_paywall_login').animate({
                        top: top + 'px',
                        height: height + 'px',
                        borderTop: '0px',
                        borderBottom: '0px'
                    }, 500);
                }

                //HIDE WINDOW
                if (event.data == "sgClose")
                {
                    enable_scroll();
                    $('#sg_screen_lock').fadeOut();
                    $('#sg_login_form').fadeOut();
                    $('#sg_paywall_login').fadeOut();
                    $('#sg_login_subscription').fadeOut();
                    $(window).unbind("scroll");
                }
            }
        });


        var keys = [37, 38, 39, 40];

        function preventDefault(e) {
            e = e || window.event;
            if (e.preventDefault)
                e.preventDefault();
            e.returnValue = false;
        }

        function keydown(e) {
            for (var i = keys.length; i--;) {
                if (e.keyCode === keys[i]) {
                    preventDefault(e);
                    return;
                }
            }
        }

        function wheel(e) {
            preventDefault(e);
        }

        function disable_scroll() {
            if (window.addEventListener) {
                window.addEventListener('DOMMouseScroll', wheel, false);
            }
            window.onmousewheel = document.onmousewheel = wheel;
            document.onkeydown = keydown;
        }

        function enable_scroll() {
            if (window.removeEventListener) {
                window.removeEventListener('DOMMouseScroll', wheel, false);
            }
            window.onmousewheel = document.onmousewheel = document.onkeydown = null;
        }

        function setCookie(cname,cvalue,exdays)
        {
            var d = new Date();
            d.setTime(d.getTime()+(exdays*24*60*60*1000));
            var expires = "expires="+d.toGMTString();
            document.cookie = cname + "=" + cvalue + ";path=/;" + expires;
        }

        function getCookie(cname)
        {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for(var i=0; i<ca.length; i++)
            {
                var c = ca[i].trim();
                if (c.indexOf(name)==0) return c.substring(name.length,c.length);
            }
            return "";
        }

        function getQueryVariable(variable)
        {
            var query = window.location.search.substring(1);
            var vars = query.split("&");
            for (var i=0;i<vars.length;i++) {
                var pair = vars[i].split("=");
                if(pair[0] == variable){return pair[1];}
            }
            return(false);
        }

        function closeAll()
        {
            enable_scroll();
            $('#sg_screen_lock').hide();
            $('#sg_paywall_login').hide();
        }

        function showSurvey(surveyID)
        {
            $('#sg_paywall_login').attr('src', baseURL + "/survey/?id=" + surveyID);

            disable_scroll();

            var height = $(window).height();

            $('#sg_paywall_login').css('top', ((height) / 2) + 'px')
            $('#sg_paywall_login').css('height', '10px').show();

            $('#sg_login_subscription').hide();

            $('#sg_paywall_login').animate({
                top: 0 + 'px',
                height: height + 'px'
            }, 500);

            $('#sg_screen_lock').show();

            $('#sg_screen_lock').click(function () {
                $('#sg_screen_lock').hide();
                $('#sg_login_form').hide();
                $('#sg_paywall_login').hide();
                enable_scroll();
            });
        }

        function displayMessage(message)
        {
            $('body').append('<div style="font-size:10px; position:fixed; width:100%; color:#FFF; font-family:arial; bottom:0px; left:0px; z-index: 9999; padding:10px; background-color:#000;">' + message + '</div>');
        }
    };





})();


function strpos (haystack, needle, offset) {
    var i = (haystack+'').indexOf(needle, (offset || 0));
    return i === -1 ? false : i;
}




