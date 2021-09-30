const spanWrapText = (target) => {
  const nodes = [...target.childNodes]; // ノードリストを配列にする
  let returnText = ''; // 最終的に返すテキスト

  for (const node of nodes) {
    if (node.nodeType == 3) {
      //テキストの場合
      const text = node.textContent.replace(/\r?\n/g, ''); //テキストから改行コード削除
      const splitText = text.split(''); // 一文字ずつ分割
      for (const char of splitText) {
        returnText += `<span>${char}</span>`; // spanタグで挟んで連結
      }
    } else {
      //テキスト以外の場合
      //<br>などテキスト以外の要素をそのまま連結
      returnText += node.outerHTML;
    }
  }
  return returnText;
};

const bubbles = [...document.querySelectorAll('.js-splitText')];
for (const bubble of bubbles) {
  bubble.innerHTML = spanWrapText(bubble);

  // spanたちを配列にし、それをプロパティとして持っておく
  bubble.spans = bubble.querySelectorAll('span');

  // scrollTriggerによって発火するTimelineを作成
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: bubble, // 吹き出しをアニメーション発火のトリガーに
      start: 'top 90%', // 吹き出しの上部（TOP）が、画面の上から90%の位置を通過したらスタート
    },
  });

  // アニメーションタイムライン。上から順に動作する
  tl.from(bubble, {
    opacity: 0,
    y: '10%',
  }).from(bubble.spans, {
    opacity: 0,
    duration: 0.01,
    stagger: 0.03,
  });
}
