// import jQuery from 'jquery';
// const $ = jQuery;
// import { bodyScrollPrevent } from './modules/body-scroll-prevent';

// モーダル表示・非表示
export default ()=> {
  $(function () {
    'use strict';
    const modalArea = $('#js-modalArea');
    $('.js-openModal').on('click', function () {
      modalArea.fadeIn();
      // モーダル内のYouTube動画にURLを付与する
      $('#js-youtube').attr(
        'src',
        '//www.youtube.com/embed/' + $('.js-openModal').data('src') + '?rel=0'
      );
      // モーダルを開いたらbodyをスクロール不可
      // bodyScrollPrevent(true);
      // e.preventDefault();
    });
    $('#js-closeModal , #js-modalBg').on('click', function () {
      modalArea.fadeOut();
      // モーダルを閉じるタイミングでyoutubeのURLを削除（モーダルが消えても再生し続けるのを防ぐ）
      $('#js-youtube').attr('src', '');
      // modalArea.fadeOut(function () {
      //   // モーダルを閉じたらbodyのスクロール不可を解除
      //   // bodyScrollPrevent(false);
      // });
    });
    // bodyScrollPrevent();
  });
}
