"use strict";
/*!
 * jQuery Shuffle Effect
 * version: 1.0
 *
 * Examples and documentation at: http://katoshun.com/blog/shuffle-effect.html
 */jQuery.fn.extend({shuffleEffect:function(t){null==t&&(t=50);var e=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","0","1","2","3","4","5","6","7","8","9"],l=jQuery(this),n=l.text(),r=n.length-1,a=0,f="",s=setInterval((function(){if(a<r+1){for(var t="",c=0;c<r-a;c++)t+=e[Math.floor(Math.random()*e.length)];f+=n.charAt(a),l.css({display:"block"}).text(f+t),a++}else clearInterval(s)}),t)}});