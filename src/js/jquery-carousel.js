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
      // if(jQuery == undefined)
      //add initialisation here
      this.imageCount = $("#slides img").length;
      // this.slideObjects = this.getSlides();
      console.log("Number of images " + this.imageCount);
      this.buttonRight = $(".buttonRight");
      this.buttonLeft = $(".buttonLeft");

      this.createDots();
      this.initSlideIndex();

      //proxy is required to return the event onto the 'this' object for the scope of the plugin.
      this.buttonRight.click($.proxy(function(e) {
        e.preventDefault();
        var currentIndex = this.getCurrentSlideIndex();
        var nextIndex = this.getCurrentSlideIndex() + 1;
        this.setActiveSlide(currentIndex,nextIndex);
        // this.setActiveDot();
      }, this));

      this.buttonLeft.click($.proxy(function(e) {
        e.preventDefault();
        // this.setActiveDot(this.curentSlideIndex--);
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

    initSlideIndex: function() {
      var slides = this.getSlides();

      if (slides.length <= 0) {
        return;
      }

      for (var i = 0; i < slides.length; i++) {
        if (slides[i].id === "current") {
          this.curentSlideIndex = i;
          this.setActiveDot(i);
        } //TODO add default starting slide if user doesn't enter one
      }
    },

    setActiveSlide: function(currentIndex, nextIndex) {
      var slides = this.getSlides();

      slides[currentIndex].id = "";
      this.disablePrevDot(currentIndex);

      this.curentSlideIndex = nextIndex;

      slides[nextIndex].id = "current";
      this.setActiveDot(nextIndex);
    },

    getCurrentSlideIndex : function() {
      return this.curentSlideIndex;
    },

    setActiveDot: function(nextIndex) {
      var dots = this.getDots();
      dots[nextIndex].id = "active";
    },

    disablePrevDot: function(prevDot) {
      var dots = this.getDots();
      dots[prevDot].id = "";
    },

    // setSlideIndex: function(index) {
    //   this.curentSlideIndex = index;
    // },

    // getSlideIndex: function() {
    //   return this.curentSlideIndex;
    // },



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
