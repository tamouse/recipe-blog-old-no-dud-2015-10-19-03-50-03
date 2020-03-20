var LkphStickyContainer;
LkyphStickyContainer = (function() {
  var defaults = {
  };

  function LkyphStickyContainer(scope, options) {
    var _this    = this;
    _this.scope   = scope;
    _this.options = $.extend({}, defaults, options);
    $(scope).addClass("sticky-container-enabled");

    $(window).scroll(function() {
      // FIXME Cheap hack to fix navbar from hiding when full screen navigations are open
      if (jQuery("body > header .navbar-collapse.in").length > 0)
        return;

      var _top = jQuery(window).scrollTop();
      _this.scope.each(function(i) {
        // these vars should probably be set up on init
        // no need to use jquery to grab these each time the scroll event fires 
        var _obj    = jQuery(this);
        var _parent = _obj.parents('.sticky-area');
        var _ptop   = _parent.offset().top;

        var top_bound = _ptop - options.offset;
        var bottom_bound = _ptop + _parent.outerHeight() - _obj.outerHeight() - options.offset;

        if (_top < top_bound) {
          _obj.css({
            "position": "absolute",
            "top": 0,
            "bottom": "auto",
          });
        } else if(_top >= top_bound && _top < bottom_bound) {
          _obj.css({
            "position": "fixed",
            "top": options.offset + "px",
            "bottom": "auto",
          });
        } else {
          _obj.css({
            "position": "absolute",
            "top": "auto",
            "bottom": 0,
          });
        }
      });
    });
  }
  return LkyphStickyContainer;
})();

(function($) {
  return $.fn.stickycontainer = function(scope, options) {
    return new LkyphStickyContainer(this, scope, options);
  };
})(jQuery);
