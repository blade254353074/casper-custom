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
(function(doc) {
  var container = doc.head || doc.body
  var dsLink = '//static.duoshuo.com/embed.js'
  var disqusLink = '//static.duoshuo.com/embed.js'
  var dsTop = $('.ds-thread')[0].offsetTop
  var disqusTop = $('#disqus_thread')[0].offsetTop
  var dsLoaded
  var disqusLoaded

  function createScript (src) {
    var script = doc.createElement('script')
    script.type = 'text/javascript'
    script.async = true
    script.charset = 'UTF-8'
    script.src = src
    return script
  }

  function dsLoading () {
    dsLoaded = true
    container.appendChild(createScript(dsLink))
  }

  function disqusLoading () {
    disqusLoaded = true
    container.appendChild(createScript(disqusLink))
  }

  if (window.scrollY > dsTop || window.scrollY > disqusTop) {
    dsLoading()
    disqusLoading()
  } else {
    $(window).scroll(function() {
      if (!dsLoaded && this.scrollY > dsTop) {
        dsLoading()
      }
      if (!disqusLoaded && this.scrollY > disqusTop) {
        disqusLoading()
      }
    })
  }
}(document))
