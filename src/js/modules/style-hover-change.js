export default () => {
  // タッチ可能デバイスか判定
  const isTouchCapable =
    "ontouchstart" in window ||
    (window.DocumentTouch && document instanceof window.DocumentTouch) ||
    navigator.maxTouchPoints > 0 ||
    window.navigator.msMaxTouchPoints > 0;

// タッチ可能デバイスの場合
  if (isTouchCapable) {
    // bodyにtouchstart属性を付与
    document.getElementsByTagName("body")[0].setAttribute("ontouchstart", "");
    // cssのhoverをactiveに変換
    try {
      for (var si in document.styleSheets) {
        var styleSheet = document.styleSheets[si];
        if (!styleSheet.rules) continue;
        for (var ri = styleSheet.rules.length - 1; ri >= 0; ri--) {
          if (!styleSheet.rules[ri].selectorText) continue;
          if (styleSheet.rules[ri].selectorText.match(":hover")) {
            //styleSheet.deleteRule(ri);
            styleSheet.rules[ri].selectorText = styleSheet.rules[
              ri
            ].selectorText.replace(":hover", ":active");
          }
        }
      }
    } catch (ex) {}
  }
};
