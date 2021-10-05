'use strict';
class Slider {
  constructor(el) {
    this.el = el;
    this.swiper = this._initSwiper();
  }
  // 初期処理
  _initSwiper() {
    return new Swiper(this.el, {
      autoplay: {
        delay: 1500,
        disableOnInteraction: false, //ユーザー操作後もオートプレイ続行
        pauseOnMouseEnter: true, //マウスホバーで一時停止
        reverseDirection: true, //逆方向への移動OK
      },
      loop: true,
      speed: 400,
      slidesPerView: 2,
      centeredSlides: true,
      grabCursor: true,
      effect: "cards",
      pagination: {
        el: ".swiper-pagination",
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }
  // 停止メソッド（ビューポート内から外れたらメモリ節約のために停止しておくため）
  stop() {
    this.swiper.autoplay.stop();
  }
  // 開始メソッド（ビューポート内に入ったらオートプレイさせるため）
  start() {
    this.swiper.autoplay.start();
  }
}

module.exports = Slider
