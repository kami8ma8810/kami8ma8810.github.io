"use strict";

/* ------------------------------------------------------------------
iOS safari 100vh崩れ調整
------------------------------------------------------------------ */

const setFillHeight = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};
let vw = window.innerWidth;
window.addEventListener("resize", () => {
  if (vw === window.innerWidth) {
    // 画面の横幅にサイズ変動がないので処理を終える
    return;
  }
  // 画面の横幅のサイズ変動があった時のみ高さを再計算する
  vw = window.innerWidth;
  setFillHeight();
});
// 初期化
setFillHeight();

// ドロワーオープン時、スクロール不可にする
function bodyScrollPrevent(flag) {
  let scrollPosition;
  const body = document.getElementsByTagName("body")[0];
  const ua = window.navigator.userAgent.toLowerCase();
  const isiOS =
    ua.indexOf("iphone") > -1 ||
    ua.indexOf("ipad") > -1 ||
    (ua.indexOf("macintosh") > -1 && "ontouchend" in document);
  const scrollBarWidth = window.innerWidth - document.body.clientWidth;
  if (flag) {
    body.style.paddingRight = scrollBarWidth + "px";
    if (isiOS) {
      scrollPosition = -window.pageYOffset;
      body.style.position = "fixed";
      body.style.width = "100%";
      body.style.top = scrollPosition + "px";
    } else {
      body.style.overflow = "hidden";
    }
  } else if (!flag) {
    body.style.paddingRight = "";
    if (isiOS) {
      scrollPosition = parseInt(body.style.top.replace(/[^0-9]/g, ""));
      body.style.position = "";
      body.style.width = "";
      body.style.top = "";
      window.scrollTo(0, scrollPosition);
    } else {
      body.style.overflow = "";
    }
  }
}

/* ------------------------------------------------------------------
ドロワー状態の切り替え処理
------------------------------------------------------------------ */

// 要素の定義
const drawer = document.getElementById("js-drawer");
const openButton = document.getElementById("js-open-drawer");
const closeButton = document.getElementById("js-close-drawer");
// const backdrop = drawer.getElementById("js-backdrop");

// ドロワーの初期状態
let isDrawerOpen = false;

// stateは真偽値
function changeAriaExpanded(state) {
  const value = state ? "true" : "false";
  drawer.setAttribute("aria-expanded", value);
  openButton.setAttribute("aria-expanded", value);
  closeButton.setAttribute("aria-expanded", value);
}

// stateは真偽値
function changeState(state) {
  if (state === isDrawerOpen) {
    console.log("エラー！2回以上連続で同じ状態に変更しようとしました");
    return;
  }
  changeAriaExpanded(state);
  isDrawerOpen = state;
}

function openDrawer() {
  changeState(true);
  // ドロワーを開いたらbodyをスクロール不可
  bodyScrollPrevent(true);
}

function closeDrawer() {
  changeState(false);
  // ドロワーを閉じたらbodyのスクロール不可を解除
  bodyScrollPrevent(false);
  //↑をコメントアウトしてGSAPに記述し、アニメーションが終わったタイミングで解除することも可能
}

function onClickOpenButton() {
  openDrawer();
}

function onClickCloseButton() {
  closeDrawer();
}
bodyScrollPrevent();

openButton.addEventListener("click", onClickOpenButton, false);
closeButton.addEventListener("click", onClickCloseButton, false);


document.addEventListener("DOMContentLoaded", () => {
  if (document.body.classList.contains("pattern1")) {
    pattern1();
  }
  if (document.body.classList.contains("pattern2")) {
    pattern2();
  }
  if (document.body.classList.contains("pattern3")) {
    pattern3();
  }
});
/* ------------------------------------------------------------------
アニメーション 01
------------------------------------------------------------------ */

// slideIn from Top
// let tl = gsap.timeline({
//   // アニメーションが終わったタイミングでscroll固定を解除する（閉じるボタンを押した直後にスクロールバーを表示させない場合↓を追加
//   // onReverseComplete: function () {
//   //   bodyScrollPrevent(false);
//   // },
// });

// 右からスライド、メニューは左からニュッ
const pattern1 = () => {
  let tl1 = gsap.timeline(
    // 必要に応じてリバース終了時にリセット
    // onReverseComplete: function () {
    //   gsap.set([drawer, ".js-nav-item a"], { xPercent:0,yPercent:0 });
    // },
  );

  openButton.addEventListener("click", () => {
    // 2回目以降も発火させる場合はreversedの条件付けをする
    if (!tl1.reversed()) {
      tl1
        .fromTo(
          drawer,
          {
            visibility: "hidden",
            xPercent: 100,
          },{
            visibility:'visible',
            xPercent: 0,
            duration:0.3
          }
        )
        .from(".js-nav-item a", {
          stagger: { amount: 0.6 },
          xPercent: -100,
          delay:-0.2
        });
    } else {
      tl1.play();
    }
  });
  closeButton.addEventListener("click", () => {
    tl1.reverse();
  });
};


/* ------------------------------------------------------------------
アニメーション 02
------------------------------------------------------------------ */
// 上からスライド、メニューは下からニュッ
const pattern2 = () => {
  let tl2 = gsap.timeline({
    onReverseComplete: function () {
      gsap.set([drawer, ".js-nav-item a"], { xPercent: 0, yPercent: 0 });
    },
    onStart: function () {
      gsap.set(drawer, { xPercent: 0, yPercent: -100, visibility: "hidden" });
      gsap.set(".js-nav-item a", { xPercent: 0, yPercent: 100 });
    },
  });
  openButton.addEventListener("click", () => {
    console.log("パターン２実行！");

    if (!tl2.reversed()) {
      tl2
        .to(drawer, {
          visibility: "visible",
          xPercent: 0,
          yPercent: 0,
          ease: Power2.easeInOut,
        })
        .to(".js-nav-item a", {
          stagger: { amount: 0.6 },
          xPercent: 0,
          yPercent: 0,
        });
    } else {
      tl2.play();
    }
  });
  closeButton.addEventListener("click", () => {
    tl2.reverse();
  });
};

// フェードイン、メニューも順番にフェードイン
const pattern3 = () => {
  let tl3 = gsap.timeline({
    onReverseComplete: function () {
      gsap.set([drawer, ".js-nav-item a"], { clearProps: "all" });
    },
    onStart: function () {
      gsap.set(drawer, { xPercent: 100, visibility: "hidden" });
      gsap.set(".js-nav-item a", { xPercent: -100, visibility: "hidden" });
    },
  });
  openButton.addEventListener("click", () => {
    if (!tl3.reversed()) {
      tl3
        .to(drawer, {
          visibility: "visible",
          xPercent: 0,
          ease: Power2.easeInOut,
        })
        .to(".js-nav-item a", {
          stagger: { amount: 0.6 },
          xPercent: 0,
        });
    } else {
      tl3.play();
    }
  });
  closeButton.addEventListener("click", () => {
    tl3.reverse();
  });
};
