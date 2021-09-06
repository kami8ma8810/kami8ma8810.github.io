"use strict";

//MV100vh
var setViewHeight = function setViewHeight() {
  var vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', "".concat(vh, "px"));
}; //リサイズ時にも発動するようにする


window.addEventListener('resize', setViewHeight); //初期化

setViewHeight(); // 現在のナビゲーションハイライト

$(function () {
  $('.header-nav a').each(function () {
    if (this.href == location.href) {
      $(this).parents('li').addClass('is-current');
    }
  });
});