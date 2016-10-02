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
      this.imageCount = $("#slides img").length;
      // this.slideObjects = this.getSlides();
      console.log("Number of images " + this.imageCount);
      this.buttonRight = $(".buttonRight");
      this.buttonLeft = $(".buttonLeft");

      this.createDots();
      this.setActiveDot();

      //proxy is required to return the event onto the 'this' object for the scope of the plugin.
      this.buttonRight.click($.proxy(function(e) {
        e.preventDefault();
        // this.setActiveDot(this.currentDotIndex++);
      }, this));

      this.buttonLeft.click($.proxy(function(e) {
        e.preventDefault();
        // this.setActiveDot(this.currentDotIndex--);
      }, this));
      //TODO rewrite this to change a method that is a set and get of the global slide index. Hence using the same index for both the dots and the slides
    },

    createDots: function() {
      if (this.imageCount > 0) {
        for (var i = 0; i < this.imageCount; i++) {
          $(".carousel-indicators").append("<li></li>");
        }
      }
    },

    getDots: function() {
      return $(".carousel-indicators li");
    },

    getSlides: function() {
      return $("#slides li");
    },

    setActiveDot: function(dotIndex) {
      var dots = this.getDots();
      if (dots.length <= 0) {
        return;
      }

      if (dotIndex === undefined) {
        var slides = this.getSlides();
        for (var i = 0; i < slides.length; i++) {
          if (slides[i].id === "current") {
            this.setSlideIndex(i);
            dots[i].id = "active";
          }
        }

      } else {
        dots[dotIndex].id = "active";
      }
    },

    setSlideIndex: function(index) {
      this.currentDotIndex = index;
    },

    getSlideIndex: function() {
      return this.currentDotIndex;
    },



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
