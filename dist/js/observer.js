"use strict";

document.addEventListener('DOMContentLoaded', function () {
  var options = {
    root: null,
    rootMargin: '-30% 0px'
  }; //監視する要素を指定

  var observerElements = document.querySelectorAll('.js-trigger');
  var observerFunc = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      // 動かす要素を指定
      var targetElement = entry.target.querySelectorAll('.js-fadein');

      if (entry.isIntersecting) {
        gsap.fromTo(targetElement, {
          y: 50
        }, {
          duration: 1,
          opacity: 1,
          // rotation: '-360deg',
          autoAlpha: 1,
          y: 0,
          stagger: .2
        });
        observerFunc.unobserve(entry.target);
      }
    });
  }, options);
  observerElements.forEach(function (el) {
    observerFunc.observe(el);
  });
}, false);