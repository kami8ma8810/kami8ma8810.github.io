"use strict";function bodyScrollPrevent(e){var t,o=document.getElementsByTagName("body")[0],n=window.navigator.userAgent.toLowerCase(),i=n.indexOf("iphone")>-1||n.indexOf("ipad")>-1||n.indexOf("macintosh")>-1&&"ontouchend"in document,d=window.innerWidth-document.body.clientWidth;e?(o.style.paddingRight=d+"px",i?(t=-window.pageYOffset,o.style.position="fixed",o.style.width="100%",o.style.top=t+"px"):o.style.overflow="hidden"):e||(o.style.paddingRight="",i?(t=parseInt(o.style.top.replace(/[^0-9]/g,"")),o.style.position="",o.style.width="",o.style.top="",window.scrollTo(0,t)):o.style.overflow="")}Object.defineProperty(exports,"__esModule",{value:!0}),exports.bodyScrollPrevent=bodyScrollPrevent;