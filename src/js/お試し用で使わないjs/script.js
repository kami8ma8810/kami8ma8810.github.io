'use strict';
{
  /*
	PCで見るときに行う処理
	-----------------------------------------------------------------
	 */
  (function () {
    if (navigator.userAgent.match(/(iPhone|iPad|iPod|Android)/i)) {
      return false;
    } else {
      /* 右クリック禁止 */
      document.addEventListener('contextmenu', (e) => e.preventDefault());
    }
  })();

  /*
	トップへ戻るアンカーボタン
	-----------------------------------------------------------------
	*/
  $(function () {
    $('a[href^="#"]').click(function () {
      var headerHeight = $('header').height();
      var speed = 800;
      var href = $(this).attr('href');
      var target = $(href == '#' || href == '' ? 'html' : href);
      var position = target.offset().top - headerHeight - 70;
      $('html, body').animate(
        {
          scrollTop: position,
        },
        speed,
        'swing'
      );
      return false;
    });
    /*
		ヘッダー スクロール開始でサイズ変化
		-----------------------------------------------------------------
		*/
    $(function () {
      // var hd_size = $('#js-headerChange').innerHeight(); //ヘッダーの高さを取得
      var pos = 0;
      $(window).on('scroll', function () {
        var current_pos = $(this).scrollTop(); //現在の位置を取得
        if (current_pos < pos || current_pos == 0) {
          //上にスクロール もしくは 最上部
          $('#js-headerChange').removeClass('is-change'); //ヘッダーを表示
        } else {
          $('#js-headerChange').addClass('is-change'); //ヘッダーを非表示(下にスクロール)
        }
        pos = current_pos;
      });
    });
    /*
    詳細記事内モーダル
		 */
    $(function () {
      $('.js-openImgModal').on('click', function () {
        var openTarget = $(this).next();
        $(openTarget).fadeIn();
        // bodyScroll(true);
      });
      $('.js-closeImgModal').on('click', function () {
        $('.js-modalContent').fadeOut(function () {
          // bodyScroll(false);
        });
      });
    });
    /*
		詳細記事内 ギャラリー
		 */
    $(function () {
      $('.gallery-container').magnificPopup({
        delegate: 'a',
        type: 'image',
        gallery: {
          //ギャラリー表示にする
          enabled: true,
        },
      });
    });
  });

  var memoriesSlider = new Swiper('.js-memoriesSlider', {
    loop: true,
    loopedSlides: 5,
    loopAdditionalSlides: 7, //スライダーを複製してループを滑らかにする
    speed: 1000,
    slidesPerView: 1.69,
    spaceBetween: 10,
    centeredSlides: true,
    simulateTouch: false,
    // allowTouchMove: false,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      992: {
        slidesPerView: 3.42, //1366pxマックスの幅380px調整
      },
      // 1367: {
      //   slidesPerView: 5, //1366pxマックスの幅380px調整
      // },
    },
  });
  var movieSlider = new Swiper('.js-movieSlider', {
    loop: true,
    loopedSlides: 3,
    loopAdditionalSlides: 5,
    speed: 1000,
    slidesPerView: 1.137,
    spaceBetween: 80,
    centeredSlides: true,
    simulateTouch: false,
    // allowTouchMove: false,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      992: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
    },
  });
  var reportSlider = new Swiper('.js-reportSlider', {
    loop: true,
    loopedSlides: 8,
    loopAdditionalSlides: 10,
    speed: 1000,
    slidesPerView: 1.75,
    spaceBetween: 20,
    centeredSlides: true,
    simulateTouch: false,
    // allowTouchMove: false,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      992: {
        slidesPerView: 3.465, //1366pxマックスの幅380px調整
      },
    },
  });
  var podcastSlider = new Swiper('.js-podcastSlider', {
    loop: true,
    loopedSlides: 3,
    loopAdditionalSlides: 5,
    speed: 1000,
    slidesPerView: 1.13,
    spaceBetween: 80,
    centeredSlides: true,
    simulateTouch: false,
    // allowTouchMove: false,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  /*
	INFORMATIONページ タブ切り替え
	-----------------------------------------------------------------
	 */
  (function () {
    document.addEventListener('DOMContentLoaded', () => {
      const tabTriggers = document.querySelectorAll('.js-tabTrigger');
      const tabTargets = document.querySelectorAll('.js-tabTarget');

      for (let i = 0; i < tabTriggers.length; i++) {
        tabTriggers[i].addEventListener('click', (e) => {
          let currentMenu = e.currentTarget;
          let currentContent = document.getElementById(currentMenu.dataset.id);

          for (let i = 0; i < tabTriggers.length; i++) {
            tabTriggers[i].classList.remove('is-active');
          }
          currentMenu.classList.add('is-active');

          for (let i = 0; i < tabTargets.length; i++) {
            tabTargets[i].classList.remove('is-active');
          }
          if (currentContent !== null) {
            currentContent.classList.add('is-active');
          }
        });
      }
    });
  })();

}
