!function(){"use strict";var e,t={249:function(e,t,o){var n=o(564),r=o.n(n),i=o(69),a=o.n(i),s=o(40),c=o.n(s),l=o(358),d=o(82),u=()=>{console.log("RUN__drawer.js");const e=document.getElementById("js-drawer"),t=document.getElementById("js-drawerNav"),o=document.getElementById("js-openDrawer"),n=document.getElementById("js-closeDrawer"),r=document.querySelectorAll(".js-drawerItem"),i=document.querySelector(".c-hamburger"),a=document.querySelector(".c-hamburger__inner");let s=!1;function c(t){t!==s?(!function(t){const r=t?"true":"false";e.setAttribute("aria-expanded",r),o.setAttribute("aria-expanded",r),n.setAttribute("aria-expanded",r)}(t),s=t):console.log("2回以上連続で同じ状態に変更しようとしました")}l.p8.config({nullTargetWarn:!1,trialWarn:!1}),o.addEventListener("click",(function(){!function(){l.p8.set(".js-drawerItem a",{yPercent:101}),l.p8.set(".l-drawer__close",{opacity:0});const o=document.querySelector(".l-drawer__inner");let n=window.getComputedStyle(o,null).getPropertyValue("background-color");l.p8.timeline({onComplete:()=>{c(!0),t.setAttribute("aria-hidden",!1)}}).to(i,{keyframes:[{scale:.8,duration:.1},{scale:1,duration:.1}]}).to(a,{opacity:0,duration:.2}).to(i,{backgroundColor:n,duration:.2},"<").to(i,{scale:50,ease:"circ.inOut",duration:.4}).to(e,{visibility:"visible",opacity:1,duration:.01}).to(r,{yPercent:0,stagger:{amount:.3}}).to(".l-drawer__close",{opacity:1},"-=.1")}()}),!1),n.addEventListener("click",(function(){l.p8.timeline({defaults:{ease:"circ.inOut"},onComplete:()=>{c(!1),t.setAttribute("aria-hidden",!0)}}).to(n,{keyframes:[{scale:.5,duration:.1},{scale:1,duration:.1}]}).to(e,{keyframes:[{opacity:0,duration:.2},{visibility:"hidden",duration:.01}]}).to(i,{scale:1,duration:.6}).to(i,{backgroundColor:"transparent",duration:.2}).to(a,{opacity:1,duration:.2},"<")}),!1)},m=()=>{console.log("RUN__highlight-nav.js");let e=location.href;const t=document.querySelectorAll(".js-highlightLink");for(let o=0;o<t.length;o++){e===t[o].href&&(t[o].classList.add("is-current"),t[o].removeAttribute("href"))}},p=()=>{const e=()=>{const e=.01*window.innerHeight;document.documentElement.style.setProperty("--vh","".concat(e,"px"))};window.addEventListener("resize",e),e()};class f{constructor(e){this.target=e,this.nodes=this.target.childNodes,this.convert()}convert(){this.target.style.opacity=1,console.log("RUN__split-title.js");let e="";this.nodes.forEach((t=>{if(3==t.nodeType){const o=t.textContent.replace(/\r?\n/g,"");e+=o.split("").reduce(((e,t)=>(t=t.replace(" ","&nbsp;"),e+"<span>".concat(t,"</span>"))),"")}else e+=t.outerHTML})),this.target.innerHTML=e}}var g=()=>{console.log("RUN__sliedr.js");new Swiper(".swiper",{direction:"horizontal",loop:!0,slidesPerView:1.1,centeredSlides:!0,spaceBetween:20,breakpoints:{960:{direction:"horizontal",loop:!0,slidesPerView:2.5,centeredSlides:!0,spaceBetween:80,speed:500}},pagination:{el:".swiper-pagination"},on:{transitionStart(e){const{slides:t,previousIndex:o,activeIndex:n,$el:r}=e,i=t.eq(n),a=t.eq(o),s=i.attr("data-slide-bg-color");r.css("background",s),a.find(".p-works-slide__inner").transition(200).css("opacity",0),i.find(".p-works-slide__inner").transition(200).css("opacity",0)},slideNextTransitionStart(e){const{slides:t,previousIndex:o,activeIndex:n}=e,r=t.eq(n).find(".p-works-slide__imgContainer"),i=t.eq(o).find(".p-works-slide__imgContainer");r.transition(200).transform("skewX(-10deg)"),i.transition(200).transform("skewX(-10deg)"),i.transitionEnd((()=>{r.transition(200).transform("skewX(0)"),i.transition(200).transform("skewX(0)")}))},slidePrevTransitionStart(e){const{slides:t,previousIndex:o,activeIndex:n}=e,r=t.eq(n).find(".p-works-slide__imgContainer"),i=t.eq(o).find(".p-works-slide__imgContainer");r.transition(200).transform("skewX(10deg)"),i.transition(200).transform("skewX(10deg)"),i.transitionEnd((()=>{r.transition(200).transform("skewX(0)"),i.transition(200).transform("skewX(0)")}))},transitionEnd(e){const{slides:t,activeIndex:o}=e;t.eq(o).find(".p-works-slide__inner").transition(200).css("opacity",1)},init(e){const{slides:t,previousIndex:o,activeIndex:n,$el:r}=e,i=t.eq(n),a=i.find(".p-works-slide__imgContainer"),s=t.eq(n).attr("data-slide-bg-color");i.find(".p-works-slide__inner").css("opacity",1),a.transform("skewX(0)"),r.css("background-color",s),e.emit("transitionEnd"),(e=>{e.$el.find(".p-works-slider__button--next").on("click",(()=>{e.slideNext()})),e.$el.find(".p-works-slider__button--prev").on("click",(()=>{e.slidePrev()}))})(e)}}})},y=()=>{console.log("RUN__switch-dark-mode");const e=document.getElementById("myonoffswitch");function t(){document.documentElement.classList.add("is-darkmode"),e.checked=!0,sessionStorage.setItem("darkMode","on")}function o(){document.documentElement.classList.remove("is-darkmode"),e.checked=!1,sessionStorage.setItem("darkMode","off")}e.addEventListener("change",(()=>{e.checked?t():o()}));"on"===sessionStorage.getItem("darkMode")?t():"off"===sessionStorage.getItem("darkMode")&&o()};const h=o(238);var w=new class{constructor(){this.uaParser=h(),this.body=document.querySelector("body")}init(){this.setUA(),console.log("RUN__ua-parser.js")}getBrowser(){return this.uaParser.browser.name.replace(/\s+/g,"").toLowerCase()}getDevice(){const e=this.uaParser.device.type;let t="";return t="mobile"==e?"sp":"tablet"==e?"tb":"pc",t}getModel(){return this.uaParser.device.model?this.uaParser.device.model.replace(/\s+/g,"").toLowerCase():""}getOS(){return this.uaParser.os.name.replace(/\s+/g,"").toLowerCase()}setUA(){this.body.classList.add("ua-".concat(this.getBrowser())),this.body.classList.add("ua-".concat(this.getDevice())),this.getModel()&&this.body.classList.add("ua-".concat(this.getModel())),this.body.classList.add("ua-".concat(this.getOS()))}};l.p8.registerPlugin(d.i);var v=()=>{l.p8.utils.toArray(".js-moveCircle").forEach((e=>{const t=()=>{let o=l.p8.utils.random(5,10);l.p8.timeline({onComplete:t}).to(e,{xPercent:"random(-50, 50)",yPercent:"random(-50, 50)",scale:"random(0.8, 1.2)",duration:o,ease:"sine.inOut",transformOrigin:"50% 50%",repeat:1,yoyo:!0})};d.i.matchMedia({"(max-width: 959px)":function(){l.p8.config({force3D:"auto"}),l.p8.timeline({onComplete:()=>{t()}}).fromTo(e,{scale:0},{scale:1,duration:1.2,delay:.6,ease:"power3.out"})},"(min-width: 960px)":function(){l.p8.config({force3D:!0}),l.p8.timeline({onComplete:()=>{t()}}).fromTo(e,{scale:0},{scale:1,duration:1.2,delay:.6,ease:"power3.inOut"})}})}))},k=()=>{const e=document.querySelectorAll(".js-showIn");const t=new IntersectionObserver((function(e,t){e.forEach((e=>{e.isIntersecting&&(e.target.classList.add("is-show"),t.unobserve(e.target))}))}),{root:null,rootMargin:"-10% 0%",once:!0});e.forEach((e=>{t.observe(e)}))};l.p8.registerPlugin(d.i);var b=()=>{const e=document.querySelector(".js-parallaMouse");d.i.matchMedia({"(min-width: 960px)":function(){l.p8.config({force3D:!0}),document.addEventListener("mousemove",(t=>{let o=window.innerWidth-2*t.clientX,n=window.innerHeight-2*t.clientY;l.p8.to(e,{transformOrigin:"center center 50%",rotateX:n/30,rotateY:-o/24,boxShadow:"".concat(n," ").concat(o," 4px rgba(0, 0, 0, 1)")})}))}})};l.ZP.registerPlugin(d.i);class _{constructor(){this._init()}_init(){function e(e){return e=e||2e3,new Promise((t=>{setTimeout((()=>{t()}),e)}))}console.log("RUN__barba-transition.js"),a().use(c()),a().hooks.beforeLeave((e=>{console.log("●●●●● hooks beforeLeave ●●●●●"),document.body.style.overflow="hidden",function(e){if(null!==e.current.container.querySelector(".js-moveCircle")){const t=e.current.container.querySelectorAll(".js-moveCircle");l.ZP.to(t,{opacity:0,duration:.01})}}(e)})),a().hooks.leave((e=>{console.log("●●●●● hooks leave ●●●●●")})),a().hooks.beforeEnter((e=>{console.log("●●●●● hooks beforeEnter ●●●●●")})),a().hooks.enter((e=>{console.log("●●●●● hooks enter ●●●●●")})),a().hooks.after((e=>{console.log("●●●●● hooks after ●●●●●"),document.body.style.overflow="auto",y(),p(),u(),m(),null!==e.next.container.querySelector(".js-splitTitle")&&e.next.container.querySelectorAll(".js-splitTitle").forEach((e=>{new f(e)})),null!==e.next.container.querySelector(".js-showIn")&&k(),null!==e.next.container.querySelector(".swiper")&&g(),null!==e.next.container.querySelector(".js-moveCircle")&&v(),null!==e.next.container.querySelector(".js-parallaMouse")&&b()})),a().init({sync:!0,views:[{}],transitions:[{name:"common-transition",once(e){console.log("●●●●● once ●●●●●"),w.init(),y(),p(),u(),m(),null!==document.querySelector(".js-splitTitle")&&document.querySelectorAll(".js-splitTitle").forEach((e=>{new f(e)})),null!==document.querySelector(".js-showIn")&&k(),null!==document.querySelector(".swiper")&&g(),null!==document.querySelector(".js-moveCircle")&&v(),null!==document.querySelector(".js-parallaMouse")&&b()},async leave(t){console.log("●●●●● leave ●●●●●");const o=this.async();!function(e){console.log("leave animation!");const t=e.current.container.querySelector(".l-main"),o=e.current.container.querySelector(".l-main__inner"),n=e.next.container.querySelector(".l-main"),r=e.current.container.querySelector(".l-main__inner"),i=e.current.container.querySelector(".l-drawer"),a=e.current.container.querySelector(".c-hamburger"),s=l.ZP.timeline();d.i.matchMedia({"(max-width: 959px)":function(){s.to(i,{opacity:0,duration:.2,delay:.2}).to([o,r],{opacity:0,duration:.3},"<").to([t,n],{opacity:0,duration:.3},"<").to(a,{scale:1,duration:.4})},"(min-width: 960px)":function(){l.ZP.config({force3D:!0}),s.to([o,r],{opacity:0,duration:.2}).to([t,n],{transformOrigin:"bottom",scaleY:0,duration:.3})}})}(t),await e(500),o()},beforeEnter(e){let{next:t}=e;console.log("●●●●● beforeEnter ●●●●●"),function(e){console.log("◆◆◆◆◆ replace head tags ◆◆◆◆◆");const t=document.head,o=e.html.match(/<head[^>]*>([\s\S.]*)<\/head>/i)[0],n=document.createElement("head");n.innerHTML=o;const r=["meta[name='keywords']","meta[name='description']","meta[name='robots']","meta[property^='og']","meta[name^='twitter']","link[rel='prev']","link[rel='next']","script[src^='']","link[rel='canonical']"].join(",");[...t.querySelectorAll(r)].forEach((e=>{t.removeChild(e)})),[...n.querySelectorAll(r)].forEach((e=>{t.appendChild(e)}))}(t)},async enter(t){await e(500),console.log("●●●●● enter ●●●●●"),function(e){console.log("enter animation!");const t=e.next.container.querySelector(".l-main"),o=e.next.container.querySelector(".l-main__inner"),n=l.ZP.timeline();d.i.matchMedia({"(max-width: 959px)":function(){l.ZP.config({force3D:"auto"}),n.to(t,{opacity:1,duration:.2}).from(o,{opacity:0,duration:.3})},"(min-width: 960px)":function(){l.ZP.config({force3D:!0}),n.to(t,{transformOrigin:"top",scaleY:1,duration:.4}).from(o,{opacity:0,duration:.2})}})}(t)}}]})}}l.p8.registerPlugin(d.i);var S=()=>{const e=document.querySelector(".js-loading"),t=document.querySelector(".js-loadingText"),o=document.querySelector(".js-loadingLogo"),n=document.querySelectorAll(".js-loadingFace"),r=l.p8.utils.toArray(n),i=r[0],a=r[1],s=r[2];l.p8.timeline({onComplete:()=>{e.classList.add("is-done"),l.p8.to(e,{autoAlpha:0,display:"none",delay:1.2})}}).to(t,{autoAlpha:0,duration:.4,delay:2}).to(i,{keyframes:[{scale:3,rotate:550,duration:.8,backgroundColor:"rgb(240,0,0)"},{rotate:910,borderRadius:"50%",scale:1,duration:1.2,yPercent:-25,ease:"back.out(1.2)"}]}).to(a,{keyframes:[{scale:3,rotate:550,duration:.8,backgroundColor:"rgb(0,240,0)"},{rotate:910,borderRadius:"50%",scale:1,duration:1.2,xPercent:-25,yPercent:25,ease:"back.out(1.2)"}]},"<.6").to(s,{keyframes:[{scale:3,rotate:550,duration:.8,backgroundColor:"rgb(0,0,240)"},{rotate:910,borderRadius:"50%",scale:1,duration:1.2,xPercent:25,yPercent:25,ease:"back.out(1.2)"}]},"<.4").to(n,{xPercent:0,yPercent:0,duration:.6,opacity:0,scale:0,ease:"back.inOut(1.5)"}).to(o,{duration:.6,opacity:1,scale:1,ease:"back.out(1.5)"},"<.4"),"pc"===w.getDevice()&&l.p8.config({force3D:!0})};document.addEventListener("DOMContentLoaded",(function(){console.log("---------------------\nDOMContentLoaded\n---------------------");const e=document.querySelector(".l-wrapper");r()(e,{background:!0}).on("always",(()=>{console.log("---------------------\nDONE__imagesLoaded\n---------------------"),null!==document.querySelector(".js-loading")&&S();new _}))}))}},o={};function n(e){var r=o[e];if(void 0!==r)return r.exports;var i=o[e]={exports:{}};return t[e].call(i.exports,i,i.exports,n),i.exports}n.m=t,n.amdO={},e=[],n.O=function(t,o,r,i){if(!o){var a=1/0;for(d=0;d<e.length;d++){o=e[d][0],r=e[d][1],i=e[d][2];for(var s=!0,c=0;c<o.length;c++)(!1&i||a>=i)&&Object.keys(n.O).every((function(e){return n.O[e](o[c])}))?o.splice(c--,1):(s=!1,i<a&&(a=i));if(s){e.splice(d--,1);var l=r();void 0!==l&&(t=l)}}return t}i=i||0;for(var d=e.length;d>0&&e[d-1][2]>i;d--)e[d]=e[d-1];e[d]=[o,r,i]},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,{a:t}),t},n.d=function(e,t){for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e={826:0};n.O.j=function(t){return 0===e[t]};var t=function(t,o){var r,i,a=o[0],s=o[1],c=o[2],l=0;if(a.some((function(t){return 0!==e[t]}))){for(r in s)n.o(s,r)&&(n.m[r]=s[r]);if(c)var d=c(n)}for(t&&t(o);l<a.length;l++)i=a[l],n.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return n.O(d)},o=self.webpackChunkportfolio2022=self.webpackChunkportfolio2022||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))}();var r=n.O(void 0,[216],(function(){return n(249)}));r=n.O(r)}();