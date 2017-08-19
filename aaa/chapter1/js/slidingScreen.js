/**
 * jQuery Plugin to obtain touch gestures from iPhone, iPod Touch and iPad, should also work with Android mobile phones (not tested yet!)
 * Common usage: wipe images (left and right to show the previous or next image)
 *
 * @author Andreas Waltl, netCU Internetagentur (http://www.netcu.de)
 * @version 1.0 (15th July 2010)
 */
(function ($) {
  $.fn.touchwipe = function (settings) {
    var config = {
      min_move_x: 100,
      min_move_y: 100,
      wipeLeft: function () {
      },
      wipeRight: function () {
      },
      wipeUp: function () {
      },
      wipeDown: function () {
      },
      preventDefaultEvents: true
    };

    var ua =  navigator.userAgent;
    isAndroid = /Android/i.test(ua);
    isBlackBerry = /BlackBerry/i.test(ua);
    isWindowPhone = /IEMobile/i.test(ua);
    isIOS = /iPhone|iPad|iPod/i.test(ua);
    isMobile = isAndroid || isBlackBerry || isWindowPhone || isIOS;
    

    if (settings) $.extend(config, settings);

    this.each(function () {
      var startX;
      var startY;
      var isMoving = false;

      function cancelTouch() {
        if (isMobile) {
          this.removeEventListener('touchmove', onTouchMove);
        }else{
          this.removeEventListener('mousemove', onTouchMove);
        }
        startX = null;
        startY = null;
        isMoving = false;
      }

      function onTouchMove(e) {
        if (isHasNotSliding($(e.srcElement))) {
          cancelTouch();
          return;
        }
        if (config.preventDefaultEvents) {
          e.preventDefault();
        }
        if (isMoving) {
          var x,y,dx,dy;
          if (isMobile) {
             x = e.touches[0].pageX;
             y = e.touches[0].pageY;
             dx = startX - x;
             dy = startY - y;
          }else{
             x = e.screenX;
             y = e.screenY;
             dx = startX - x;
             dy = startY - y;
          }
          
          if (Math.abs(dx) >= config.min_move_x) {
            cancelTouch();
            if (dx > 0) {
              config.wipeLeft();
            }
            else {
              config.wipeRight();
            }
          }
          if (Math.abs(dy) >= config.min_move_y) {
            cancelTouch();
            if (dy > 0) {
              config.wipeUp();
            }
            else {
              config.wipeDown();
            }
          }
        }
      }

      function onTouchStart(e) {
        if (isHasNotSliding($(e.srcElement))) {
          cancelTouch();
          return;
        }
        if (isMobile) {
          startX = e.touches[0].pageX;
          startY = e.touches[0].pageY;
          isMoving = true;
          this.addEventListener('touchmove', onTouchMove, false);
        }else{
          startX = e.screenX;
          startY = e.screenY;
          isMoving = true;
          this.addEventListener('mousemove', onTouchMove, false);
        }
      }

      function onTouchEnd(e) {
        isMoving = false;
        if (isMobile) {
           this.removeEventListener('touchmove',onTouchMove,false);
        }else{
           this.removeEventListener('mousemove',onTouchMove,false);
        }
      }

      function isHasNotSliding(ele) {
        if (ele[0].tagName == "BODY") {
          return false;
        }
        if (ele.hasClass("notSliding")) {
          return true;
        }
        return isHasNotSliding(ele.parent());
      }
      if (isMobile) {
        this.addEventListener('touchstart', onTouchStart, false);
      }else {
         this.addEventListener('mousedown', onTouchStart, false);
         this.addEventListener('mouseup', onTouchEnd, false);
      }
    });

    return this;
  };

})(jQuery);