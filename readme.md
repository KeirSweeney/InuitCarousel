# CarouselProject

# Contents

* [Next Tasks](#next-tasks)
* [Prerequisities](#prerequisities)
* [Installation](#installation)
* [Using in your own project](#using-in-own-project)
  * [Load the plugin](#load-the-plugin-files-into-your-project)
  * [Set up your HTML](#set-up-your-html)
  * [Styling Options](#styling-options)
* [jQuery custom settings](#styling-options)
* [Author](#author)
* [License](#license)


# Next Tasks

- [x] Fix git history to include my email for contributions.
- [ ] Finish JS usage in Readme
- [ ] Set starting slide if undefined.
- [ ] Allow more customisation of the Carousel through jQuery options.
- [ ] Re-factor and optimise SASS.
- [ ] Test other image aspect ratios.
- [ ] Re-structure html for accesability ease.
- [x] Fully functional prototype.

View here:

* [Carousel - 11/10/2016](https://keirsweeney.github.io/InuitCarousel/dist/html/)

A project in which I have been asked to create a web Carousel from scratch.

**Please note, this is a working project and parts may have incomplete functionality.**

I will be using [**Inuit**](https://github.com/inuitcss/inuitcss) for the css styling along with [**SASS**](http://sass-lang.com/).

I will also be using [**Gulp**](http://gulpjs.com/) as the task runner.

jQuery will be used to all JavaScript.

## Prerequisities
You will need the following tools to run the project:
* [Node.js and Npm](https://nodejs.org/en/download/)

## Installation

Open up your CLI and type the following:
```
git clone https://github.com/KeirSweeney/InuitCarousel/
```
Change directory into the project:
```
cd InuitCarousel
```
Install the project dependencies with Npm:
```
npm install
```
Run the Gulp default task:
```
gulp
```
If browser sync hasn't started automatically, [click here.](http://localhost:3000) to view the page on your local host.

## Using in you own project

To use the jQuery plugin you will need to add the following to your project. Please be careful with folder structure and file names.

### Load the plugin files into your project
Add the plugin and css file into the relevant folders and add to HTML:
```html
<!-- Carousel CSS -->
<link rel="stylesheet" href="/css/main.min.css">
<!-- Carousel jQuery plugin -->
<script src="/js/main.min.js"></script>
```

### Set up your HTML
Add the following HTML to your project where you would like the carousel to be.

### Currently tested and supported aspect ratios:
* 3:2

To resize the carousel depending on the aspect ratio of your images, you can use one of the following classes:
```html
<div class="carousel-outer three-two">...</div>
<div class="carousel-outer four-three">...</div>
<div class="carousel-outer sixteen-nine">...</div>
```
To implemment the carousel into your project please follow the HTML structure below.

```html
<!-- The two outer divs contain the carousel -->
<div class="carousel-outer three-two">
  <!-- Right nav button -->
  <button class="button button--right" type="button"><img src="../images/icons/icon-arrow-right.svg"></button>
   <!-- left nav button -->
  <button class="button button--left" type="button"><img src="../images/icons/icon-arrow-left.svg"></button>
  <ul class="carousel-indicators">
     <!-- carousel indicators are generated by jQuery by LI count -->
  </ul>
  <ol class="content" id="slides">
    <li id="current">   <!-- Please set a starting slide -->
      <h2 class="title title--top">Slide</h2>
      <img src="../images/natural-sun.jpg" alt="Image1">
    </li>
    <li>
      <h2 class="title title--bottom">Slide</h2>
      <img src="../images/sun.jpg" alt="Image2">
    </li>
    <li>
      <a href="https://www.google.com"><button class="cta cta--top">More Info</button></a>
      <img src="../images/sunset.jpg" alt="Image3">
    </li>
    </ol>
</div>
```
### Styling options

The Title can be positioned at the top or bottom using the following classes:
```html
  <h2 class="title title--top">...</h2>
  <h2 class="title title--bottom">...</h2>
```

The CTA can be positioned at the top or bottom using the following classes:
```html
  <button class="cta cta--top">...</button>
  <button class="cta cta--bottom">Slide</button>
```

## Use custom settings in the jQuery plugin

Below are the default settings for the plugin.

```javascript
 defaults = {
  dotsVisible: true,
  animationType: "slide",
  animationSpeed: 1000,
  isAutoPlay: true,
  autoPlaySpeed: 3000,
  loop: true,
  indicatorColor: '#ffffff',
};
```
Here we query the HTML and add the CarouselController plugin to the ".carousel-outer" class.

```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script> <!-- Or local path for jQuery -->
<script src="./js/jquery-carousel.js"></script>
<script>
$(window).on("load", function() {
  $(".carousel-outer").CarouselController({
    animationType: "crossfade",
    isAutoPlay: true,
    loop: true,
  });
  $(".spinner").css("display", "none");
  $(".carousel-outer").fadeIn(2000);
  });
</script>
```

### ITCSS

    -------------   SETTINGS    (Variable declarations)
     -----------    TOOLS       (functions, mixins, placeholders)
      ---------     GENERIC     (resets)
       -------      BASE        (tag defaults)
        -----       OBJECTS     (patterns e.g. grid systems, tiles)
         ---        COMPONENTS  (component level styling)
          -         TRUMPS      (!importants)

###B.E.M.
[B.E.M.](https://en.bem.info/methodology/quick-start/)
Naming of classes and JS

## Built With
* [Sublime Text 3](https://www.sublimetext.com/3)
* [Npm Gulp](https://www.npmjs.com/package/gulp) and related packages - listed in [package.json](package.json)
* [Npm/Node.js](https://nodejs.org/en/download/) and [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) - As above

## Author
* **Keir Sweeney** - [Github](https://github.com/KeirSweeney/)

## License
See the [license](LICENSE) file for details.

Loading CSS icon courtesy of [SpinKit](https://github.com/tobiasahlin/SpinKit).

Icons courtesy of [Material Icons](https://design.google.com/icons/).

Images courtesy of [pixabay](https://pixabay.com/).

