import ua from "./modules/add-useragent-class";
import loading from "./modules/loading";
import styleHoverChange from "./modules/style-hover-change";
import scrollTop from "./modules/scrollTop";
import toggleModal from "./modules/modal";
import toggleDrawer from "./modules/drawer";
import { shuffleLettersAnime } from "./shuffleLetters";
import smoothParallax from "./smoothParallax";
import IntersectionObserver from "./intersectionObserver";
import { showUpEachText, showUpEachTextBr } from "./showUpEachText";
import shuffleText from "./shuffleText";
import headerNavHighlight from "./modules/header-nav-highlight";

document.addEventListener("DOMContentLoaded", function () {
  const main = new Main();
});

class Main {
  constructor() {
    this._init();
    this._addUserAgentClass();
  }
  _init() {
    // ローディング終了＆loadイベント処理
    loading();
    // タッチ可能デバイスの場合hoverをactiveに変換
    styleHoverChange();
    // ヘッダーナビ現在のページハイライト
    headerNavHighlight();
    // ドロワー開閉
    toggleDrawer();
    // モーダル開閉
    toggleModal();
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
}
