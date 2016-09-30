;
(function($, window, undefined) {

  "use strict";

  var pluginName = "CarouselController",
    defaults = {
      dotsVisible: true,
    };

  function Plugin(element, options) {
    this.element = element;
    this.options = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;

    this.init();
  }

  Plugin.prototype = {
    init: function() {
      //add initialisation here
      var imageCount = $("#images img").length;
      console.log("Number of images " + imageCount);
    },

    setDotIndex: function(index) {

    }
  };

  $.fn[pluginName] = function(options) {
    return this.each(function() {
      if (!$.data(this, "plugin_" + pluginName)) {
        $.data(this, "plugin_" + pluginName,
          new Plugin(this, options));
      }
    });

  };



})(jQuery, window);

$(document).ready(function() {
  $(".carousel-outer").CarouselController();
});
