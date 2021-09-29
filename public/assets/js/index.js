"use strict";var _addUseragentClass=_interopRequireDefault(require("./modules/add-useragent-class")),_loading=_interopRequireDefault(require("./modules/loading")),_styleHoverChange=_interopRequireDefault(require("./modules/style-hover-change")),_scrollTop=_interopRequireDefault(require("./modules/scrollTop")),_modal=_interopRequireDefault(require("./modules/modal")),_drawer=_interopRequireDefault(require("./modules/drawer")),_shuffleLetters=require("./shuffleLetters"),_smoothParallax=_interopRequireDefault(require("./smoothParallax")),_intersectionObserver=_interopRequireDefault(require("./intersectionObserver")),_showUpEachText=require("./showUpEachText"),_shuffleText=_interopRequireDefault(require("./shuffleText")),_headerNavHighlight=_interopRequireDefault(require("./modules/header-nav-highlight"));function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _createForOfIteratorHelper(e,r){var t="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!t){if(Array.isArray(e)||(t=_unsupportedIterableToArray(e))||r&&e&&"number"==typeof e.length){t&&(e=t);var n=0,a=function(){};return{s:a,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,i=!0,u=!1;return{s:function(){t=t.call(e)},n:function(){var e=t.next();return i=e.done,e},e:function(e){u=!0,o=e},f:function(){try{i||null==t.return||t.return()}finally{if(u)throw o}}}}function _unsupportedIterableToArray(e,r){if(e){if("string"==typeof e)return _arrayLikeToArray(e,r);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?_arrayLikeToArray(e,r):void 0}}function _arrayLikeToArray(e,r){(null==r||r>e.length)&&(r=e.length);for(var t=0,n=new Array(r);t<r;t++)n[t]=e[t];return n}function _classCallCheck(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,r){for(var t=0;t<r.length;t++){var n=r[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function _createClass(e,r,t){return r&&_defineProperties(e.prototype,r),t&&_defineProperties(e,t),e}document.addEventListener("DOMContentLoaded",(function(){new Main}));var Main=function(){function e(){_classCallCheck(this,e),this._init(),this._addUserAgentClass()}return _createClass(e,[{key:"_init",value:function(){(0,_loading.default)(),(0,_styleHoverChange.default)(),(0,_headerNavHighlight.default)()}},{key:"_addUserAgentClass",value:function(){_addUseragentClass.default.init();var e,r=_createForOfIteratorHelper(document.querySelectorAll("a[href*='tel:']"));try{for(r.s();!(e=r.n()).done;){e.value.addEventListener("click",(function(e){"pc"==_addUseragentClass.default.getDevice()&&e.preventDefault()}))}}catch(e){r.e(e)}finally{r.f()}}}]),e}();