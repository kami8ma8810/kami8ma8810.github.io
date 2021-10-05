export default ()=>{
  const setFillHeight100vh = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  // 画面のサイズ変動があった時に高さを再計算する
  window.addEventListener('resize', setFillHeight100vh);
}
