// ヘッダーで現在のページのナビゲーションハイライト
"use strict";
export default () => {
  $(function () {
    $(".header-nav__item a").each(function () {
      if (this.href == location.href) {
        $(this).parents("li").addClass("is-current");
      }
    });
  });
};
