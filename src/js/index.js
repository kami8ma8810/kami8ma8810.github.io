import ua from "./modules/add-useragent-class";
import setFillHeight from "./modules/set-fill-height";
import loading from "./modules/loading";
import styleHoverChange from "./modules/style-hover-change";
import headerNavHighlight from "./modules/header-nav-highlight";
import toggleModal from "./modules/modal";
import toggleDrawer from "./modules/drawer";
import ScrollObserver from "./modules/scroll-observer";
import Slider from "./modules/slider";
import smoothParallax from "./smoothParallax";

import scrollTop from "./modules/scrollTop";
import { shuffleLettersAnime } from "./shuffleLetters";
import IntersectionObserver from "./intersectionObserver";
import shuffleText from "./shuffleText";

import { gsap } from "gsap";

document.addEventListener("DOMContentLoaded", function () {
  const main = new Main();
});
const drawerOpenBtn = document.querySelector("#js-drawerOpen");
const drawerCloseBtn = document.querySelector("#js-close-drawer");
const drawerInner = document.querySelector(".c-drawer");

// slideIn from right
let tl = gsap.timeline();

gsap.set(drawerInner, { yPercent: -100 });

drawerOpenBtn.addEventListener("click", () => {

  console.log("open!");
  // 2回目以降も発火させる場合はreversedの条件付けをする
  if (!tl.reversed()) {
    tl.to(drawerInner, { yPercent: 0, duration: 0.4 }).from(
      ".drawer-nav-item",
      {
        stagger: { amount: 0.4 },
        xPercent: -101,
      }
    );
  } else {
    tl.play();
  }

});
drawerCloseBtn.addEventListener("click", () => {
  console.log("close!");
  tl.reverse();
});

class Main {
  constructor() {
    this._observers = []; //オブザーバーする要素をすべて配列にするための初期化
    this._init();
    this._addUserAgentClass();
    this._slider();
    this._scrollInit();
  }
  _init() {
    // ローディング終了＆loadイベント処理
    loading();
    // タッチ可能デバイスの場合hoverをactiveに変換
    styleHoverChange();
    // 高さ100vh調整（safari込み）
    setFillHeight();
    // ヘッダーナビ現在のページハイライト
    headerNavHighlight();
    // ドロワー開閉
    // toggleDrawer();
    // モーダル開閉
    // toggleModal();
  }
  _addUserAgentClass() {
    //bodyに各UserAgentクラスを付与
    ua.init();
    // PCでは電話番号ボタンを無効
    const telTargets = document.querySelectorAll("a[href*='tel:']");
    for (let telTarget of telTargets) {
      telTarget.addEventListener("click", (e) => {
        if (ua.getDevice() == "pc") {
          e.preventDefault();
        }
      });
    }
  }
  _slider() {
    if (document.querySelector(".swiper") !== null) {
      this.swiperSlider = new Slider(".swiper");
    }
  }
  /*--------------------------------------------------
  ここからオブザーバー関連
  --------------------------------------------------*/
  set observers(val) {
    this._observers.push(val); //オブザーバーする要素をすべて配列に入れる
  }
  get observers() {
    return this._observers; //オブザーバーする要素を参照したときに関数を呼び出す
  }

  // is-showクラスを付け外しするだけの処理
  _toggleClassIsShow(el, isShow) {
    if (isShow) {
      el.classList.add("is-show");
    } else {
      el.classList.remove("is-show");
    }
  }

  // スライダーがビューポート内のときだけ動かす
  _toggleSlideAnimation(el, isShow) {
    if (isShow) {
      this.swiperSlider.start();
    } else {
      this.swiperSlider.stop();
    }
  }

  // オブザーバー要素をすべて削除する
  _destroyObservers() {
    this.observers.forEach((ob) => {
      ob.destroy();
    });
  }
  destroy() {
    this._destroyObservers();
  }

  // スクロールオブザーバーで各要素を監視
  _scrollInit() {
    console.log(this.observers);
    this.observers = new ScrollObserver(
      [".js-test", ".js-text2"],
      this._toggleClassIsShow,
      { once: true }
    );
    this.observers = new ScrollObserver(
      ".swiper",
      this._toggleSlideAnimation.bind(this),
      { once: false }
    );
  }
}
