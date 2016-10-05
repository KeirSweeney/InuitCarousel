;
(function($, window, undefined) {

  "use strict";

  var pluginName = "CarouselController",
    defaults = {
      dotsVisible: true,
      animationType: "slide",
      animationSpeed: 1000,
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
      this.initSlideIndex();
      this.prepareSlidesForAnim(this.getAnimationType());

      //proxy is required to return the event onto the 'this' object for the scope of the plugin.
      this.buttonRight.click($.proxy(function(e) {

        e.preventDefault();
        var currentIndex = this.getCurrentSlideIndex();
        var nextIndex = this.getCurrentSlideIndex() + 1;

        if (nextIndex < this.getSlides().length) {
          this.setActiveSlide(currentIndex, nextIndex);
          this.animateByType(this.getAnimationType(), currentIndex, nextIndex);

        }
        //TODO disable the button when you can no longer go right
      }, this));

      this.buttonLeft.click($.proxy(function(e) {
        e.preventDefault();
        var currentIndex = this.getCurrentSlideIndex();
        var nextIndex = this.getCurrentSlideIndex() - 1;
        if (nextIndex >= 0) {

          this.setActiveSlide(currentIndex, nextIndex);
          this.animateByType(this.getAnimationType(), currentIndex, nextIndex);
        }
      }, this));

      this.getDots().click($.proxy(function(e) {
        var currentIndex = this.getCurrentSlideIndex();
        var nextIndex = $(e.target).index();
        this.setActiveSlide(currentIndex, nextIndex);
        if (this.getAnimationType() == "crossfade") {
          var slides = this.getSlides();
          this.fadeOut(slides[currentIndex]);
          this.fadeIn(slides[nextIndex]);
        }
        // TODO: complete animation for dot clicking for sliding


      }, this));
    },

    getAnimationType: function() {
      return this.options.animationType;
    },

    animateByType: function(animType, currentIndex, nextIndex) {
      switch (animType) {
        case "slide":
          if (nextIndex > currentIndex) {
            this.slideRight();
          } else {
            this.slideLeft();
          }
          break;
        case "crossfade":
          var slides = this.getSlides();
          this.fadeOut(slides[currentIndex]);
          this.fadeIn(slides[nextIndex]);
          break;
      }
    },

    prepareSlidesForAnim: function(animationType) {
      if (animationType == defaults.animationType) {
        $("ol#slides").addClass("horizontal");
      }
      if (animationType == "crossfade") {
        $("ol#slides").addClass("layered");

        var slides = this.getSlides();
        for (var i = 0; i < slides.length; i++) {
          if (slides[i].id != "current") {
            $(slides[i]).css("opacity", "0");
          }
        }
      }
    },

    slideRight: function() { //TODO fix sliding distance and fix sliding after changing window size
      //TODO: refactor into one slide function, and check the index <> to decide which way to
      $('#slides').animate({
        marginLeft: '-=' + this.getSlideWidth()
      }, this.options.animationSpeed);
    },

    slideLeft: function() {
      $('#slides').animate({
        marginLeft: '+=' + this.getSlideWidth()
      }, this.options.animationSpeed);
    },

    fadeOut: function(prevSlide) {
      $(prevSlide).animate({
        opacity: 0,
      }, this.options.animationSpeed);
    },

    fadeIn: function(nextSlide) {
      $(nextSlide).animate({
        opacity: 1,
      }, this.options.animationSpeed);
    },

    getSlideWidth: function() {
      return $("#slides").width(); //in a function as the viewport can change width depending on if the page has been scaled
      //TODO re-write as scrolling and then chanigng the size of the page causes a bug
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
          this.enableNextDot(i);
        } //TODO add default starting slide if user doesn't enter one
      }
    },

    setActiveSlide: function(currentIndex, nextIndex) {
      var slides = this.getSlides();
      slides[currentIndex].id = "";
      this.disablePrevDot(currentIndex);
      this.curentSlideIndex = nextIndex;
      slides[nextIndex].id = "current";
      this.enableNextDot(nextIndex);
    },

    getCurrentSlideIndex: function() {
      return this.curentSlideIndex;
    },

    enableNextDot: function(nextIndex) {
      var dots = this.getDots();
      dots[nextIndex].id = "active";
    },

    disablePrevDot: function(prevDot) {
      var dots = this.getDots();
      dots[prevDot].id = "";
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
  $(".carousel-outer").CarouselController({
    animationType: "crossfade",
  });
});
