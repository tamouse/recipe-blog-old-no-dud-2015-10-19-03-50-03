var LkphStickyNav;
LkyphStickyNav = (function() {
  var defaults = {
  };

  function LkyphStickyNav(scope, options) {
    this.scope = scope;
    this.ele = this.scope.get(0);
    this.$fix_ele = $(options.elementToFix || 'body > header > nav');
    this.$body = $('body');

    var _this = this;
    $(window).scroll(function() {
      // Wrapping hack to prevent it from breaking scripts on mobile
      try {
        if (_this.ele.getBoundingClientRect().bottom < 0) {
          /* Quick & dirty hack to only run on desktop while 
             popping fixed on the correct div (navbar-fixed)
             ** modified since by m4rk3r 1.5.15 **
          */
          if(!_this.$fix_ele.hasClass('navbar-fixed')){
              _this.$fix_ele.addClass("navbar-fixed");
              _this.$body.addClass("navbar-fix");
          }
        } else {
          _this.$fix_ele.removeClass("navbar-fixed");
          _this.$body.removeClass("navbar-fix");
        }
      } catch (e) {
      }
    });
  }
  return LkyphStickyNav;
})();

(function($) {
  return $.fn.stickynav = function(scope, options) {
    return new LkyphStickyNav(this, scope, options);
  };
})(jQuery);

var LkyPhScroll;
LkyPhScroll = (function() {
  var defaults = {
    'article': false
  };

  function LkyPhScroll(scope, options) {
    var _this    = this;
    this.scope   = scope;
    this.page    = 1;
    this.loaded  = function(el) { },
    this.options = $.extend({}, defaults, options);
  }

  LkyPhScroll.prototype.run = function() {
    var t = this;
    t.set_offset_checkpoint();
    t.scroll_offset_check();

    t.handler = function() {
      t.scroll_offset_check();
    }
    $(window).bind("scroll", t.handler);
    return t;
  };

  LkyPhScroll.prototype.scroll_offset_check = function() {
    var _this = this;
    if (_this.offsetCheckpoint < _this.current_offset()) {
      if (!_this.loading) {
        _this.load_more();
        _this.set_offset_checkpoint();
      }
    }
  }

  LkyPhScroll.prototype.set_offset_checkpoint = function() {
    this.offsetCheckpoint = this.calculate_offset_checkpoint(this.scope) - 50;
    //console.log("Set offset checkpoint to " + this.offsetCheckpoint);
  }

  LkyPhScroll.prototype.calculate_offset_checkpoint = function() {
    var _this = this;
    var eOffset = jQuery(_this.scope).offset();
    var eHeight = jQuery(_this.scope).height();
    return eOffset.top + eHeight;
  }

  LkyPhScroll.prototype.current_offset = function() {
    var wHeight = jQuery(window).height();
    var wOffset = jQuery(window).scrollTop();
    var x = wHeight + wOffset;
    return x;
  }

  LkyPhScroll.prototype.append = function(content) {
    var _this = this;
    jQuery(_this.scope).append(content);
  };

  LkyPhScroll.prototype.path = function() {
    var type = jQuery(this.scope).attr('data-type');
    var ctgy = jQuery(this.scope).attr('data-ctgy');
    var base = "/wp-admin/admin-ajax.php?action=lkyph-paginate";

    base += "&page="+this.page;

    if (type !== "" && type !== "undefined") {
      base += "&type="+type;
    }

    if (this.options.article) {
      var id = jQuery(this.scope).find("article:last").attr('data-id');
      if (id !== "" && id !== "undefined") {
        base += "&id="+id;
      } else { 
        this.discontinue();
        return false;
      }
    }

    if (ctgy !== "" && ctgy !== "undefined") {
      base += "&ctgy="+ctgy;
    }
    return base;
  }

  LkyPhScroll.prototype.discontinue = function() {
    var _this = this;
    jQuery(window).unbind('scroll', _this.handler);
    jQuery("section.endless-single").css("margin-bottom", "-90px");
  }

  LkyPhScroll.prototype.load_more = function() {
    if (this.loading)
      return;
    //console.log("Setting loading variable");
    this.loading = true;
    this.page = this.page + 1;
    var path = this.path();
    //console.log("Load More! " + path);

    var _this = this;
    var path = this.path();

    if (path) {
      jQuery.ajax(this.path(), {
        complete: function() {
          _this.loading = false;
          lkyph_init_ads();
        },
        success: function(data) {
          if (data === "") {
            _this.discontinue();
          } else {
            var el = _this.append(data);
            try {
              _this.options.loaded(el);
            } catch (e) {
            }
          }
        }
      });
    }
  }

  return LkyPhScroll;
})();

(function($) {
  return $.fn.endlessScroll = function(options) {
    return new LkyPhScroll(this, options).run();
  };
})(jQuery);
