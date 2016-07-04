/**
 * Main JS file for Casper behaviours
 */

/* globals jQuery, document */
(function($, undefined) {
  "use strict";

  var $document = $(document);

  $document.ready(function() {

    var $postContent = $(".post-content");
    $postContent.fitVids();

    $(".scroll-down").arctic_scroll();

    $(".menu-button, .nav-cover, .nav-close").on("click", function(e) {
      e.preventDefault();
      $("body").toggleClass("nav-opened nav-closed");
    });

  });

  // Arctic Scroll by Paul Adam Davis
  // https://github.com/PaulAdamDavis/Arctic-Scroll
  $.fn.arctic_scroll = function(options) {

    var defaults = {
        elem: $(this),
        speed: 500
      },

      allOptions = $.extend(defaults, options);

    allOptions.elem.click(function(event) {
      event.preventDefault();
      var $this = $(this),
        $htmlBody = $('html, body'),
        offset = ($this.attr('data-offset')) ? $this.attr('data-offset') : false,
        position = ($this.attr('data-position')) ? $this.attr('data-position') : false,
        toMove;

      if (offset) {
        toMove = parseInt(offset);
        $htmlBody.stop(true, false).animate({ scrollTop: ($(this.hash).offset().top + toMove) }, allOptions.speed);
      } else if (position) {
        toMove = parseInt(position);
        $htmlBody.stop(true, false).animate({ scrollTop: toMove }, allOptions.speed);
      } else {
        $htmlBody.stop(true, false).animate({ scrollTop: ($(this.hash).offset().top) }, allOptions.speed);
      }
    });

  };
})(jQuery);

/* 自定义脚本 */
(function() {
  var dsTop = $('#ds-thread')[0].offsetTop
  var disqusTop = $('#disqus_thread')[0].offsetTop
  var dsLoaded
  var disqusLoaded
  $(window).scroll(function() {
    if (!dsLoaded && this.scrollY > dsTop) {
      dsLoaded = true
      (function(d) {
        var ds = d.createElement('script')
        ds.type = 'text/javascript'
        ds.async = true
        ds.src = 'https://static.duoshuo.com/embed.js'
        ds.charset = 'UTF-8';
        (d.head || d.body).appendChild(ds);
      })(document)
    }
    if (!disqusLoaded && this.scrollY > disqusTop) {
      disqusLoaded = true
      (function(d) {
        var s = d.createElement('script')
        s.async = true
        s.src = 'https://sebastianblade.disqus.com/embed.js'
        (d.head || d.body).appendChild(s)
      })(document)
    }
  })
}())
