'use strict';
export default ()=>{
  let userDevice = {
    isSmartPhone: function () {
      let ua = navigator.userAgent;
      if (
        ua.indexOf('iPhone') > 0 ||
        ua.indexOf('iPod') > 0 ||
        (ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0)
      ) {
        //"SmartPhon";
        return true;
      } else if (ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0) {
        //"Tablet";
        return true;
      }
      return false;
    },
  };

  class MomentumScroll {
    constructor(selector) {
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

    run() {
      if (this.isActive) {
        return;
      }

      this.isActive = true;

      this.on();
      this.setStyles();
    }

    destroy() {
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

    resize() {
      document.body.style.height = `${this.container.clientHeight}px`;
    }

    scroll() {
      this.scrollY = window.scrollY || window.pageYOffset;

      if (!this.rafId) {
        this.container.style.willChange = 'transform';
        this.rafId = requestAnimationFrame(() => this.render());
      }
    }

    on() {
      this.resize();
      this.scroll();
      window.addEventListener('scroll', this.scrollHandler, {
        passive: true,
      });
      window.addEventListener('resize', this.resizeHandler);
      window.addEventListener('load', this.resizeHandler);
    }

    off() {
      window.removeEventListener('scroll', this.scrollHandler);
      window.removeEventListener('resize', this.resizeHandler);
      window.removeEventListener('load', this.resizeHandler);
    }

    setStyles() {
      this.container.style.position = 'fixed';
      this.container.style.width = '100%';
      this.container.style.top = 0;
      this.container.style.left = 0;
    }

    clearStyles() {
      document.body.style.height = '';
      this.container.style.position = '';
      this.container.style.width = '';
      this.container.style.top = '';
      this.container.style.left = '';
      this.container.style.transform = '';
      this.container.style.willChange = '';
    }

    render() {
      const nextY =
        this.translateY + (this.scrollY - this.translateY) * this.speed;
      // $('section').css({
      //   transform: 'skewY(' + (this.scrollY - this.translateY) / 480 + 'deg)',
      // });
      const containerChildren = document.querySelectorAll('.js-containerChild');
      containerChildren.forEach((containerChild) => {
        containerChild.style.transform =
          'skewY(' + (this.scrollY - this.translateY) / 480 + 'deg)';
      });

      const isNear = Math.abs(this.scrollY - nextY) <= 0.1;
      this.translateY = isNear ? this.scrollY : nextY;
      const roundedY = Math.round(this.translateY * 100) / 100;
      this.container.style.transform = `translate3d(0, -${roundedY}px, 0)`;
      if (isNear) {
        this.rafId = null;
        this.container.style.willChange = '';
      } else {
        this.rafId = requestAnimationFrame(() => this.render());
      }
    }
  }
  let momentumScroll;
  if (!userDevice.isSmartPhone()) {
    document.addEventListener('DOMContentLoaded', () => {
      momentumScroll = new MomentumScroll('#container');
      setInterval(momentumScroll.resize, 1000);
    });
  }

}
