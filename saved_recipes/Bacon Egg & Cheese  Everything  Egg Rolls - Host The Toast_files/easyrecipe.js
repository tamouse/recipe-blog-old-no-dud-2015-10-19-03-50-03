/*! EasyRecipe Plus 3.2.2925 Copyright (c) 2014 BoxHill LLC */
window.EASYRECIPE=window.EASYRECIPE||{},EASYRECIPE.widget=EASYRECIPE.widget||jQuery.widget,EASYRECIPE.jqButton=EASYRECIPE.jqButton||jQuery.fn.button,function(t){function e(t){var e=Math.floor(5*(t.clientX-a)/95+1);e=e>5?5:e,e!==E&&(E=e,r.width(20*e+"%"))}function n(){E=u.val(),r.width(20*E+"%")}function i(){u.val(E)}function o(t){var e,n;return t.stopImmediatePropagation(),e="http://www.bigoven.com",n=document.createElement("script"),n.type="text/javascript",n.src=e+"/assets/noexpire/js/getrecipe.js?"+(new Date).getTime()/1e5,document.getElementsByTagName("head")[0].appendChild(n),!1}var a,r,u,E=0;t(function(){var E,c,s,p,d,l=null,w=null,R=EASYRECIPE;jQuery.widget!==R.widget&&(l=jQuery.widget,jQuery.widget=R.widget),t.fn.button!==R.jqButton&&(w=t.fn.button,t.fn.button=R.jqButton);try{t(".easyrecipe .ERSPrintBtn").button({icons:{primary:"ERSPrintIcon"}}),t(".easyrecipe .ERSSaveBtn").button({icons:{primary:"ERSSaveIcon"}})}catch(f){}p=t(".ERComment"),p.length>0&&(E=p.parents("form"),c=E.find(":submit"),s=c.parent(),s===E?c.before(p):s.hasClass("art-button-wrapper")?s.before(p):s.prepend(p),d=t(".ERRateBG"),a=d.offset().left,r=t(".ERRateStars"),u=t(".inpERRating"),r.width(0),d.mousemove(e),d.mouseleave(n),d.click(i)),null!==l&&(jQuery.widget=l),null!==w&&(t.fn.button=w),t(".easyrecipe .ERSSaveBtnSpan .ERSSaveBtn.bigoven").on("click",o)})}(jQuery);