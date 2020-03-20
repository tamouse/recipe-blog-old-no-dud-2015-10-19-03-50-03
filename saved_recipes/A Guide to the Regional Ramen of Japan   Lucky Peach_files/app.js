jQuery(function() {
  lkyph_mobile_detect();
  lkyph_newsletter();
  lkyph_stickynav();
  lkyph_containedSticky();
  lkyph_endless();
  lkyph_sink_hover();
  lkyph_footnote();
  lkyph_recipe_readmore();
  lkyph_init_ads();
  lkyph_issues_carousel();
  $(".dropdown-toggle").dropdown();
  lkyph_force_close_search_overlay();
});

function lkyph_issues_carousel() {
  if ($("#issues-carousel").length > 0) {
    $("#issues-carousel .carousel-control.left").hide();
    $("#issues-carousel").on('slid.bs.carousel', '', function() {
      var _this = $(this);
      var inner = _this.find(".carousel.inner");
      
      if (inner.find(".item:first").hasClass("active")) {
        _this.find(".carousel-control.left").hide();            
        if (inner.find(".item").length > 1) {
          _this.find(".carousel-control.right").show();
        }
      } else if (inner.find(".item:last").hasClass("active")) {
        _this.find(".carousel-control.right").hide();            
        if (inner.find(".item").length > 1) {
          _this.find(".carousel-control.left").show();
        }
      } else {
        _this.find(".carousel-control").show();
      }
    });
  }
}

function lkyph_mobile_detect() {
  var md = new MobileDetect(window.navigator.userAgent);
  if (md.mobile()) {
    $("html").addClass('mobile');
  } else {
    $("html").addClass('desktop');
  }
}

// Close search overlay when clicking outside of it
function lkyph_force_close_search_overlay() {
  jQuery("#search-overlay").bind("click", function(e) {
    if (jQuery(e.target).parents("#search-overlay .search-form").length <= 0) {
      jQuery("#search-overlay").removeClass("in");
    }
  });
}

function lkyph_containedSticky() {
  jQuery("html.desktop .sticky-children:not(.sticky-container-enabled)").stickycontainer({
    offset: 40
  });
}

function lkyph_stickynav() {
  $("html.desktop header:first-of-type").stickynav({
    elementToFix: "body > header > nav"
  });
}

function lkyph_footnote() {
  $("body").on("touchstart click", "article a.footnote", function(e) {
    e.stopPropagation(); 
    e.preventDefault();

    var t  = $(this);
    var needToOpen = !(t.hasClass('on'));

    $(".footnote-display.on").removeClass('on');
    $("a.footnote.on").removeClass('on');

    if (needToOpen) {
      var id = t.attr('data-footnote');
      var el = $("#"+id);
      t.addClass('on');
      el.addClass('on');
    }
  });
}


var adInc = 0;
function lkyph_ad_inc() {
  return "ad_" + (++adInc);
}

function lkyph_init_ads() {
  $("html.desktop .adbar.adbar2.desktop:not(.adbar-enabled), html.mobile .adbar.adbar2.mobile:not(.adbar-enabled)").each(function() {
    var t   = $(this);
    var ad = t.attr('data-ad');
    var x  = adSlot[ad];
    var id = lkyph_ad_inc();

    t.attr('id', id);
    t.addClass("adbar-enabled");

    googletag.cmd.push(function() {
      var slot = googletag.defineSlot(x[0], adSizes[x[1]], id);
      slot.addService(googletag.pubads());
      //slot.setCollapseEmptyDiv(true);
      googletag.display(id);
      googletag.pubads().refresh([slot]);
    });
  }); 
}

function lkyph_init_feature_ads() {
  lkyph_init_ads();
}

function notify(foo) {
  if (false) {
    if (console && console.log) { 
      console.log(foo);
    }
  }
}

function lkyph_loaded_article() {
  // Enable sticky container for new article
  notify("Initilzing sticky container");
  lkyph_containedSticky();
  notify("Initilzied sticky container");

  // Dynamically create and insert right sidebar ad
  // Also updates ads between any type of articles
  notify("Initializing ads");
  lkyph_init_ads();
  notify("Initialized ads");

  $(".endless-single > article:not(.waypoint-enabled)").each(function() {
    var t = $(this);
    t.addClass('waypoint-enabled');
    var inview = new Waypoint.Inview({
      element: t[0],
      enter: function(direction) {
        var el   = $(this.element);
        var id   = el.attr('data-curid');
        var href = el.attr('data-location');
        window.history.replaceState(id, 'Foo', href);
        googletag.pubads().refresh();
        /* re-trigger google anayltics */
        //_gaq.push(['_trackPageview', href]);
        _gaq.push(['_trackPageview', window.location.pathname]);
        /* ... and quantcast */
        _qevents.push({ qacct:"p-H1auJBLVnTqQW" });
        /* ... and comscore */
        _comscore.push({ c1: "2", c2: "19139966" });
      }
    });
    notify("Waypoint triggered");
  });

  var articles = $(".endless-single > article");
  if (articles.length > 10) {
    articles[0].remove();
  }

}

function lkyph_endless() {
  if (jQuery("section.endless-single").length > 0) {
    jQuery("section.endless-single").endlessScroll({
      "article": true,
      loaded: function(el) {
        lkyph_loaded_article();
      }
    });
  } else {
    jQuery(".btn.more").on("touchstart click", function(e) {
      e.preventDefault();
      e.stopPropagation();

      jQuery(this).hide();
      jQuery(".endless").endlessScroll({
        // TODO Setup a callback handler and move lkyph_init_ads out of plugin and into here
      });

      return false;
    });
  }
}


function lkyph_email_valid(email) {
  var testexp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  return testexp.test(email);
}

function lkyph_newsletter() {
  var sel = '.newsletter-signup';
  var sel_a = ".cta-newsletter";
  var sel_m = ".message";
  var sel_f = "form";

  // On CTA click hide CTA and display form
  jQuery(sel_a).on("click", function(e) {
    e.preventDefault();
    e.stopPropagation();

    jQuery(this).hide().parents(sel).find(sel_f).show().find("input.email").focus();

    return false;
  });

  jQuery(sel + " form input.email").on("change focus blur keyup", function() {
    var t = jQuery(this);
    if (lkyph_email_valid(t.val())) {
      t.parents("form").find("button").css("visibility", "visible").prop("disabled", false);
    } else {
      t.parents("form").find("button").css("visibility", "hidden").prop("disabled", true);
    }
  });

  // Hijack form submit
  jQuery(sel).find(sel_f).on("submit", function(e) {
    e.preventDefault();
    e.stopPropagation();

    var f = jQuery(this);
    f.find("button").css("visibility", "hidden");

    jQuery.ajax({
      url:  f.attr('action'),
      type: f.attr('method'),
      data: f.serialize(), 
      dataType: 'json',
      success: function(data) {
        if (data['status'] == 'ok') {
          f.hide()[0].reset();
          f.parents(sel).find(sel_m)
          f.parents(sel).find(sel_m).html("Thanks! A confirmation email has been sent to that address.").show();
        } else {
          f.hide()[0].reset();
          f.parents(sel).find(sel_m).html("Something isn't working on our end. Please try again shortly.").show();
          setTimeout(function() { 
            f.parents(sel).find(sel_m).hide().html(""); 
            f.parents(sel).find(sel_a).show(); 
          }, 5000);
        }
      },
      error: function() {
        f.hide()[0].reset();
        f.parents(sel).find(sel_m).html("Something isn't working on our end. Please try again shortly.").show();
        setTimeout(function() { 
          f.parents(sel).find(sel_m).hide().html(""); 
          f.parents(sel).find(sel_a).show(); 
        }, 5000);
      }
    });

    return false; 
  });

}

// Toggle images based on which article title has hover
function lkyph_sink_hover() {
  jQuery(".sink-related a[data-img]").on("mouseover", function(e) {
    try {
      var t = jQuery(this);
      t.parents(".sink-related").find(".previews img").removeClass("on");
      t.parents(".sink-related").find(".previews img[id=img_"+t.attr('data-img')+"]").addClass("on");
    } catch (e) { }
  });
}

function lkyph_recipe_readmore() {
  $("body").on("touchstart click", ".recipe-content .act .more", function(e) {
    e.preventDefault();
    e.stopPropagation();

    $(this).hide();
    
    $(this).parents("article.recipe").find(".readmore").slideToggle();

    return false;
  });
}

function lkyph_click_subscribe_cta() {
  jQuery("subscribe.full-width").on("click", function() {
    var t = $(this);
    var a = t.find(".cta > a");
    if (a.length > 0 && a.attr('href') !== "") {
      window.location = a.attr('href');
    }
  });
}

