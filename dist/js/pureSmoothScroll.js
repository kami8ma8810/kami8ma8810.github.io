'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Util = {
  isSmartPhone: function isSmartPhone() {
    var ut = navigator.userAgent;

    if (ut.indexOf('iPhone') > 0 || ut.indexOf('iPod') > 0 || ut.indexOf('Android') > 0 && ut.indexOf('Mobile') > 0) {
      //"SmartPhon";
      return true;
    } else if (ut.indexOf('iPad') > 0 || ut.indexOf('Android') > 0) {
      //"Tablet";
      return true;
    }

    return false;
  },
  getParam: function getParam(name) {
    url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }
};

var MomentumScroll = /*#__PURE__*/function () {
  function MomentumScroll(selector) {
    _classCallCheck(this, MomentumScroll);

    this.container = document.querySelector(selector);
    this.scrollY = 0;
    this.translateY = 0;
    this.speed = 0.2;
    this.rafId = null;
    this.isActive = false;
    this.scrollHandler = this.scroll.bind(this);
    this.resizeHandler = this.resize.bind(this);
    this.run();
  }

  _createClass(MomentumScroll, [{
    key: "run",
    value: function run() {
      if (this.isActive) {
        return;
      }

      this.isActive = true;
      this.on();
      this.setStyles();
    }
  }, {
    key: "destroy",
    value: function destroy() {
      if (!this.isActive) {
        return;
      }

      this.isActive = false;
      this.off();
      this.clearStyles();

      if (this.rafId) {
        cancelAnimationFrame(this.rafId);
      }

      this.rafId = null;
    }
  }, {
    key: "resize",
    value: function resize() {
      document.body.style.height = "".concat(this.container.clientHeight, "px");
    }
  }, {
    key: "scroll",
    value: function scroll() {
      var _this = this;

      this.scrollY = window.scrollY || window.pageYOffset;

      if (!this.rafId) {
        this.container.style.willChange = 'transform';
        this.rafId = requestAnimationFrame(function () {
          return _this.render();
        });
      }
    }
  }, {
    key: "on",
    value: function on() {
      this.resize();
      this.scroll();
      window.addEventListener('scroll', this.scrollHandler, {
        passive: true
      });
      window.addEventListener('resize', this.resizeHandler);
      window.addEventListener('load', this.resizeHandler);
    }
  }, {
    key: "off",
    value: function off() {
      window.removeEventListener('scroll', this.scrollHandler);
      window.removeEventListener('resize', this.resizeHandler);
      window.removeEventListener('load', this.resizeHandler);
    }
  }, {
    key: "setStyles",
    value: function setStyles() {
      this.container.style.position = 'fixed';
      this.container.style.width = '100%';
      this.container.style.top = 0;
      this.container.style.left = 0;
    }
  }, {
    key: "clearStyles",
    value: function clearStyles() {
      document.body.style.height = '';
      this.container.style.position = '';
      this.container.style.width = '';
      this.container.style.top = '';
      this.container.style.left = '';
      this.container.style.transform = '';
      this.container.style.willChange = '';
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var nextY = this.translateY + (this.scrollY - this.translateY) * this.speed;
      $('section').css({
        transform: 'skewY(' + (this.scrollY - this.translateY) / 480 + 'deg)'
      });
      var isNear = Math.abs(this.scrollY - nextY) <= 0.1;
      this.translateY = isNear ? this.scrollY : nextY;
      var roundedY = Math.round(this.translateY * 100) / 100;
      this.container.style.transform = "translate3d(0, -".concat(roundedY, "px, 0)");

      if (isNear) {
        this.rafId = null;
        this.container.style.willChange = '';
      } else {
        this.rafId = requestAnimationFrame(function () {
          return _this2.render();
        });
      }
    }
  }]);

  return MomentumScroll;
}();

var momentumScroll;

if (!Util.isSmartPhone()) {
  document.addEventListener('DOMContentLoaded', function () {
    momentumScroll = new MomentumScroll('#js-momentumScroll');
    setInterval(momentumScroll.resize, 1000);
  });
}