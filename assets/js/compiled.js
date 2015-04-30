/*! nanoScrollerJS - v0.8.6 - 2015
* http://jamesflorentino.github.com/nanoScrollerJS/
* Copyright (c) 2015 James Florentino; Licensed MIT */
(function(factory) {
  if (typeof define === 'function' && define.amd) {
    return define(['jquery'], function($) {
      return factory($, window, document);
    });
  } else if (typeof exports === 'object') {
    return module.exports = factory(require('jquery'), window, document);
  } else {
    return factory(jQuery, window, document);
  }
})(function($, window, document) {
  "use strict";
  var BROWSER_IS_IE7, BROWSER_SCROLLBAR_WIDTH, DOMSCROLL, DOWN, DRAG, ENTER, KEYDOWN, KEYUP, MOUSEDOWN, MOUSEENTER, MOUSEMOVE, MOUSEUP, MOUSEWHEEL, NanoScroll, PANEDOWN, RESIZE, SCROLL, SCROLLBAR, TOUCHMOVE, UP, WHEEL, cAF, defaults, getBrowserScrollbarWidth, hasTransform, isFFWithBuggyScrollbar, rAF, transform, _elementStyle, _prefixStyle, _vendor;
  defaults = {

    /**
      a classname for the pane element.
      @property paneClass
      @type String
      @default 'nano-pane'
     */
    paneClass: 'nano-pane',

    /**
      a classname for the slider element.
      @property sliderClass
      @type String
      @default 'nano-slider'
     */
    sliderClass: 'nano-slider',

    /**
      a classname for the content element.
      @property contentClass
      @type String
      @default 'nano-content'
     */
    contentClass: 'nano-content',

    /**
      a setting to enable native scrolling in iOS devices.
      @property iOSNativeScrolling
      @type Boolean
      @default false
     */
    iOSNativeScrolling: false,

    /**
      a setting to prevent the rest of the page being
      scrolled when user scrolls the `.content` element.
      @property preventPageScrolling
      @type Boolean
      @default false
     */
    preventPageScrolling: false,

    /**
      a setting to disable binding to the resize event.
      @property disableResize
      @type Boolean
      @default false
     */
    disableResize: false,

    /**
      a setting to make the scrollbar always visible.
      @property alwaysVisible
      @type Boolean
      @default false
     */
    alwaysVisible: false,

    /**
      a default timeout for the `flash()` method.
      @property flashDelay
      @type Number
      @default 1500
     */
    flashDelay: 1500,

    /**
      a minimum height for the `.slider` element.
      @property sliderMinHeight
      @type Number
      @default 20
     */
    sliderMinHeight: 20,

    /**
      a maximum height for the `.slider` element.
      @property sliderMaxHeight
      @type Number
      @default null
     */
    sliderMaxHeight: null,

    /**
      an alternate document context.
      @property documentContext
      @type Document
      @default null
     */
    documentContext: null,

    /**
      an alternate window context.
      @property windowContext
      @type Window
      @default null
     */
    windowContext: null
  };

  /**
    @property SCROLLBAR
    @type String
    @static
    @final
    @private
   */
  SCROLLBAR = 'scrollbar';

  /**
    @property SCROLL
    @type String
    @static
    @final
    @private
   */
  SCROLL = 'scroll';

  /**
    @property MOUSEDOWN
    @type String
    @final
    @private
   */
  MOUSEDOWN = 'mousedown';

  /**
    @property MOUSEENTER
    @type String
    @final
    @private
   */
  MOUSEENTER = 'mouseenter';

  /**
    @property MOUSEMOVE
    @type String
    @static
    @final
    @private
   */
  MOUSEMOVE = 'mousemove';

  /**
    @property MOUSEWHEEL
    @type String
    @final
    @private
   */
  MOUSEWHEEL = 'mousewheel';

  /**
    @property MOUSEUP
    @type String
    @static
    @final
    @private
   */
  MOUSEUP = 'mouseup';

  /**
    @property RESIZE
    @type String
    @final
    @private
   */
  RESIZE = 'resize';

  /**
    @property DRAG
    @type String
    @static
    @final
    @private
   */
  DRAG = 'drag';

  /**
    @property ENTER
    @type String
    @static
    @final
    @private
   */
  ENTER = 'enter';

  /**
    @property UP
    @type String
    @static
    @final
    @private
   */
  UP = 'up';

  /**
    @property PANEDOWN
    @type String
    @static
    @final
    @private
   */
  PANEDOWN = 'panedown';

  /**
    @property DOMSCROLL
    @type String
    @static
    @final
    @private
   */
  DOMSCROLL = 'DOMMouseScroll';

  /**
    @property DOWN
    @type String
    @static
    @final
    @private
   */
  DOWN = 'down';

  /**
    @property WHEEL
    @type String
    @static
    @final
    @private
   */
  WHEEL = 'wheel';

  /**
    @property KEYDOWN
    @type String
    @static
    @final
    @private
   */
  KEYDOWN = 'keydown';

  /**
    @property KEYUP
    @type String
    @static
    @final
    @private
   */
  KEYUP = 'keyup';

  /**
    @property TOUCHMOVE
    @type String
    @static
    @final
    @private
   */
  TOUCHMOVE = 'touchmove';

  /**
    @property BROWSER_IS_IE7
    @type Boolean
    @static
    @final
    @private
   */
  BROWSER_IS_IE7 = window.navigator.appName === 'Microsoft Internet Explorer' && /msie 7./i.test(window.navigator.appVersion) && window.ActiveXObject;

  /**
    @property BROWSER_SCROLLBAR_WIDTH
    @type Number
    @static
    @default null
    @private
   */
  BROWSER_SCROLLBAR_WIDTH = null;
  rAF = window.requestAnimationFrame;
  cAF = window.cancelAnimationFrame;
  _elementStyle = document.createElement('div').style;
  _vendor = (function() {
    var i, transform, vendor, vendors, _i, _len;
    vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'];
    for (i = _i = 0, _len = vendors.length; _i < _len; i = ++_i) {
      vendor = vendors[i];
      transform = vendors[i] + 'ransform';
      if (transform in _elementStyle) {
        return vendors[i].substr(0, vendors[i].length - 1);
      }
    }
    return false;
  })();
  _prefixStyle = function(style) {
    if (_vendor === false) {
      return false;
    }
    if (_vendor === '') {
      return style;
    }
    return _vendor + style.charAt(0).toUpperCase() + style.substr(1);
  };
  transform = _prefixStyle('transform');
  hasTransform = transform !== false;

  /**
    Returns browser's native scrollbar width
    @method getBrowserScrollbarWidth
    @return {Number} the scrollbar width in pixels
    @static
    @private
   */
  getBrowserScrollbarWidth = function() {
    var outer, outerStyle, scrollbarWidth;
    outer = document.createElement('div');
    outerStyle = outer.style;
    outerStyle.position = 'absolute';
    outerStyle.width = '100px';
    outerStyle.height = '100px';
    outerStyle.overflow = SCROLL;
    outerStyle.top = '-9999px';
    document.body.appendChild(outer);
    scrollbarWidth = outer.offsetWidth - outer.clientWidth;
    document.body.removeChild(outer);
    return scrollbarWidth;
  };
  isFFWithBuggyScrollbar = function() {
    var isOSXFF, ua, version;
    ua = window.navigator.userAgent;
    isOSXFF = /(?=.+Mac OS X)(?=.+Firefox)/.test(ua);
    if (!isOSXFF) {
      return false;
    }
    version = /Firefox\/\d{2}\./.exec(ua);
    if (version) {
      version = version[0].replace(/\D+/g, '');
    }
    return isOSXFF && +version > 23;
  };

  /**
    @class NanoScroll
    @param element {HTMLElement|Node} the main element
    @param options {Object} nanoScroller's options
    @constructor
   */
  NanoScroll = (function() {
    function NanoScroll(el, options) {
      this.el = el;
      this.options = options;
      BROWSER_SCROLLBAR_WIDTH || (BROWSER_SCROLLBAR_WIDTH = getBrowserScrollbarWidth());
      this.$el = $(this.el);
      this.doc = $(this.options.documentContext || document);
      this.win = $(this.options.windowContext || window);
      this.body = this.doc.find('body');
      this.$content = this.$el.children("." + this.options.contentClass);
      this.$content.attr('tabindex', this.options.tabIndex || 0);
      this.content = this.$content[0];
      this.previousPosition = 0;
      if (this.options.iOSNativeScrolling && (this.el.style.WebkitOverflowScrolling != null)) {
        this.nativeScrolling();
      } else {
        this.generate();
      }
      this.createEvents();
      this.addEvents();
      this.reset();
    }


    /**
      Prevents the rest of the page being scrolled
      when user scrolls the `.nano-content` element.
      @method preventScrolling
      @param event {Event}
      @param direction {String} Scroll direction (up or down)
      @private
     */

    NanoScroll.prototype.preventScrolling = function(e, direction) {
      if (!this.isActive) {
        return;
      }
      if (e.type === DOMSCROLL) {
        if (direction === DOWN && e.originalEvent.detail > 0 || direction === UP && e.originalEvent.detail < 0) {
          e.preventDefault();
        }
      } else if (e.type === MOUSEWHEEL) {
        if (!e.originalEvent || !e.originalEvent.wheelDelta) {
          return;
        }
        if (direction === DOWN && e.originalEvent.wheelDelta < 0 || direction === UP && e.originalEvent.wheelDelta > 0) {
          e.preventDefault();
        }
      }
    };


    /**
      Enable iOS native scrolling
      @method nativeScrolling
      @private
     */

    NanoScroll.prototype.nativeScrolling = function() {
      this.$content.css({
        WebkitOverflowScrolling: 'touch'
      });
      this.iOSNativeScrolling = true;
      this.isActive = true;
    };


    /**
      Updates those nanoScroller properties that
      are related to current scrollbar position.
      @method updateScrollValues
      @private
     */

    NanoScroll.prototype.updateScrollValues = function() {
      var content, direction;
      content = this.content;
      this.maxScrollTop = content.scrollHeight - content.clientHeight;
      this.prevScrollTop = this.contentScrollTop || 0;
      this.contentScrollTop = content.scrollTop;
      direction = this.contentScrollTop > this.previousPosition ? "down" : this.contentScrollTop < this.previousPosition ? "up" : "same";
      this.previousPosition = this.contentScrollTop;
      if (direction !== "same") {
        this.$el.trigger('update', {
          position: this.contentScrollTop,
          maximum: this.maxScrollTop,
          direction: direction
        });
      }
      if (!this.iOSNativeScrolling) {
        this.maxSliderTop = this.paneHeight - this.sliderHeight;
        this.sliderTop = this.maxScrollTop === 0 ? 0 : this.contentScrollTop * this.maxSliderTop / this.maxScrollTop;
      }
    };


    /**
      Updates CSS styles for current scroll position.
      Uses CSS 2d transfroms and `window.requestAnimationFrame` if available.
      @method setOnScrollStyles
      @private
     */

    NanoScroll.prototype.setOnScrollStyles = function() {
      var cssValue;
      if (hasTransform) {
        cssValue = {};
        cssValue[transform] = "translate(0, " + this.sliderTop + "px)";
      } else {
        cssValue = {
          top: this.sliderTop
        };
      }
      if (rAF) {
        if (cAF && this.scrollRAF) {
          cAF(this.scrollRAF);
        }
        this.scrollRAF = rAF((function(_this) {
          return function() {
            _this.scrollRAF = null;
            return _this.slider.css(cssValue);
          };
        })(this));
      } else {
        this.slider.css(cssValue);
      }
    };


    /**
      Creates event related methods
      @method createEvents
      @private
     */

    NanoScroll.prototype.createEvents = function() {
      this.events = {
        down: (function(_this) {
          return function(e) {
            _this.isBeingDragged = true;
            _this.offsetY = e.pageY - _this.slider.offset().top;
            if (!_this.slider.is(e.target)) {
              _this.offsetY = 0;
            }
            _this.pane.addClass('active');
            _this.doc.bind(MOUSEMOVE, _this.events[DRAG]).bind(MOUSEUP, _this.events[UP]);
            _this.body.bind(MOUSEENTER, _this.events[ENTER]);
            return false;
          };
        })(this),
        drag: (function(_this) {
          return function(e) {
            _this.sliderY = e.pageY - _this.$el.offset().top - _this.paneTop - (_this.offsetY || _this.sliderHeight * 0.5);
            _this.scroll();
            if (_this.contentScrollTop >= _this.maxScrollTop && _this.prevScrollTop !== _this.maxScrollTop) {
              _this.$el.trigger('scrollend');
            } else if (_this.contentScrollTop === 0 && _this.prevScrollTop !== 0) {
              _this.$el.trigger('scrolltop');
            }
            return false;
          };
        })(this),
        up: (function(_this) {
          return function(e) {
            _this.isBeingDragged = false;
            _this.pane.removeClass('active');
            _this.doc.unbind(MOUSEMOVE, _this.events[DRAG]).unbind(MOUSEUP, _this.events[UP]);
            _this.body.unbind(MOUSEENTER, _this.events[ENTER]);
            return false;
          };
        })(this),
        resize: (function(_this) {
          return function(e) {
            _this.reset();
          };
        })(this),
        panedown: (function(_this) {
          return function(e) {
            _this.sliderY = (e.offsetY || e.originalEvent.layerY) - (_this.sliderHeight * 0.5);
            _this.scroll();
            _this.events.down(e);
            return false;
          };
        })(this),
        scroll: (function(_this) {
          return function(e) {
            _this.updateScrollValues();
            if (_this.isBeingDragged) {
              return;
            }
            if (!_this.iOSNativeScrolling) {
              _this.sliderY = _this.sliderTop;
              _this.setOnScrollStyles();
            }
            if (e == null) {
              return;
            }
            if (_this.contentScrollTop >= _this.maxScrollTop) {
              if (_this.options.preventPageScrolling) {
                _this.preventScrolling(e, DOWN);
              }
              if (_this.prevScrollTop !== _this.maxScrollTop) {
                _this.$el.trigger('scrollend');
              }
            } else if (_this.contentScrollTop === 0) {
              if (_this.options.preventPageScrolling) {
                _this.preventScrolling(e, UP);
              }
              if (_this.prevScrollTop !== 0) {
                _this.$el.trigger('scrolltop');
              }
            }
          };
        })(this),
        wheel: (function(_this) {
          return function(e) {
            var delta;
            if (e == null) {
              return;
            }
            delta = e.delta || e.wheelDelta || (e.originalEvent && e.originalEvent.wheelDelta) || -e.detail || (e.originalEvent && -e.originalEvent.detail);
            if (delta) {
              _this.sliderY += -delta / 3;
            }
            _this.scroll();
            return false;
          };
        })(this),
        enter: (function(_this) {
          return function(e) {
            var _ref;
            if (!_this.isBeingDragged) {
              return;
            }
            if ((e.buttons || e.which) !== 1) {
              return (_ref = _this.events)[UP].apply(_ref, arguments);
            }
          };
        })(this)
      };
    };


    /**
      Adds event listeners with jQuery.
      @method addEvents
      @private
     */

    NanoScroll.prototype.addEvents = function() {
      var events;
      this.removeEvents();
      events = this.events;
      if (!this.options.disableResize) {
        this.win.bind(RESIZE, events[RESIZE]);
      }
      if (!this.iOSNativeScrolling) {
        this.slider.bind(MOUSEDOWN, events[DOWN]);
        this.pane.bind(MOUSEDOWN, events[PANEDOWN]).bind("" + MOUSEWHEEL + " " + DOMSCROLL, events[WHEEL]);
      }
      this.$content.bind("" + SCROLL + " " + MOUSEWHEEL + " " + DOMSCROLL + " " + TOUCHMOVE, events[SCROLL]);
    };


    /**
      Removes event listeners with jQuery.
      @method removeEvents
      @private
     */

    NanoScroll.prototype.removeEvents = function() {
      var events;
      events = this.events;
      this.win.unbind(RESIZE, events[RESIZE]);
      if (!this.iOSNativeScrolling) {
        this.slider.unbind();
        this.pane.unbind();
      }
      this.$content.unbind("" + SCROLL + " " + MOUSEWHEEL + " " + DOMSCROLL + " " + TOUCHMOVE, events[SCROLL]);
    };


    /**
      Generates nanoScroller's scrollbar and elements for it.
      @method generate
      @chainable
      @private
     */

    NanoScroll.prototype.generate = function() {
      var contentClass, cssRule, currentPadding, options, pane, paneClass, sliderClass;
      options = this.options;
      paneClass = options.paneClass, sliderClass = options.sliderClass, contentClass = options.contentClass;
      if (!(pane = this.$el.children("." + paneClass)).length && !pane.children("." + sliderClass).length) {
        this.$el.append("<div class=\"" + paneClass + "\"><div class=\"" + sliderClass + "\" /></div>");
      }
      this.pane = this.$el.children("." + paneClass);
      this.slider = this.pane.find("." + sliderClass);
      if (BROWSER_SCROLLBAR_WIDTH === 0 && isFFWithBuggyScrollbar()) {
        currentPadding = window.getComputedStyle(this.content, null).getPropertyValue('padding-right').replace(/[^0-9.]+/g, '');
        cssRule = {
          right: -14,
          paddingRight: +currentPadding + 14
        };
      } else if (BROWSER_SCROLLBAR_WIDTH) {
        cssRule = {
          right: -BROWSER_SCROLLBAR_WIDTH
        };
        this.$el.addClass('has-scrollbar');
      }
      if (cssRule != null) {
        this.$content.css(cssRule);
      }
      return this;
    };


    /**
      @method restore
      @private
     */

    NanoScroll.prototype.restore = function() {
      this.stopped = false;
      if (!this.iOSNativeScrolling) {
        this.pane.show();
      }
      this.addEvents();
    };


    /**
      Resets nanoScroller's scrollbar.
      @method reset
      @chainable
      @example
          $(".nano").nanoScroller();
     */

    NanoScroll.prototype.reset = function() {
      var content, contentHeight, contentPosition, contentStyle, contentStyleOverflowY, paneBottom, paneHeight, paneOuterHeight, paneTop, parentMaxHeight, right, sliderHeight;
      if (this.iOSNativeScrolling) {
        this.contentHeight = this.content.scrollHeight;
        return;
      }
      if (!this.$el.find("." + this.options.paneClass).length) {
        this.generate().stop();
      }
      if (this.stopped) {
        this.restore();
      }
      content = this.content;
      contentStyle = content.style;
      contentStyleOverflowY = contentStyle.overflowY;
      if (BROWSER_IS_IE7) {
        this.$content.css({
          height: this.$content.height()
        });
      }
      contentHeight = content.scrollHeight + BROWSER_SCROLLBAR_WIDTH;
      parentMaxHeight = parseInt(this.$el.css("max-height"), 10);
      if (parentMaxHeight > 0) {
        this.$el.height("");
        this.$el.height(content.scrollHeight > parentMaxHeight ? parentMaxHeight : content.scrollHeight);
      }
      paneHeight = this.pane.outerHeight(false);
      paneTop = parseInt(this.pane.css('top'), 10);
      paneBottom = parseInt(this.pane.css('bottom'), 10);
      paneOuterHeight = paneHeight + paneTop + paneBottom;
      sliderHeight = Math.round(paneOuterHeight / contentHeight * paneHeight);
      if (sliderHeight < this.options.sliderMinHeight) {
        sliderHeight = this.options.sliderMinHeight;
      } else if ((this.options.sliderMaxHeight != null) && sliderHeight > this.options.sliderMaxHeight) {
        sliderHeight = this.options.sliderMaxHeight;
      }
      if (contentStyleOverflowY === SCROLL && contentStyle.overflowX !== SCROLL) {
        sliderHeight += BROWSER_SCROLLBAR_WIDTH;
      }
      this.maxSliderTop = paneOuterHeight - sliderHeight;
      this.contentHeight = contentHeight;
      this.paneHeight = paneHeight;
      this.paneOuterHeight = paneOuterHeight;
      this.sliderHeight = sliderHeight;
      this.paneTop = paneTop;
      this.slider.height(sliderHeight);
      this.events.scroll();
      this.pane.show();
      this.isActive = true;
      if ((content.scrollHeight === content.clientHeight) || (this.pane.outerHeight(true) >= content.scrollHeight && contentStyleOverflowY !== SCROLL)) {
        this.pane.hide();
        this.isActive = false;
      } else if (this.el.clientHeight === content.scrollHeight && contentStyleOverflowY === SCROLL) {
        this.slider.hide();
      } else {
        this.slider.show();
      }
      this.pane.css({
        opacity: (this.options.alwaysVisible ? 1 : ''),
        visibility: (this.options.alwaysVisible ? 'visible' : '')
      });
      contentPosition = this.$content.css('position');
      if (contentPosition === 'static' || contentPosition === 'relative') {
        right = parseInt(this.$content.css('right'), 10);
        if (right) {
          this.$content.css({
            right: '',
            marginRight: right
          });
        }
      }
      return this;
    };


    /**
      @method scroll
      @private
      @example
          $(".nano").nanoScroller({ scroll: 'top' });
     */

    NanoScroll.prototype.scroll = function() {
      if (!this.isActive) {
        return;
      }
      this.sliderY = Math.max(0, this.sliderY);
      this.sliderY = Math.min(this.maxSliderTop, this.sliderY);
      this.$content.scrollTop(this.maxScrollTop * this.sliderY / this.maxSliderTop);
      if (!this.iOSNativeScrolling) {
        this.updateScrollValues();
        this.setOnScrollStyles();
      }
      return this;
    };


    /**
      Scroll at the bottom with an offset value
      @method scrollBottom
      @param offsetY {Number}
      @chainable
      @example
          $(".nano").nanoScroller({ scrollBottom: value });
     */

    NanoScroll.prototype.scrollBottom = function(offsetY) {
      if (!this.isActive) {
        return;
      }
      this.$content.scrollTop(this.contentHeight - this.$content.height() - offsetY).trigger(MOUSEWHEEL);
      this.stop().restore();
      return this;
    };


    /**
      Scroll at the top with an offset value
      @method scrollTop
      @param offsetY {Number}
      @chainable
      @example
          $(".nano").nanoScroller({ scrollTop: value });
     */

    NanoScroll.prototype.scrollTop = function(offsetY) {
      if (!this.isActive) {
        return;
      }
      this.$content.scrollTop(+offsetY).trigger(MOUSEWHEEL);
      this.stop().restore();
      return this;
    };


    /**
      Scroll to an element
      @method scrollTo
      @param node {Node} A node to scroll to.
      @chainable
      @example
          $(".nano").nanoScroller({ scrollTo: $('#a_node') });
     */

    NanoScroll.prototype.scrollTo = function(node) {
      if (!this.isActive) {
        return;
      }
      this.scrollTop(this.$el.find(node).get(0).offsetTop);
      return this;
    };


    /**
      To stop the operation.
      This option will tell the plugin to disable all event bindings and hide the gadget scrollbar from the UI.
      @method stop
      @chainable
      @example
          $(".nano").nanoScroller({ stop: true });
     */

    NanoScroll.prototype.stop = function() {
      if (cAF && this.scrollRAF) {
        cAF(this.scrollRAF);
        this.scrollRAF = null;
      }
      this.stopped = true;
      this.removeEvents();
      if (!this.iOSNativeScrolling) {
        this.pane.hide();
      }
      return this;
    };


    /**
      Destroys nanoScroller and restores browser's native scrollbar.
      @method destroy
      @chainable
      @example
          $(".nano").nanoScroller({ destroy: true });
     */

    NanoScroll.prototype.destroy = function() {
      if (!this.stopped) {
        this.stop();
      }
      if (!this.iOSNativeScrolling && this.pane.length) {
        this.pane.remove();
      }
      if (BROWSER_IS_IE7) {
        this.$content.height('');
      }
      this.$content.removeAttr('tabindex');
      if (this.$el.hasClass('has-scrollbar')) {
        this.$el.removeClass('has-scrollbar');
        this.$content.css({
          right: ''
        });
      }
      return this;
    };


    /**
      To flash the scrollbar gadget for an amount of time defined in plugin settings (defaults to 1,5s).
      Useful if you want to show the user (e.g. on pageload) that there is more content waiting for him.
      @method flash
      @chainable
      @example
          $(".nano").nanoScroller({ flash: true });
     */

    NanoScroll.prototype.flash = function() {
      if (this.iOSNativeScrolling) {
        return;
      }
      if (!this.isActive) {
        return;
      }
      this.reset();
      this.pane.addClass('flashed');
      setTimeout((function(_this) {
        return function() {
          _this.pane.removeClass('flashed');
        };
      })(this), this.options.flashDelay);
      return this;
    };

    return NanoScroll;

  })();
  $.fn.nanoScroller = function(settings) {
    return this.each(function() {
      var options, scrollbar;
      if (!(scrollbar = this.nanoscroller)) {
        options = $.extend({}, defaults, settings);
        this.nanoscroller = scrollbar = new NanoScroll(this, options);
      }
      if (settings && typeof settings === "object") {
        $.extend(scrollbar.options, settings);
        if (settings.scrollBottom != null) {
          return scrollbar.scrollBottom(settings.scrollBottom);
        }
        if (settings.scrollTop != null) {
          return scrollbar.scrollTop(settings.scrollTop);
        }
        if (settings.scrollTo) {
          return scrollbar.scrollTo(settings.scrollTo);
        }
        if (settings.scroll === 'bottom') {
          return scrollbar.scrollBottom(0);
        }
        if (settings.scroll === 'top') {
          return scrollbar.scrollTop(0);
        }
        if (settings.scroll && settings.scroll instanceof $) {
          return scrollbar.scrollTo(settings.scroll);
        }
        if (settings.stop) {
          return scrollbar.stop();
        }
        if (settings.destroy) {
          return scrollbar.destroy();
        }
        if (settings.flash) {
          return scrollbar.flash();
        }
      }
      return scrollbar.reset();
    });
  };
  $.fn.nanoScroller.Constructor = NanoScroll;
});

//# sourceMappingURL=jquery.nanoscroller.js.map

/***
 * BxSlider v4.2.3 - Fully loaded, responsive content slider
 * http://bxslider.com
 *
 * Copyright 2014, Steven Wanderski - http://stevenwanderski.com - http://bxcreative.com
 * Written while drinking Belgian ales and listening to jazz
 *
 * Released under the MIT license - http://opensource.org/licenses/MIT
 ***/

;(function($){

	var defaults = {

		// GENERAL
		mode: 'horizontal',
		slideSelector: '',
		infiniteLoop: true,
		hideControlOnEnd: false,
		speed: 500,
		easing: null,
		slideMargin: 0,
		startSlide: 0,
		randomStart: false,
		captions: false,
		ticker: false,
		tickerHover: false,
		adaptiveHeight: false,
		adaptiveHeightSpeed: 500,
		video: false,
		useCSS: true,
		preloadImages: 'visible',
		responsive: true,
		slideZIndex: 50,
		wrapperClass: 'bx-wrapper',

		// TOUCH
		touchEnabled: true,
		swipeThreshold: 50,
		oneToOneTouch: true,
		preventDefaultSwipeX: true,
		preventDefaultSwipeY: false,

		// KEYBOARD
		keyboardEnabled: false,

		// PAGER
		pager: true,
		pagerType: 'full',
		pagerShortSeparator: ' / ',
		pagerSelector: null,
		buildPager: null,
		pagerCustom: null,

		// CONTROLS
		controls: true,
		nextText: 'Next',
		prevText: 'Prev',
		nextSelector: null,
		prevSelector: null,
		autoControls: false,
		startText: 'Start',
		stopText: 'Stop',
		autoControlsCombine: false,
		autoControlsSelector: null,

		// AUTO
		auto: false,
		pause: 4000,
		autoStart: true,
		autoDirection: 'next',
		autoHover: false,
		autoDelay: 0,
		autoSlideForOnePage: false,

		// CAROUSEL
		minSlides: 1,
		maxSlides: 1,
		moveSlides: 0,
		slideWidth: 0,

		// CALLBACKS
		onSliderLoad: function(){ return true },
		onSlideBefore: function(){ return true },
		onSlideAfter: function(){ return true },
		onSlideNext: function(){ return true },
		onSlidePrev: function(){ return true },
		onSliderResize: function(){ return true }
	};

	$.fn.bxSlider = function(options){

		if(this.length === 0){
			return this;
		} 

		// support multiple elements
		if(this.length > 1){
			this.each(function(){
				$(this).bxSlider(options);
			});
			return this;
		}

		// create a namespace to be used throughout the plugin
		var slider = {};
		// set a reference to our slider element
		var el = this;

		/**
		 * Makes slideshow responsive
		 */
		// first get the original window dimens (thanks a lot IE)
		var windowWidth = $(window).width();
		var windowHeight = $(window).height();



		/**
		 * ===================================================================================
		 * = PRIVATE FUNCTIONS
		 * ===================================================================================
		 */

		/**
		 * Initializes namespace settings to be used throughout plugin
		 */
		var init = function(){
			// merge user-supplied options with the defaults
			slider.settings = $.extend({}, defaults, options);
			// parse slideWidth setting
			slider.settings.slideWidth = parseInt(slider.settings.slideWidth);
			// store the original children
			slider.children = el.children(slider.settings.slideSelector);
			// check if actual number of slides is less than minSlides / maxSlides
			if(slider.children.length < slider.settings.minSlides){ slider.settings.minSlides = slider.children.length; } 
			if(slider.children.length < slider.settings.maxSlides){ slider.settings.maxSlides = slider.children.length; }
			// if random start, set the startSlide setting to random number
			if(slider.settings.randomStart){ slider.settings.startSlide = Math.floor(Math.random() * slider.children.length); }
			// store active slide information
			slider.active = { index: slider.settings.startSlide };
			// store if the slider is in carousel mode (displaying / moving multiple slides)
			slider.carousel = slider.settings.minSlides > 1 || slider.settings.maxSlides > 1 ? true : false;
			// if carousel, force preloadImages = 'all'
			if(slider.carousel){ slider.settings.preloadImages = 'all'; }
			// calculate the min / max width thresholds based on min / max number of slides
			// used to setup and update carousel slides dimensions
			slider.minThreshold = (slider.settings.minSlides * slider.settings.slideWidth) + ((slider.settings.minSlides - 1) * slider.settings.slideMargin);
			slider.maxThreshold = (slider.settings.maxSlides * slider.settings.slideWidth) + ((slider.settings.maxSlides - 1) * slider.settings.slideMargin);
			// store the current state of the slider (if currently animating, working is true)
			slider.working = false;
			// initialize the controls object
			slider.controls = {};
			// initialize an auto interval
			slider.interval = null;
			// determine which property to use for transitions
			slider.animProp = slider.settings.mode === 'vertical' ? 'top' : 'left';
			// determine if hardware acceleration can be used
			slider.usingCSS = slider.settings.useCSS && slider.settings.mode !== 'fade' && (function(){
				// create our test div element
				var div = document.createElement('div');
				// css transition properties
				var props = ['WebkitPerspective', 'MozPerspective', 'OPerspective', 'msPerspective'];
				// test for each property
				for(var i in props){
					if(div.style[props[i]] !== undefined){
						slider.cssPrefix = props[i].replace('Perspective', '').toLowerCase();
						slider.animProp = '-' + slider.cssPrefix + '-transform';
						return true;
					}
				}
				return false;
			}());
			// if vertical mode always make maxSlides and minSlides equal
			if(slider.settings.mode === 'vertical'){ slider.settings.maxSlides = slider.settings.minSlides; }
			// save original style data
			el.data("origStyle", el.attr("style"));
			el.children(slider.settings.slideSelector).each(function(){
			  $(this).data("origStyle", $(this).attr("style"));
			});
			// perform all DOM / CSS modifications
			setup();
		};

		/**
		 * Performs all DOM and CSS modifications
		 */
		var setup = function(){
			// wrap el in a wrapper
			el.wrap('<div class="' + slider.settings.wrapperClass + '"><div class="bx-viewport"></div></div>');
			// store a namespace reference to .bx-viewport
			slider.viewport = el.parent();
			// add a loading div to display while images are loading
			slider.loader = $('<div class="bx-loading" />');
			slider.viewport.prepend(slider.loader);
			// set el to a massive width, to hold any needed slides
			// also strip any margin and padding from el
			el.css({
				width: slider.settings.mode === 'horizontal' ? (slider.children.length * 1000 + 215) + '%' : 'auto',
				position: 'absolute'
			});
			// if using CSS, add the easing property
			if(slider.usingCSS && slider.settings.easing){
				el.css('-' + slider.cssPrefix + '-transition-timing-function', slider.settings.easing);
			// if not using CSS and no easing value was supplied, use the default JS animation easing (swing)
			}else if(!slider.settings.easing){
				slider.settings.easing = 'swing';
			}
			var slidesShowing = getNumberSlidesShowing();
			// make modifications to the viewport (.bx-viewport)
			slider.viewport.css({
				width: '100%',
				overflow: 'hidden',
				position: 'relative'
			});
			slider.viewport.parent().css({
				maxWidth: getViewportMaxWidth()
			});
			// make modification to the wrapper (.bx-wrapper)
			if(!slider.settings.pager && !slider.settings.controls){
				slider.viewport.parent().css({
					margin: '0 auto 0px'
				});
			}
			// apply css to all slider children
			slider.children.css({
				'float': slider.settings.mode === 'horizontal' ? 'left' : 'none',
				listStyle: 'none',
				position: 'relative'
			});
			// apply the calculated width after the float is applied to prevent scrollbar interference
			slider.children.css('width', getSlideWidth());
			// if slideMargin is supplied, add the css
			if(slider.settings.mode === 'horizontal' && slider.settings.slideMargin > 0){ slider.children.css('marginRight', slider.settings.slideMargin); }
			if(slider.settings.mode === 'vertical' && slider.settings.slideMargin > 0){ slider.children.css('marginBottom', slider.settings.slideMargin); }
			// if "fade" mode, add positioning and z-index CSS
			if(slider.settings.mode === 'fade'){
				slider.children.css({
					position: 'absolute',
					zIndex: 0,
					display: 'none'
				});
				// prepare the z-index on the showing element
				slider.children.eq(slider.settings.startSlide).css({zIndex: slider.settings.slideZIndex, display: 'block'});
			}
			// create an element to contain all slider controls (pager, start / stop, etc)
			slider.controls.el = $('<div class="bx-controls" />');
			// if captions are requested, add them
			if(slider.settings.captions){ appendCaptions(); }
			// check if startSlide is last slide
			slider.active.last = slider.settings.startSlide === getPagerQty() - 1;
			// if video is true, set up the fitVids plugin
			if(slider.settings.video){ el.fitVids(); }
			// set the default preload selector (visible)
			var preloadSelector = slider.children.eq(slider.settings.startSlide);
			if(slider.settings.preloadImages === "all" || slider.settings.ticker){ preloadSelector = slider.children; }
			// only check for control addition if not in "ticker" mode
			if(!slider.settings.ticker){
				// if controls are requested, add them
				if(slider.settings.controls){ appendControls(); }
				// if auto is true, and auto controls are requested, add them
				if(slider.settings.auto && slider.settings.autoControls){ appendControlsAuto(); }
				// if pager is requested, add it
				if(slider.settings.pager){ appendPager(); }
				// if any control option is requested, add the controls wrapper
				if(slider.settings.controls || slider.settings.autoControls || slider.settings.pager){ slider.viewport.after(slider.controls.el); }
			// if ticker mode, do not allow a pager
			} else {
				slider.settings.pager = false;
			}
			loadElements(preloadSelector, start);
		};

		var loadElements = function(selector, callback){
			var total = selector.find('img:not([src=""]), iframe').length;
			if(total === 0){
				callback();
				return;
			}
			var count = 0;
			selector.find('img:not([src=""]), iframe').each(function(){
				$(this).one('load error', function(){
				  if(++count === total){ callback(); }
				}).each(function(){
				  if(this.complete){ $(this).load(); }
				});
			});
		};

		/**
		 * Start the slider
		 */
		var start = function(){
			// if infinite loop, prepare additional slides
			if(slider.settings.infiniteLoop && slider.settings.mode !== 'fade' && !slider.settings.ticker){
				var slice = slider.settings.mode === 'vertical' ? slider.settings.minSlides : slider.settings.maxSlides;
				var sliceAppend = slider.children.slice(0, slice).clone(true).addClass('bx-clone');
				var slicePrepend = slider.children.slice(-slice).clone(true).addClass('bx-clone');
				el.append(sliceAppend).prepend(slicePrepend);
			}
			// remove the loading DOM element
			slider.loader.remove();
			// set the left / top position of "el"
			setSlidePosition();
			// if "vertical" mode, always use adaptiveHeight to prevent odd behavior
			if(slider.settings.mode === 'vertical'){ slider.settings.adaptiveHeight = true; }
			// set the viewport height
			slider.viewport.height(getViewportHeight());
			// make sure everything is positioned just right (same as a window resize)
			el.redrawSlider();
			// onSliderLoad callback
			slider.settings.onSliderLoad(slider,slider.active.index);
			// slider has been fully initialized
			slider.initialized = true;
			// bind the resize call to the window
			if(slider.settings.responsive){ $(window).bind('resize', resizeWindow); }
			// if auto is true and has more than 1 page, start the show
			if(slider.settings.auto && slider.settings.autoStart && (getPagerQty() > 1 || slider.settings.autoSlideForOnePage)){ initAuto(); }
			// if ticker is true, start the ticker
			if(slider.settings.ticker){ initTicker(); }
			// if pager is requested, make the appropriate pager link active
			if(slider.settings.pager){ updatePagerActive(slider.settings.startSlide); }
			// check for any updates to the controls (like hideControlOnEnd updates)
			if(slider.settings.controls){ updateDirectionControls(); }
			// if touchEnabled is true, setup the touch events
			if(slider.settings.touchEnabled && !slider.settings.ticker){ initTouch(); }
			// if keyboardEnabled is true, setup the keyboard events
			if (slider.settings.keyboardEnabled && !slider.settings.ticker) { 
				$(document).keydown(keyPress);
			}
		};

		/**
		 * Returns the calculated height of the viewport, used to determine either adaptiveHeight or the maxHeight value
		 */
		var getViewportHeight = function(){
			var height = 0;
			// first determine which children (slides) should be used in our height calculation
			var children = $();
			// if mode is not "vertical" and adaptiveHeight is false, include all children
			if(slider.settings.mode !== 'vertical' && !slider.settings.adaptiveHeight){
				children = slider.children;
			}else{
				// if not carousel, return the single active child
				if(!slider.carousel){
					children = slider.children.eq(slider.active.index);
				// if carousel, return a slice of children
				}else{
					// get the individual slide index
					var currentIndex = slider.settings.moveSlides === 1 ? slider.active.index : slider.active.index * getMoveBy();
					// add the current slide to the children
					children = slider.children.eq(currentIndex);
					// cycle through the remaining "showing" slides
					for (i = 1; i <= slider.settings.maxSlides - 1; i++){
						// if looped back to the start
						if(currentIndex + i >= slider.children.length){
							children = children.add(slider.children.eq(i - 1));
						}else{
							children = children.add(slider.children.eq(currentIndex + i));
						}
					}
				}
			}
			// if "vertical" mode, calculate the sum of the heights of the children
			if(slider.settings.mode === 'vertical'){
				children.each(function(index){
				  height += $(this).outerHeight();
				});
				// add user-supplied margins
				if(slider.settings.slideMargin > 0){
					height += slider.settings.slideMargin * (slider.settings.minSlides - 1);
				}
			// if not "vertical" mode, calculate the max height of the children
			}else{
				height = Math.max.apply(Math, children.map(function(){
					return $(this).outerHeight(false);
				}).get());
			}

			if(slider.viewport.css('box-sizing') === 'border-box'){
				height +=	parseFloat(slider.viewport.css('padding-top')) + parseFloat(slider.viewport.css('padding-bottom')) +
							parseFloat(slider.viewport.css('border-top-width')) + parseFloat(slider.viewport.css('border-bottom-width'));
			}else if(slider.viewport.css('box-sizing') === 'padding-box'){
				height +=	parseFloat(slider.viewport.css('padding-top')) + parseFloat(slider.viewport.css('padding-bottom'));
			}

			return height;
		};

		/**
		 * Returns the calculated width to be used for the outer wrapper / viewport
		 */
		var getViewportMaxWidth = function(){
			var width = '100%';
			if(slider.settings.slideWidth > 0){
				if(slider.settings.mode === 'horizontal'){
					width = (slider.settings.maxSlides * slider.settings.slideWidth) + ((slider.settings.maxSlides - 1) * slider.settings.slideMargin);
				}else{
					width = slider.settings.slideWidth;
				}
			}
			return width;
		};

		/**
		 * Returns the calculated width to be applied to each slide
		 */
		var getSlideWidth = function(){
			// start with any user-supplied slide width
			var newElWidth = slider.settings.slideWidth;
			// get the current viewport width
			var wrapWidth = slider.viewport.width();
			// if slide width was not supplied, or is larger than the viewport use the viewport width
			if(slider.settings.slideWidth === 0 ||
				(slider.settings.slideWidth > wrapWidth && !slider.carousel) ||
				slider.settings.mode === 'vertical'){
				newElWidth = wrapWidth;
			// if carousel, use the thresholds to determine the width
			}else if(slider.settings.maxSlides > 1 && slider.settings.mode === 'horizontal'){
				if(wrapWidth > slider.maxThreshold){
					// newElWidth = (wrapWidth - (slider.settings.slideMargin * (slider.settings.maxSlides - 1))) / slider.settings.maxSlides;
				}else if(wrapWidth < slider.minThreshold){
					newElWidth = (wrapWidth - (slider.settings.slideMargin * (slider.settings.minSlides - 1))) / slider.settings.minSlides;
				}
			}
			return newElWidth;
		};

		/**
		 * Returns the number of slides currently visible in the viewport (includes partially visible slides)
		 */
		var getNumberSlidesShowing = function(){
			var slidesShowing = 1;
			if(slider.settings.mode === 'horizontal' && slider.settings.slideWidth > 0){
				// if viewport is smaller than minThreshold, return minSlides
				if(slider.viewport.width() < slider.minThreshold){
					slidesShowing = slider.settings.minSlides;
				// if viewport is larger than maxThreshold, return maxSlides
				}else if(slider.viewport.width() > slider.maxThreshold){
					slidesShowing = slider.settings.maxSlides;
				// if viewport is between min / max thresholds, divide viewport width by first child width
				}else{
					var childWidth = slider.children.first().width() + slider.settings.slideMargin;
					slidesShowing = Math.floor((slider.viewport.width() +
						slider.settings.slideMargin) / childWidth);
				}
			// if "vertical" mode, slides showing will always be minSlides
			}else if(slider.settings.mode === 'vertical'){
				slidesShowing = slider.settings.minSlides;
			}
			return slidesShowing;
		};

		/**
		 * Returns the number of pages (one full viewport of slides is one "page")
		 */
		var getPagerQty = function(){
			var pagerQty = 0;
			// if moveSlides is specified by the user
			if(slider.settings.moveSlides > 0){
				if(slider.settings.infiniteLoop){
					pagerQty = Math.ceil(slider.children.length / getMoveBy());
				}else{
					// use a while loop to determine pages
					var breakPoint = 0;
					var counter = 0;
					// when breakpoint goes above children length, counter is the number of pages
					while (breakPoint < slider.children.length){
						++pagerQty;
						breakPoint = counter + getNumberSlidesShowing();
						counter += slider.settings.moveSlides <= getNumberSlidesShowing() ? slider.settings.moveSlides : getNumberSlidesShowing();
					}
				}
			// if moveSlides is 0 (auto) divide children length by sides showing, then round up
			}else{
				pagerQty = Math.ceil(slider.children.length / getNumberSlidesShowing());
			}
			return pagerQty;
		};

		/**
		 * Returns the number of individual slides by which to shift the slider
		 */
		var getMoveBy = function(){
			// if moveSlides was set by the user and moveSlides is less than number of slides showing
			if(slider.settings.moveSlides > 0 && slider.settings.moveSlides <= getNumberSlidesShowing()){
				return slider.settings.moveSlides;
			}
			// if moveSlides is 0 (auto)
			return getNumberSlidesShowing();
		};

		/**
		 * Sets the slider's (el) left or top position
		 */
		var setSlidePosition = function(){
			var position;
			// if last slide, not infinite loop, and number of children is larger than specified maxSlides
			if(slider.children.length > slider.settings.maxSlides && slider.active.last && !slider.settings.infiniteLoop){
				if(slider.settings.mode === 'horizontal'){
					// get the last child's position
					var lastChild = slider.children.last();
					position = lastChild.position();
					// set the left position
					setPositionProperty(-(position.left - (slider.viewport.width() - lastChild.outerWidth())), 'reset', 0);
				}else if(slider.settings.mode === 'vertical'){
					// get the last showing index's position
					var lastShowingIndex = slider.children.length - slider.settings.minSlides;
					position = slider.children.eq(lastShowingIndex).position();
					// set the top position
					setPositionProperty(-position.top, 'reset', 0);
				}
			// if not last slide
			}else{
				// get the position of the first showing slide
				position = slider.children.eq(slider.active.index * getMoveBy()).position();
				// check for last slide
				if(slider.active.index === getPagerQty() - 1){ slider.active.last = true; }
				// set the respective position
				if(position !== undefined){
					if(slider.settings.mode === 'horizontal'){ setPositionProperty(-position.left, 'reset', 0); }
					else if(slider.settings.mode === 'vertical'){ setPositionProperty(-position.top, 'reset', 0); }
				}
			}
		};

		/**
		 * Sets the el's animating property position (which in turn will sometimes animate el).
		 * If using CSS, sets the transform property. If not using CSS, sets the top / left property.
		 *
		 * @param value (int)
		 *  - the animating property's value
		 *
		 * @param type (string) 'slide', 'reset', 'ticker'
		 *  - the type of instance for which the function is being
		 *
		 * @param duration (int)
		 *  - the amount of time (in ms) the transition should occupy
		 *
		 * @param params (array) optional
		 *  - an optional parameter containing any variables that need to be passed in
		 */
		var setPositionProperty = function(value, type, duration, params){
			// use CSS transform
			if(slider.usingCSS){
				// determine the translate3d value
				var propValue = slider.settings.mode === 'vertical' ? 'translate3d(0, ' + value + 'px, 0)' : 'translate3d(' + value + 'px, 0, 0)';
				// add the CSS transition-duration
				el.css('-' + slider.cssPrefix + '-transition-duration', duration / 1000 + 's');
				if(type === 'slide'){
					setTimeout(function() {
						// set the property value
						el.css(slider.animProp, propValue);
						// if value 0, just update
						if(value === 0) {
							updateAfterSlideTransition();
						} else {
							// bind a callback method - executes when CSS transition completes
							el.bind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function(){
								// unbind the callback
								el.unbind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd');
								updateAfterSlideTransition();
							});
						}
					}, 0);
				}else if(type === 'reset'){
					el.css(slider.animProp, propValue);
				}else if(type === 'ticker'){
					// make the transition use 'linear'
					el.css('-' + slider.cssPrefix + '-transition-timing-function', 'linear');
					el.css(slider.animProp, propValue);
					// bind a callback method - executes when CSS transition completes
					el.bind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function(){
						// unbind the callback
						el.unbind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd');
						// reset the position
						setPositionProperty(params.resetValue, 'reset', 0);
						// start the loop again
						tickerLoop();
					});
				}
			// use JS animate
			}else{
				var animateObj = {};
				animateObj[slider.animProp] = value;
				if(type === 'slide'){
					el.animate(animateObj, duration, slider.settings.easing, function(){
						updateAfterSlideTransition();
					});
				}else if(type === 'reset'){
					el.css(slider.animProp, value);
				}else if(type === 'ticker'){
					el.animate(animateObj, speed, 'linear', function(){
						setPositionProperty(params.resetValue, 'reset', 0);
						// run the recursive loop after animation
						tickerLoop();
					});
				}
			}
		};

		/**
		 * Populates the pager with proper amount of pages
		 */
		var populatePager = function(){
			var pagerHtml = '';
			var pagerQty = getPagerQty();
			// loop through each pager item
			for(var i=0; i < pagerQty; i++){
				var linkContent = '';
				// if a buildPager function is supplied, use it to get pager link value, else use index + 1
				if(slider.settings.buildPager && $.isFunction(slider.settings.buildPager) || slider.settings.pagerCustom){
					linkContent = slider.settings.buildPager(i);
					slider.pagerEl.addClass('bx-custom-pager');
				}else{
					linkContent = i + 1;
					slider.pagerEl.addClass('bx-default-pager');
				}
				// var linkContent = slider.settings.buildPager && $.isFunction(slider.settings.buildPager) ? slider.settings.buildPager(i) : i + 1;
				// add the markup to the string
				pagerHtml += '<div class="bx-pager-item"><a href="" data-slide-index="' + i + '" class="bx-pager-link">' + linkContent + '</a></div>';
			}
			// populate the pager element with pager links
			slider.pagerEl.html(pagerHtml);
		};

		/**
		 * Appends the pager to the controls element
		 */
		var appendPager = function(){
			if(!slider.settings.pagerCustom){
				// create the pager DOM element
				slider.pagerEl = $('<div class="bx-pager" />');
				// if a pager selector was supplied, populate it with the pager
				if(slider.settings.pagerSelector){
					$(slider.settings.pagerSelector).html(slider.pagerEl);
				// if no pager selector was supplied, add it after the wrapper
				}else{
					slider.controls.el.addClass('bx-has-pager').append(slider.pagerEl);
				}
				// populate the pager
				populatePager();
			}else{
				slider.pagerEl = $(slider.settings.pagerCustom);
			}
			// assign the pager click binding
			slider.pagerEl.on('click touchend', 'a', clickPagerBind);
		};

		/**
		 * Appends prev / next controls to the controls element
		 */
		var appendControls = function(){
			slider.controls.next = $('<a class="bx-next" href="">' + slider.settings.nextText + '</a>');
			slider.controls.prev = $('<a class="bx-prev" href="">' + slider.settings.prevText + '</a>');
			// bind click actions to the controls
			slider.controls.next.bind('click touchend', clickNextBind);
			slider.controls.prev.bind('click touchend', clickPrevBind);
			// if nextSelector was supplied, populate it
			if(slider.settings.nextSelector){
				$(slider.settings.nextSelector).append(slider.controls.next);
			}
			// if prevSelector was supplied, populate it
			if(slider.settings.prevSelector){
				$(slider.settings.prevSelector).append(slider.controls.prev);
			}
			// if no custom selectors were supplied
			if(!slider.settings.nextSelector && !slider.settings.prevSelector){
				// add the controls to the DOM
				slider.controls.directionEl = $('<div class="bx-controls-direction" />');
				// add the control elements to the directionEl
				slider.controls.directionEl.append(slider.controls.prev).append(slider.controls.next);
				// slider.viewport.append(slider.controls.directionEl);
				slider.controls.el.addClass('bx-has-controls-direction').append(slider.controls.directionEl);
			}
		};

		/**
		 * Appends start / stop auto controls to the controls element
		 */
		var appendControlsAuto = function(){
			slider.controls.start = $('<div class="bx-controls-auto-item"><a class="bx-start" href="">' + slider.settings.startText + '</a></div>');
			slider.controls.stop = $('<div class="bx-controls-auto-item"><a class="bx-stop" href="">' + slider.settings.stopText + '</a></div>');
			// add the controls to the DOM
			slider.controls.autoEl = $('<div class="bx-controls-auto" />');
			// bind click actions to the controls
			slider.controls.autoEl.on('click', '.bx-start', clickStartBind);
			slider.controls.autoEl.on('click', '.bx-stop', clickStopBind);
			// if autoControlsCombine, insert only the "start" control
			if(slider.settings.autoControlsCombine){
				slider.controls.autoEl.append(slider.controls.start);
			// if autoControlsCombine is false, insert both controls
			}else{
				slider.controls.autoEl.append(slider.controls.start).append(slider.controls.stop);
			}
			// if auto controls selector was supplied, populate it with the controls
			if(slider.settings.autoControlsSelector){
				$(slider.settings.autoControlsSelector).html(slider.controls.autoEl);
			// if auto controls selector was not supplied, add it after the wrapper
			}else{
				slider.controls.el.addClass('bx-has-controls-auto').append(slider.controls.autoEl);
			}
			// update the auto controls
			updateAutoControls(slider.settings.autoStart ? 'stop' : 'start');
		};

		/**
		 * Appends image captions to the DOM
		 */
		var appendCaptions = function(){
			// cycle through each child
			slider.children.each(function(index){
				// get the image title attribute
				var title = $(this).find('img:first').attr('title');
				// append the caption
				if(title !== undefined && ('' + title).length){
					$(this).append('<div class="bx-caption"><span>' + title + '</span></div>');
				}
			});
		};

		/**
		 * Click next binding
		 *
		 * @param e (event)
		 *  - DOM event object
		 */
		var clickNextBind = function(e){
			e.preventDefault();
			if (slider.controls.el.hasClass('disabled')) {
				return;
			}
			// if auto show is running, stop it
			if(slider.settings.auto){ el.stopAuto(); }
			el.goToNextSlide();
		};

		/**
		 * Click prev binding
		 *
		 * @param e (event)
		 *  - DOM event object
		 */
		var clickPrevBind = function(e){
			e.preventDefault();
			if (slider.controls.el.hasClass('disabled')) {
				return;
			}
			// if auto show is running, stop it
			if(slider.settings.auto){ el.stopAuto(); }
			el.goToPrevSlide();
		};

		/**
		 * Click start binding
		 *
		 * @param e (event)
		 *  - DOM event object
		 */
		var clickStartBind = function(e){
			el.startAuto();
			e.preventDefault();
		};

		/**
		 * Click stop binding
		 *
		 * @param e (event)
		 *  - DOM event object
		 */
		var clickStopBind = function(e){
			el.stopAuto();
			e.preventDefault();
		};

		/**
		 * Click pager binding
		 *
		 * @param e (event)
		 *  - DOM event object
		 */
		var clickPagerBind = function(e){
			e.preventDefault();
			if (slider.controls.el.hasClass('disabled')) {
				return;
			}
			// if auto show is running, stop it
			if(slider.settings.auto){ el.stopAuto(); }
			var pagerLink = $(e.currentTarget);
			if(pagerLink.attr('data-slide-index') !== undefined){
				var pagerIndex = parseInt(pagerLink.attr('data-slide-index'));
				// if clicked pager link is not active, continue with the goToSlide call
				if(pagerIndex !== slider.active.index){ el.goToSlide(pagerIndex); }
			}
		};

		/**
		 * Updates the pager links with an active class
		 *
		 * @param slideIndex (int)
		 *  - index of slide to make active
		 */
		var updatePagerActive = function(slideIndex){
			// if "short" pager type
			var len = slider.children.length; // nb of children
			if(slider.settings.pagerType === 'short'){
				if(slider.settings.maxSlides > 1){
					len = Math.ceil(slider.children.length/slider.settings.maxSlides);
				}
				slider.pagerEl.html( (slideIndex + 1) + slider.settings.pagerShortSeparator + len);
				return;
			}
			// remove all pager active classes
			slider.pagerEl.find('a').removeClass('active');
			// apply the active class for all pagers
			slider.pagerEl.each(function(i, el){ $(el).find('a').eq(slideIndex).addClass('active'); });
		};

		/**
		 * Performs needed actions after a slide transition
		 */
		var updateAfterSlideTransition = function(){
			// if infinite loop is true
			if(slider.settings.infiniteLoop){
				var position = '';
				// first slide
				if(slider.active.index === 0){
					// set the new position
					position = slider.children.eq(0).position();
				// carousel, last slide
				}else if(slider.active.index === getPagerQty() - 1 && slider.carousel){
					position = slider.children.eq((getPagerQty() - 1) * getMoveBy()).position();
				// last slide
				}else if(slider.active.index === slider.children.length - 1){
					position = slider.children.eq(slider.children.length - 1).position();
				}
				if(position){
					if(slider.settings.mode === 'horizontal'){ setPositionProperty(-position.left, 'reset', 0); }
					else if(slider.settings.mode === 'vertical'){ setPositionProperty(-position.top, 'reset', 0); }
				}
			}
			// declare that the transition is complete
			slider.working = false;
			// onSlideAfter callback
			slider.settings.onSlideAfter(slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index);
		};

		/**
		 * Updates the auto controls state (either active, or combined switch)
		 *
		 * @param state (string) "start", "stop"
		 *  - the new state of the auto show
		 */
		var updateAutoControls = function(state){
			// if autoControlsCombine is true, replace the current control with the new state
			if(slider.settings.autoControlsCombine){
				slider.controls.autoEl.html(slider.controls[state]);
			// if autoControlsCombine is false, apply the "active" class to the appropriate control
			}else{
				slider.controls.autoEl.find('a').removeClass('active');
				slider.controls.autoEl.find('a:not(.bx-' + state + ')').addClass('active');
			}
		};

		/**
		 * Updates the direction controls (checks if either should be hidden)
		 */
		var updateDirectionControls = function(){
			if(getPagerQty() === 1){
				slider.controls.prev.addClass('disabled');
				slider.controls.next.addClass('disabled');
			}else if(!slider.settings.infiniteLoop && slider.settings.hideControlOnEnd){
				// if first slide
				if(slider.active.index === 0){
					slider.controls.prev.addClass('disabled');
					slider.controls.next.removeClass('disabled');
				// if last slide
				}else if(slider.active.index === getPagerQty() - 1){
					slider.controls.next.addClass('disabled');
					slider.controls.prev.removeClass('disabled');
				// if any slide in the middle
				}else{
					slider.controls.prev.removeClass('disabled');
					slider.controls.next.removeClass('disabled');
				}
			}
		};

		/**
		 * Initializes the auto process
		 */
		var initAuto = function(){
			// if autoDelay was supplied, launch the auto show using a setTimeout() call
			if(slider.settings.autoDelay > 0){
				var timeout = setTimeout(el.startAuto, slider.settings.autoDelay);
			// if autoDelay was not supplied, start the auto show normally
			}else{
				el.startAuto();

				//add focus and blur events to ensure its running if timeout gets paused
				$(window).focus(function() {
					el.startAuto();
				}).blur(function() {
					el.stopAuto();
				});
				

			}
			// if autoHover is requested
			if(slider.settings.autoHover){
				// on el hover
				el.hover(function(){
					// if the auto show is currently playing (has an active interval)
					if(slider.interval){
						// stop the auto show and pass true argument which will prevent control update
						el.stopAuto(true);
						// create a new autoPaused value which will be used by the relative "mouseout" event
						slider.autoPaused = true;
					}
				}, function(){
					// if the autoPaused value was created be the prior "mouseover" event
					if(slider.autoPaused){
						// start the auto show and pass true argument which will prevent control update
						el.startAuto(true);
						// reset the autoPaused value
						slider.autoPaused = null;
					}
				});
			}
		};

		/**
		 * Initializes the ticker process
		 */
		var initTicker = function(){
			var startPosition = 0;
			// if autoDirection is "next", append a clone of the entire slider
			if(slider.settings.autoDirection === 'next'){
				el.append(slider.children.clone().addClass('bx-clone'));
			// if autoDirection is "prev", prepend a clone of the entire slider, and set the left position
			}else{
				el.prepend(slider.children.clone().addClass('bx-clone'));
				var position = slider.children.first().position();
				startPosition = slider.settings.mode === 'horizontal' ? -position.left : -position.top;
			}
			setPositionProperty(startPosition, 'reset', 0);
			// do not allow controls in ticker mode
			slider.settings.pager = false;
			slider.settings.controls = false;
			slider.settings.autoControls = false;
			// if autoHover is requested
			if(slider.settings.tickerHover){
				if(slider.usingCSS){
					var value;
					var idx = slider.settings.mode == 'horizontal' ? 4 : 5;
					slider.viewport.hover(function(){
						var transform = el.css('-' + slider.cssPrefix + '-transform');
						value = parseFloat(transform.split(',')[idx]);
						setPositionProperty(value, 'reset', 0);
					}, function(){
						var totalDimens = 0;
						slider.children.each(function(index){
						  totalDimens += slider.settings.mode == 'horizontal' ? $(this).outerWidth(true) : $(this).outerHeight(true);
						});
						// calculate the speed ratio (used to determine the new speed to finish the paused animation)
						var ratio = slider.settings.speed / totalDimens;
						// determine which property to use
						var property = slider.settings.mode == 'horizontal' ? 'left' : 'top';
						// calculate the new speed
						var newSpeed = ratio * (totalDimens - (Math.abs(parseInt(value))));
						tickerLoop(newSpeed);
					});
				} else {
					// on el hover
					slider.viewport.hover(function(){
						el.stop();
					}, function(){
						// calculate the total width of children (used to calculate the speed ratio)
						var totalDimens = 0;
						slider.children.each(function(index){
						  totalDimens += slider.settings.mode == 'horizontal' ? $(this).outerWidth(true) : $(this).outerHeight(true);
						});
						// calculate the speed ratio (used to determine the new speed to finish the paused animation)
						var ratio = slider.settings.speed / totalDimens;
						// determine which property to use
						var property = slider.settings.mode == 'horizontal' ? 'left' : 'top';
						// calculate the new speed
						var newSpeed = ratio * (totalDimens - (Math.abs(parseInt(el.css(property)))));
						tickerLoop(newSpeed);
					});
				}
			}
			// start the ticker loop
			tickerLoop();
		};

		/**
		 * Runs a continuous loop, news ticker-style
		 */
		var tickerLoop = function(resumeSpeed){
			speed = resumeSpeed ? resumeSpeed : slider.settings.speed;
			var position = {left: 0, top: 0};
			var reset = {left: 0, top: 0};
			// if "next" animate left position to last child, then reset left to 0
			if(slider.settings.autoDirection === 'next'){
				position = el.find('.bx-clone').first().position();
			// if "prev" animate left position to 0, then reset left to first non-clone child
			}else{
				reset = slider.children.first().position();
			}
			var animateProperty = slider.settings.mode === 'horizontal' ? -position.left : -position.top;
			var resetValue = slider.settings.mode === 'horizontal' ? -reset.left : -reset.top;
			var params = {resetValue: resetValue};
			setPositionProperty(animateProperty, 'ticker', speed, params);
		};

		/**
		 * Check if el is on screen
		 */
		var isOnScreen = function(el){
			var win = $(window);
			var viewport = {
				top : win.scrollTop(),
				left : win.scrollLeft()
			};
			viewport.right = viewport.left + win.width();
			viewport.bottom = viewport.top + win.height();

			var bounds = el.offset();
			bounds.right = bounds.left + el.outerWidth();
			bounds.bottom = bounds.top + el.outerHeight();

			return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
		};

		/**
		 * Initializes keyboard events
		 */
		var keyPress = function(e){
			var activeElementTag = document.activeElement.tagName.toLowerCase();
			var tagFilters='input|textarea';
			var p = new RegExp(activeElementTag,["i"]);
			var result = p.exec(tagFilters);
			if (result == null && isOnScreen(el)) {
				if (e.keyCode == 39) {
					clickNextBind(e);
					return false;
				}
				else if (e.keyCode == 37) {
					clickPrevBind(e);
					return false;
				}
			}
		};

		/**
		 * Initializes touch events
		 */
		var initTouch = function(){
			// initialize object to contain all touch values
			slider.touch = {
				start: {x: 0, y: 0},
				end: {x: 0, y: 0}
			};
			slider.viewport.bind('touchstart MSPointerDown pointerdown', onTouchStart);
			
			//for browsers that have implemented pointer events and fire a click after
			//every pointerup regardless of whether pointerup is on same screen location as pointerdown or not
			slider.viewport.on('click', '.bxslider a', function(e) {
				if (slider.viewport.hasClass('click-disabled')) {
					e.preventDefault();
					slider.viewport.removeClass('click-disabled');
				}
			});
		};

		/**
		 * Event handler for "touchstart"
		 *
		 * @param e (event)
		 *  - DOM event object
		 */
		var onTouchStart = function(e){
			//disable slider controls while user is interacting with slides to avoid slider freeze that happens on touch devices when a slide swipe happens immediately after interacting with slider controls
			slider.controls.el.addClass('disabled');

			if(slider.working){
				e.preventDefault();
				slider.controls.el.removeClass('disabled');
			}else{
				// record the original position when touch starts
				slider.touch.originalPos = el.position();
				var orig = e.originalEvent;
				var touchPoints = (typeof orig.changedTouches != 'undefined') ? orig.changedTouches : [orig];
				// record the starting touch x, y coordinates
				slider.touch.start.x = touchPoints[0].pageX;
				slider.touch.start.y = touchPoints[0].pageY;

				if (slider.viewport.get(0).setPointerCapture) {
					slider.pointerId = orig.pointerId;
					slider.viewport.get(0).setPointerCapture(slider.pointerId);
				}
				// bind a "touchmove" event to the viewport
				slider.viewport.bind('touchmove MSPointerMove pointermove', onTouchMove);
				// bind a "touchend" event to the viewport
				slider.viewport.bind('touchend MSPointerUp pointerup', onTouchEnd);
				slider.viewport.bind('MSPointerCancel pointercancel', onPointerCancel);
			}
		};

		/**
		 * Cancel Pointer for Windows Phone
		 *
		 * @param e (event)
		 *  - DOM event object
		 */
		var onPointerCancel = function(e) {
		/* onPointerCancel handler is needed to deal with situations when a touchend
		doesn't fire after a touchstart (this happens on windows phones only) */
			setPositionProperty(slider.touch.originalPos.left, 'reset', 0);

			//remove handlers
			slider.controls.el.removeClass('disabled');
			slider.viewport.unbind('MSPointerCancel pointercancel', onPointerCancel);
			slider.viewport.unbind('touchmove MSPointerMove pointermove', onTouchMove);
			slider.viewport.unbind('touchend MSPointerUp pointerup', onTouchEnd);
			if (slider.viewport.get(0).releasePointerCapture) {
				slider.viewport.get(0).releasePointerCapture(slider.pointerId);
 			}
		}

		/**
		 * Event handler for "touchmove"
		 *
		 * @param e (event)
		 *  - DOM event object
		 */
		var onTouchMove = function(e){
			var orig = e.originalEvent;
			var touchPoints = (typeof orig.changedTouches != 'undefined') ? orig.changedTouches : [orig];
			// if scrolling on y axis, do not prevent default
			var xMovement = Math.abs(touchPoints[0].pageX - slider.touch.start.x);
			var yMovement = Math.abs(touchPoints[0].pageY - slider.touch.start.y);
			// x axis swipe
			if((xMovement * 3) > yMovement && slider.settings.preventDefaultSwipeX){
				e.preventDefault();
			// y axis swipe
			}else if((yMovement * 3) > xMovement && slider.settings.preventDefaultSwipeY){
				e.preventDefault();
			}
			if(slider.settings.mode !== 'fade' && slider.settings.oneToOneTouch){
				var value = 0, change = 0;
				// if horizontal, drag along x axis
				if(slider.settings.mode === 'horizontal'){
					change = touchPoints[0].pageX - slider.touch.start.x;
					value = slider.touch.originalPos.left + change;
				// if vertical, drag along y axis
				}else{
					change = touchPoints[0].pageY - slider.touch.start.y;
					value = slider.touch.originalPos.top + change;
				}
				setPositionProperty(value, 'reset', 0);
			}
		};

		/**
		 * Event handler for "touchend"
		 *
		 * @param e (event)
		 *  - DOM event object
		 */
		var onTouchEnd = function(e){
			slider.viewport.unbind('touchmove MSPointerMove pointermove', onTouchMove);
			//enable slider controls as soon as user stops interacing with slides
			slider.controls.el.removeClass('disabled');
			var orig = e.originalEvent;
			var touchPoints = (typeof orig.changedTouches != 'undefined') ? orig.changedTouches : [orig];
			var value = 0;
			var distance = 0;
			// record end x, y positions
			slider.touch.end.x = touchPoints[0].pageX;
			slider.touch.end.y = touchPoints[0].pageY;
			// if fade mode, check if absolute x distance clears the threshold
			if(slider.settings.mode === 'fade'){
				distance = Math.abs(slider.touch.start.x - slider.touch.end.x);
				if(distance >= slider.settings.swipeThreshold){
					if(slider.touch.start.x > slider.touch.end.x){
						el.goToNextSlide();
					} else {
						el.goToPrevSlide();
					} 
					el.stopAuto();
				}
			// not fade mode
			}else{
				// calculate distance and el's animate property
				if(slider.settings.mode === 'horizontal'){
					distance = slider.touch.end.x - slider.touch.start.x;
					value = slider.touch.originalPos.left;
				}else{
					distance = slider.touch.end.y - slider.touch.start.y;
					value = slider.touch.originalPos.top;
				}
				// if not infinite loop and first / last slide, do not attempt a slide transition
				if(!slider.settings.infiniteLoop && ((slider.active.index === 0 && distance > 0) || (slider.active.last && distance < 0))){
					setPositionProperty(value, 'reset', 200);
				}else{
					// check if distance clears threshold
					if(Math.abs(distance) >= slider.settings.swipeThreshold){
						if(distance < 0){
							el.goToNextSlide();
						} else {
							el.goToPrevSlide();
						} 
						el.stopAuto();
					}else{
						// el.animate(property, 200);
						setPositionProperty(value, 'reset', 200);
					}
				}
			}
			slider.viewport.unbind('touchend MSPointerUp pointerup', onTouchEnd);
			if (slider.viewport.get(0).releasePointerCapture) {
				slider.viewport.get(0).releasePointerCapture(slider.pointerId);
			}
		};

		/**
		 * Window resize event callback
		 */
		var resizeWindow = function(e){
			// don't do anything if slider isn't initialized.
			if(!slider.initialized){ return; }
			// Delay if slider working.
			if (slider.working) {
				window.setTimeout(resizeWindow, 10);
			} else {
				// get the new window dimens (again, thank you IE)
				var windowWidthNew = $(window).width();
				var windowHeightNew = $(window).height();
				// make sure that it is a true window resize
				// *we must check this because our dinosaur friend IE fires a window resize event when certain DOM elements
				// are resized. Can you just die already?*
				if(windowWidth !== windowWidthNew || windowHeight !== windowHeightNew){
					// set the new window dimens
					windowWidth = windowWidthNew;
					windowHeight = windowHeightNew;
					// update all dynamic elements
					el.redrawSlider();
					// Call user resize handler
					slider.settings.onSliderResize.call(el, slider.active.index);
				}
			}
		};

		/**
		 * ===================================================================================
		 * = PUBLIC FUNCTIONS
		 * ===================================================================================
		 */

		/**
		 * Performs slide transition to the specified slide
		 *
		 * @param slideIndex (int)
		 *  - the destination slide's index (zero-based)
		 *
		 * @param direction (string)
		 *  - INTERNAL USE ONLY - the direction of travel ("prev" / "next")
		 */
		el.goToSlide = function(slideIndex, direction){
			// if plugin is currently in motion, ignore request
			if(slider.working || slider.active.index === slideIndex){ return; }
			// declare that plugin is in motion
			slider.working = true;
			// store the old index
			slider.oldIndex = slider.active.index;
			// if slideIndex is less than zero, set active index to last child (this happens during infinite loop)
			if(slideIndex < 0){
				slider.active.index = getPagerQty() - 1;
			// if slideIndex is greater than children length, set active index to 0 (this happens during infinite loop)
			}else if(slideIndex >= getPagerQty()){
				slider.active.index = 0;
			// set active index to requested slide
			}else{
				slider.active.index = slideIndex;
			}
			// onSlideBefore, onSlideNext, onSlidePrev callbacks
			// Allow transition canceling based on returned value
			var performTransition = true;

			performTransition = slider.settings.onSlideBefore(slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index);
			
			if ( typeof(performTransition) !== "undefined" && !performTransition ) {
				slider.active.index = slider.oldIndex; // restore old index
				slider.working = false; // is not in motion
				return;	
			}
			if(direction === 'next'){
				// Prevent canceling in future functions or lack there-of from negating previous commands to cancel
				if(!slider.settings.onSlideNext(slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index)){
					performTransition = false;
				}
			}else if(direction === 'prev'){
				// Prevent canceling in future functions or lack there-of from negating previous commands to cancel
				if(!slider.settings.onSlidePrev(slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index)){
					performTransition = false;
				}
			}

			// If transitions canceled, reset and return
			if ( typeof(performTransition) !== "undefined" && !performTransition ) {
				slider.active.index = slider.oldIndex; // restore old index
				slider.working = false; // is not in motion
				return;	
			}

			// check if last slide
			slider.active.last = slider.active.index >= getPagerQty() - 1;
			// update the pager with active class
			if(slider.settings.pager || slider.settings.pagerCustom){ updatePagerActive(slider.active.index); }
			// // check for direction control update
			if(slider.settings.controls){ updateDirectionControls(); }
			// if slider is set to mode: "fade"
			if(slider.settings.mode === 'fade'){
				// if adaptiveHeight is true and next height is different from current height, animate to the new height
				if(slider.settings.adaptiveHeight && slider.viewport.height() !== getViewportHeight()){
					slider.viewport.animate({height: getViewportHeight()}, slider.settings.adaptiveHeightSpeed);
				}
				// fade out the visible child and reset its z-index value
				slider.children.filter(':visible').fadeOut(slider.settings.speed).css({zIndex: 0});
				// fade in the newly requested slide
				slider.children.eq(slider.active.index).css('zIndex', slider.settings.slideZIndex+1).fadeIn(slider.settings.speed, function(){
					$(this).css('zIndex', slider.settings.slideZIndex);
					updateAfterSlideTransition();
				});
			// slider mode is not "fade"
			}else{
				// if adaptiveHeight is true and next height is different from current height, animate to the new height
				if(slider.settings.adaptiveHeight && slider.viewport.height() !== getViewportHeight()){
					slider.viewport.animate({height: getViewportHeight()}, slider.settings.adaptiveHeightSpeed);
				}
				var moveBy = 0;
				var position = {left: 0, top: 0};
				var lastChild = null;
				// if carousel and not infinite loop
				if(!slider.settings.infiniteLoop && slider.carousel && slider.active.last){
					if(slider.settings.mode === 'horizontal'){
						// get the last child position
						lastChild = slider.children.eq(slider.children.length - 1);
						position = lastChild.position();
						// calculate the position of the last slide
						moveBy = slider.viewport.width() - lastChild.outerWidth();
					}else{
						// get last showing index position
						var lastShowingIndex = slider.children.length - slider.settings.minSlides;
						position = slider.children.eq(lastShowingIndex).position();
					}
					// horizontal carousel, going previous while on first slide (infiniteLoop mode)
				}else if(slider.carousel && slider.active.last && direction === 'prev'){
					// get the last child position
					var eq = slider.settings.moveSlides === 1 ? slider.settings.maxSlides - getMoveBy() : ((getPagerQty() - 1) * getMoveBy()) - (slider.children.length - slider.settings.maxSlides);
					lastChild = el.children('.bx-clone').eq(eq);
					position = lastChild.position();
				// if infinite loop and "Next" is clicked on the last slide
				}else if(direction === 'next' && slider.active.index === 0){
					// get the last clone position
					position = el.find('> .bx-clone').eq(slider.settings.maxSlides).position();
					slider.active.last = false;
				// normal non-zero requests
				}else if(slideIndex >= 0){
					var requestEl = slideIndex * getMoveBy();
					position = slider.children.eq(requestEl).position();
				}

				
				/* If the position doesn't exist
				 * (e.g. if you destroy the slider on a next click),
				 * it doesn't throw an error.
				 */
				if("undefined" !== typeof(position)){
					var value = slider.settings.mode === 'horizontal' ? -(position.left - moveBy) : -position.top;
					// plugin values to be animated
					setPositionProperty(value, 'slide', slider.settings.speed);
				}
			}
		};

		/**
		 * Transitions to the next slide in the show
		 */
		el.goToNextSlide = function(){
			// if infiniteLoop is false and last page is showing, disregard call
			if(!slider.settings.infiniteLoop && slider.active.last){ return; }
			var pagerIndex = parseInt(slider.active.index) + 1;
			el.goToSlide(pagerIndex, 'next');
		};

		/**
		 * Transitions to the prev slide in the show
		 */
		el.goToPrevSlide = function(){
			// if infiniteLoop is false and last page is showing, disregard call
			if(!slider.settings.infiniteLoop && slider.active.index === 0){ return; }
			var pagerIndex = parseInt(slider.active.index) - 1;
			el.goToSlide(pagerIndex, 'prev');
		};

		/**
		 * Starts the auto show
		 *
		 * @param preventControlUpdate (boolean)
		 *  - if true, auto controls state will not be updated
		 */
		el.startAuto = function(preventControlUpdate){
			// if an interval already exists, disregard call
			if(slider.interval){ return; }
			// create an interval
			slider.interval = setInterval(function(){
				if(slider.settings.autoDirection === 'next'){ 
					el.goToNextSlide(); 
				}else{
					el.goToPrevSlide();
				}
			}, slider.settings.pause);
			// if auto controls are displayed and preventControlUpdate is not true
			if(slider.settings.autoControls && preventControlUpdate !== true){ updateAutoControls('stop'); }
		};

		/**
		 * Stops the auto show
		 *
		 * @param preventControlUpdate (boolean)
		 *  - if true, auto controls state will not be updated
		 */
		el.stopAuto = function(preventControlUpdate){
			// if no interval exists, disregard call
			if(!slider.interval){ return; }
			// clear the interval
			clearInterval(slider.interval);
			slider.interval = null;
			// if auto controls are displayed and preventControlUpdate is not true
			if(slider.settings.autoControls && preventControlUpdate !== true){ updateAutoControls('start'); }
		};

		/**
		 * Returns current slide index (zero-based)
		 */
		el.getCurrentSlide = function(){
			return slider.active.index;
		};

		/**
		 * Returns current slide element
		 */
		el.getCurrentSlideElement = function(){
			return slider.children.eq(slider.active.index);
		};

		/**
		 * Returns number of slides in show
		 */
		el.getSlideCount = function(){
			return slider.children.length;
		};

		/**
		 * Return slider.working variable
		 */
		el.isWorking = function() {
			return slider.working;
		}

		/**
		 * Update all dynamic slider elements
		 */
		el.redrawSlider = function(){
			// resize all children in ratio to new screen size
			slider.children.add(el.find('.bx-clone')).outerWidth(getSlideWidth());
			// adjust the height
			slider.viewport.css('height', getViewportHeight());
			// update the slide position
			if(!slider.settings.ticker) { setSlidePosition(); }                 
			// if active.last was true before the screen resize, we want
			// to keep it last no matter what screen size we end on
			if (slider.active.last) { slider.active.index = getPagerQty() - 1; }
			// if the active index (page) no longer exists due to the resize, simply set the index as last
			if (slider.active.index >= getPagerQty()) { slider.active.last = true; }
			// if a pager is being displayed and a custom pager is not being used, update it
			if(slider.settings.pager && !slider.settings.pagerCustom){
				populatePager();
				updatePagerActive(slider.active.index);
			}
		};

		/**
		 * Destroy the current instance of the slider (revert everything back to original state)
		 */
		el.destroySlider = function(){
			// don't do anything if slider has already been destroyed
			if(!slider.initialized){ return; }
			slider.initialized = false;
			$('.bx-clone', this).remove();
			slider.children.each(function(){
				if($(this).data("origStyle") !== undefined){
					$(this).attr("style", $(this).data("origStyle"));
				} else {
					$(this).removeAttr('style');
				}
			});
			if($(this).data("origStyle") !== undefined){
				this.attr("style", $(this).data("origStyle"));
			} else {
				$(this).removeAttr('style');
			}
			$(this).unwrap().unwrap();
			if(slider.controls.el){ slider.controls.el.remove(); }
			if(slider.controls.next){ slider.controls.next.remove(); }
			if(slider.controls.prev){ slider.controls.prev.remove(); }
			if(slider.pagerEl && slider.settings.controls && !slider.settings.pagerCustom){ slider.pagerEl.remove(); }
			$('.bx-caption', this).remove();
			if(slider.controls.autoEl){ slider.controls.autoEl.remove(); }
			clearInterval(slider.interval);
			if(slider.settings.responsive){ $(window).unbind('resize', resizeWindow); }
			if(slider.settings.keyboardEnabled){ $(document).unbind('keydown', keyPress); }
		};

		/**
		 * Reload the slider (revert all DOM changes, and re-initialize)
		 */
		el.reloadSlider = function(settings){
			if(settings !== undefined){ options = settings; }
			el.destroySlider();
			init();
		};

		init();

		// returns the current jQuery object
		return this;
	};

})(jQuery);

(function($){
  'use strict';

  $(window).load(function(){
    $('.site-loader').fadeOut('slow');
  });

  /**
   * Main menu
   */
  $('[data-action=open-menu]').on('click', function(ev){
    ev.preventDefault();

    /*
    $('.main-navigation').addClass('active');
    $('.menu-overlay').addClass('active');

    $('.main-navigation')[0].offsetWidth;
    $('.menu-overlay')[0].offsetWidth;
    */

    $('html').toggleClass('open-menu');
  });

  $(document).on('click', '.menu-overlay', function(ev){
    $('html').toggleClass('open-menu');
  });

  /**
   * Menu handler
   */
  $('.menu:not(.menu-contacts):not(.menu-languages) a').on('click', function(ev){
    ev.preventDefault();

    var $trigger = $(this),
        $target  = $($trigger.attr('href')),
        $targets = $target.siblings(),

        $parent = $trigger.parent('li'),
        $items  = $parent.siblings(),

        $scroller = $target.find('.scroller');

    if ($parent.hasClass('menu-item-is-open')) {
      $parent.removeClass('menu-item-is-open');

      return;
    }

    $targets.removeClass('active animated');

    $target.addClass('active');
    $target[0].offsetWidth;
    $target.addClass('animated');

    $items.removeClass('current-menu-item');
    $items.removeClass('menu-item-is-open');

    $parent.addClass('current-menu-item');

    if ($parent.hasClass('menu-item-has-children')) {
      $parent.addClass('menu-item-is-open');

      var $subitems = $parent.find('.sub-menu a');

      $subitems.removeClass('fadeInLeft');
      $subitems.each(function(){
        this.offsetWidth
        $(this).addClass('fadeInLeft');
      });
    }

    $('html').removeClass('open-menu');

    $scroller.find('.nano').nanoScroller({
      sliderMaxHeight: 11,
      sliderMinHeight: 11
    });

    $(document).trigger('lv.changed_section', [$trigger, $target]);
  });

  $('.menu:not(.menu-contacts):not(.menu-languages):not(.menu-products) li:first-child > a').trigger('click');

  /**
   * Shows the first sub item by default
   */
  $('.item').each(function(){
    $(this).find('.item').first().addClass('active animated');
  });

  /**
   * Main slideshow
   */
  $('.item-home .slider').bxSlider({
    mode: 'vertical',
    infiniteLoop: true,
    controls: false,
    auto: true,
    autoStart: true
  });

  /**
   * Sets images as backgrounds
   */
  $('.item-image:not(.product-images), .product-images div').each(function(){
    var $el  = $(this),
        $img = $el.find('img');

    if (!$img.size()) {
      return;
    }

    $el.css('background-image', 'url(' + $img.attr('src') + ')');
    $img.hide();
  });

  /**
   * Products interaction
   */
  $('body').on('click', '.menu-products a', function(ev){
    var $link  = $(this),
        $menus = $('.menu-products'),
        index  = $link.parent().index();

    $menus.each(function(){
      var $items = $(this).find('li');

      $items.removeClass('current-menu-item');
      $items.eq(index).addClass('current-menu-item');
    });
  });

  /**
   * Contact interactions
   */

  var
    pointer = {url: LUVECK_MAP_MARKER, size: new google.maps.Size(39,56)},

    // Center point
    mapCenter = new google.maps.LatLng(25.8713186, -80.1997791),

    // Map pointers
    mapPoints = new google.maps.LatLngBounds(),

    // Infowindow instance
    mapInfo = new google.maps.InfoWindow(),

    // Map instance
    map = new google.maps.Map(document.getElementById('contact-map'), {
      zoom: 4,
      center: mapCenter,
      panControl: false,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false
    });

  // Adding branches pointers
  $('[data-branch]').each(function(){
    var branch = $(this),
        point  = new google.maps.LatLng(branch.data('lat'), branch.data('lng')),
        marker = new google.maps.Marker({
          position: point,
          icon: pointer,
          map: map
        });

    branch.data('marker', marker);

    mapPoints.extend(point);
  });

  // Centering pointers
  map.setCenter(mapPoints.getCenter());

  $('body').on('click', '[data-action=show-branch]', function(ev){
    ev.preventDefault();

    var $trigger = $(this),
        $branch  = $trigger.closest('.branch'),
        data     = $branch.data();

    $branch.siblings().removeClass('active');
    $branch.addClass('active');

    map.setCenter(data.marker.getPosition());
    map.setZoom(16);
  });

  $(document).on('lv.changed_section', function(ev, trigger, target){
    var $trigger = $(trigger),
        $target  = $(target);

    if (!$target.hasClass('item-contact')) {
      return;
    }

    google.maps.event.trigger(map, 'resize');
    map.setCenter(mapPoints.getCenter());
    map.setZoom(4);
  });

  /*
   * Contact form handler
   */
  var $messages = $('.form-feedback');

  $('body').on('submit', '#form-contacto', function(ev){
    ev.preventDefault();

    var $form   = $(this),
      $inputs = $form.find(':input'),
      data    = $form.serialize();

    $inputs.prop('disabled', true);
    $messages.fadeOut().html();

    $.post($form.attr('action'), data, function(response){
      var $text = $('<p />', {
        text: response.message,
        'class': 'feedback ' + response.status
      });

      $messages.html($text).fadeIn();

      $inputs.prop('disabled', false);

      if (response.status == 'success') {
        $form.get(0).reset();
      }
    });
  });

  /**
   * Adds delays to submenus
   */
  $('.sub-menu').each(function(){
    var $menu  = $(this),
        $items = $menu.find('> li a');

    $items
      .addClass('animated fadeInLeft')
      .each(function(i){
        var delay = .2 * i;

        $(this).css('animation-delay', delay + 's');
      });
  });

  var $modal      = $('.modal'),
      $modalClose = $modal.find('.modal-close'),
      modalShowed = false;

  $(document).on('lv.changed_section', function(ev, trigger, target){
    var $trigger = $(trigger),
        $target  = $(target);

    if (!$target.hasClass('item-products')) {
      return;
    }

    if (modalShowed) {
      return;
    }

    modalShowed = true;

    $modal.addClass('in');
    $modal[0].offsetWidth;
    $modal.addClass('animated fadeIn');
  });

  $modalClose.on('click', function(ev){
    ev.preventDefault();

    $modal.removeClass('fadeIn');
    $modal[0].offsetWidth;
    $modal.addClass('animated fadeOut');

    $modal.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
      $modal.hide();
    });
  });
})(jQuery);
