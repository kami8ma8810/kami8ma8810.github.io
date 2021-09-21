"use strict";function _typeof(t){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}!function(){if("object"===("undefined"==typeof window?"undefined":_typeof(window)))if("IntersectionObserver"in window&&"IntersectionObserverEntry"in window&&"intersectionRatio"in window.IntersectionObserverEntry.prototype)"isIntersecting"in window.IntersectionObserverEntry.prototype||Object.defineProperty(window.IntersectionObserverEntry.prototype,"isIntersecting",{get:function(){return 0<this.intersectionRatio}});else{var y=function(t){for(var e=window.document,o=h(e);o;)o=h(e=o.ownerDocument);return e}(),o=[],w=null,I=null;t.prototype.THROTTLE_TIMEOUT=100,t.prototype.POLL_INTERVAL=null,t.prototype.USE_MUTATION_OBSERVER=!0,t._setupCrossOriginUpdater=function(){return w||(w=function(t,e){I=t&&e?T(t,e):{top:0,bottom:0,left:0,right:0,width:0,height:0},o.forEach(function(t){t._checkForIntersections()})}),w},t._resetCrossOriginUpdater=function(){I=w=null},t.prototype.observe=function(e){if(!this._observationTargets.some(function(t){return t.element==e})){if(!e||1!=e.nodeType)throw new Error("target must be an Element");this._registerInstance(),this._observationTargets.push({element:e,entry:null}),this._monitorIntersections(e.ownerDocument),this._checkForIntersections()}},t.prototype.unobserve=function(e){this._observationTargets=this._observationTargets.filter(function(t){return t.element!=e}),this._unmonitorIntersections(e.ownerDocument),0==this._observationTargets.length&&this._unregisterInstance()},t.prototype.disconnect=function(){this._observationTargets=[],this._unmonitorAllIntersections(),this._unregisterInstance()},t.prototype.takeRecords=function(){var t=this._queuedEntries.slice();return this._queuedEntries=[],t},t.prototype._initThresholds=function(t){var e=t||[0];return Array.isArray(e)||(e=[e]),e.sort().filter(function(t,e,o){if("number"!=typeof t||isNaN(t)||t<0||1<t)throw new Error("threshold must be a number between 0 and 1 inclusively");return t!==o[e-1]})},t.prototype._parseRootMargin=function(t){var e=(t||"0px").split(/\s+/).map(function(t){var e=/^(-?\d*\.?\d+)(px|%)$/.exec(t);if(!e)throw new Error("rootMargin must be specified in pixels or percent");return{value:parseFloat(e[1]),unit:e[2]}});return e[1]=e[1]||e[0],e[2]=e[2]||e[0],e[3]=e[3]||e[1],e},t.prototype._monitorIntersections=function(e){var t=e.defaultView;if(t&&-1==this._monitoringDocuments.indexOf(e)){var o=this._checkForIntersections,n=null,i=null;this.POLL_INTERVAL?n=t.setInterval(o,this.POLL_INTERVAL):(c(t,"resize",o,!0),c(e,"scroll",o,!0),this.USE_MUTATION_OBSERVER&&"MutationObserver"in t&&(i=new t.MutationObserver(o)).observe(e,{attributes:!0,childList:!0,characterData:!0,subtree:!0})),this._monitoringDocuments.push(e),this._monitoringUnsubscribes.push(function(){var t=e.defaultView;t&&(n&&t.clearInterval(n),u(t,"resize",o,!0)),u(e,"scroll",o,!0),i&&i.disconnect()});var r=this.root&&(this.root.ownerDocument||this.root)||y;if(e!=r){var s=h(e);s&&this._monitorIntersections(s.ownerDocument)}}},t.prototype._unmonitorIntersections=function(n){var t=this._monitoringDocuments.indexOf(n);if(-1!=t){var i=this.root&&(this.root.ownerDocument||this.root)||y;if(!this._observationTargets.some(function(t){var e=t.element.ownerDocument;if(e==n)return!0;for(;e&&e!=i;){var o=h(e);if((e=o&&o.ownerDocument)==n)return!0}return!1})){var e=this._monitoringUnsubscribes[t];if(this._monitoringDocuments.splice(t,1),this._monitoringUnsubscribes.splice(t,1),e(),n!=i){var o=h(n);o&&this._unmonitorIntersections(o.ownerDocument)}}}},t.prototype._unmonitorAllIntersections=function(){var t=this._monitoringUnsubscribes.slice(0);this._monitoringDocuments.length=0;for(var e=this._monitoringUnsubscribes.length=0;e<t.length;e++)t[e]()},t.prototype._checkForIntersections=function(){if(this.root||!w||I){var c=this._rootIsInDom(),u=c?this._getRootRect():{top:0,bottom:0,left:0,right:0,width:0,height:0};this._observationTargets.forEach(function(t){var e=t.element,o=E(e),n=this._rootContainsTarget(e),i=t.entry,r=c&&n&&this._computeTargetAndRootIntersection(e,o,u),s=null;this._rootContainsTarget(e)?w&&!this.root||(s=u):s={top:0,bottom:0,left:0,right:0,width:0,height:0};var h=t.entry=new a({time:window.performance&&performance.now&&performance.now(),target:e,boundingClientRect:o,rootBounds:s,intersectionRect:r});i?c&&n?this._hasCrossedThreshold(i,h)&&this._queuedEntries.push(h):i&&i.isIntersecting&&this._queuedEntries.push(h):this._queuedEntries.push(h)},this),this._queuedEntries.length&&this._callback(this.takeRecords(),this)}},t.prototype._computeTargetAndRootIntersection=function(t,e,o){if("none"!=window.getComputedStyle(t).display){for(var n,i,r,s,h,c,u,a,l=e,f=R(t),p=!1;!p&&f;){var d=null,g=1==f.nodeType?window.getComputedStyle(f):{};if("none"==g.display)return null;if(f==this.root||9==f.nodeType)if(p=!0,f==this.root||f==y)w&&!this.root?!I||0==I.width&&0==I.height?l=d=f=null:d=I:d=o;else{var m=R(f),_=m&&E(m),b=m&&this._computeTargetAndRootIntersection(m,_,o);_&&b?(f=m,d=T(_,b)):l=f=null}else{var v=f.ownerDocument;f!=v.body&&f!=v.documentElement&&"visible"!=g.overflow&&(d=E(f))}if(d&&(n=d,i=l,void 0,r=Math.max(n.top,i.top),s=Math.min(n.bottom,i.bottom),h=Math.max(n.left,i.left),c=Math.min(n.right,i.right),a=s-r,l=0<=(u=c-h)&&0<=a&&{top:r,bottom:s,left:h,right:c,width:u,height:a}||null),!l)break;f=f&&R(f)}return l}},t.prototype._getRootRect=function(){var t;if(this.root&&!i(this.root))t=E(this.root);else{var e=i(this.root)?this.root:y,o=e.documentElement,n=e.body;t={top:0,left:0,right:o.clientWidth||n.clientWidth,width:o.clientWidth||n.clientWidth,bottom:o.clientHeight||n.clientHeight,height:o.clientHeight||n.clientHeight}}return this._expandRectByRootMargin(t)},t.prototype._expandRectByRootMargin=function(o){var t=this._rootMarginValues.map(function(t,e){return"px"==t.unit?t.value:t.value*(e%2?o.width:o.height)/100}),e={top:o.top-t[0],right:o.right+t[1],bottom:o.bottom+t[2],left:o.left-t[3]};return e.width=e.right-e.left,e.height=e.bottom-e.top,e},t.prototype._hasCrossedThreshold=function(t,e){var o=t&&t.isIntersecting?t.intersectionRatio||0:-1,n=e.isIntersecting?e.intersectionRatio||0:-1;if(o!==n)for(var i=0;i<this.thresholds.length;i++){var r=this.thresholds[i];if(r==o||r==n||r<o!=r<n)return!0}},t.prototype._rootIsInDom=function(){return!this.root||n(y,this.root)},t.prototype._rootContainsTarget=function(t){var e=this.root&&(this.root.ownerDocument||this.root)||y;return n(e,t)&&(!this.root||e==t.ownerDocument)},t.prototype._registerInstance=function(){o.indexOf(this)<0&&o.push(this)},t.prototype._unregisterInstance=function(){var t=o.indexOf(this);-1!=t&&o.splice(t,1)},window.IntersectionObserver=t,window.IntersectionObserverEntry=a}function h(t){try{return t.defaultView&&t.defaultView.frameElement||null}catch(t){return null}}function a(t){this.time=t.time,this.target=t.target,this.rootBounds=r(t.rootBounds),this.boundingClientRect=r(t.boundingClientRect),this.intersectionRect=r(t.intersectionRect||{top:0,bottom:0,left:0,right:0,width:0,height:0}),this.isIntersecting=!!t.intersectionRect;var e=this.boundingClientRect,o=e.width*e.height,n=this.intersectionRect,i=n.width*n.height;this.intersectionRatio=o?Number((i/o).toFixed(4)):this.isIntersecting?1:0}function t(t,e){var o,n,i,r=e||{};if("function"!=typeof t)throw new Error("callback must be a function");if(r.root&&1!=r.root.nodeType&&9!=r.root.nodeType)throw new Error("root must be a Document or Element");this._checkForIntersections=(o=this._checkForIntersections.bind(this),n=this.THROTTLE_TIMEOUT,i=null,function(){i||(i=setTimeout(function(){o(),i=null},n))}),this._callback=t,this._observationTargets=[],this._queuedEntries=[],this._rootMarginValues=this._parseRootMargin(r.rootMargin),this.thresholds=this._initThresholds(r.threshold),this.root=r.root||null,this.rootMargin=this._rootMarginValues.map(function(t){return t.value+t.unit}).join(" "),this._monitoringDocuments=[],this._monitoringUnsubscribes=[]}function c(t,e,o,n){"function"==typeof t.addEventListener?t.addEventListener(e,o,n||!1):"function"==typeof t.attachEvent&&t.attachEvent("on"+e,o)}function u(t,e,o,n){"function"==typeof t.removeEventListener?t.removeEventListener(e,o,n||!1):"function"==typeof t.detatchEvent&&t.detatchEvent("on"+e,o)}function E(t){var e;try{e=t.getBoundingClientRect()}catch(t){}return e?(e.width&&e.height||(e={top:e.top,right:e.right,bottom:e.bottom,left:e.left,width:e.right-e.left,height:e.bottom-e.top}),e):{top:0,bottom:0,left:0,right:0,width:0,height:0}}function r(t){return!t||"x"in t?t:{top:t.top,y:t.top,bottom:t.bottom,left:t.left,x:t.left,right:t.right,width:t.width,height:t.height}}function T(t,e){var o=e.top-t.top,n=e.left-t.left;return{top:o,left:n,height:e.height,width:e.width,bottom:o+e.height,right:n+e.width}}function n(t,e){for(var o=e;o;){if(o==t)return!0;o=R(o)}return!1}function R(t){var e=t.parentNode;return 9==t.nodeType&&t!=y?h(t):(e&&e.assignedSlot&&(e=e.assignedSlot.parentNode),e&&11==e.nodeType&&e.host?e.host:e)}function i(t){return t&&9===t.nodeType}}();