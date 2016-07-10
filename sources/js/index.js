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
/*
  Reload、超出高度都可以触发，但从别处点击链接进入，
  dsTop/disqusTop 会不正常，所以延迟 100 毫秒。
*/
setTimeout(function () {
  var $win = $(window)
  var doc = document
  var scrollHeight = $win.scrollTop() + $win.height()
  var container = doc.head || doc.body
  var disqusLink = '/assets/js/disqus.embed.min.js'
  var disqusTop = $('#disqus_thread').offset().top
  var disqusLoaded

  function createScript (src) {
    var script = doc.createElement('script')
    script.type = 'text/javascript'
    script.async = true
    script.charset = 'UTF-8'
    script.src = src
    return script
  }

  function disqusLoading () {
    disqusLoaded = true
    container.appendChild(createScript(disqusLink))
  }

  if (scrollHeight > disqusTop) {
    disqusLoading()
  } else {
    $win.on('scroll', function() {
      var scrollHeight = $win.scrollTop() + $win.height()
      ;(!disqusLoaded && scrollHeight > disqusTop) && disqusLoading()
      disqusLoaded && $win.off('scroll')
    })
  }
}, 100)
