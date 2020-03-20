// Copyright 2012 Google Inc. All rights reserved.
// Container Version: 4
(function(w,g){w[g]=w[g]||{};w[g].e=function(s){return eval(s);};})(window,'google_tag_manager');(function(){
var P=this,sa=function(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var d=Object.prototype.toString.call(a);if("[object Window]"==d)return"object";if("[object Array]"==d||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==d||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
else if("function"==b&&"undefined"==typeof a.call)return"object";return b},ta=function(a,b){var d=Array.prototype.slice.call(arguments,1);return function(){var b=d.slice();b.push.apply(b,arguments);return a.apply(this,b)}},ua=null;/*
 jQuery v1.9.1 (c) 2005, 2012 jQuery Foundation, Inc. jquery.org/license. */
var va=/\[object (Boolean|Number|String|Function|Array|Date|RegExp)\]/,xa=function(a){if(null==a)return String(a);var b=va.exec(Object.prototype.toString.call(Object(a)));return b?b[1].toLowerCase():"object"},ya=function(a,b){return Object.prototype.hasOwnProperty.call(Object(a),b)},ga=function(a){if(!a||"object"!=xa(a)||a.nodeType||a==a.window)return!1;try{if(a.constructor&&!ya(a,"constructor")&&!ya(a.constructor.prototype,"isPrototypeOf"))return!1}catch(b){return!1}for(var d in a);return void 0===
d||ya(a,d)},za=function(a,b){var d=b||("array"==xa(a)?[]:{}),c;for(c in a)if(ya(a,c)){var e=a[c];"array"==xa(e)?("array"!=xa(d[c])&&(d[c]=[]),d[c]=za(e,d[c])):ga(e)?(ga(d[c])||(d[c]={}),d[c]=za(e,d[c])):d[c]=e}return d};var Aa=function(){},L=function(a){return"function"==typeof a},Q=function(a){return"[object Array]"==Object.prototype.toString.call(Object(a))},Ba=function(a){return"number"==xa(a)&&!isNaN(a)},Ca=function(a,b){if(Array.prototype.indexOf){var d=a.indexOf(b);return"number"==typeof d?d:-1}for(var c=0;c<a.length;c++)if(a[c]===b)return c;return-1},Da=function(a){return a?a.replace(/^\s+|\s+$/g,""):""},M=function(a){return Math.round(Number(a))||0},ia=function(a){return"false"==String(a).toLowerCase()?!1:
!!a},Ea=function(a){var b=[];if(Q(a))for(var d=0;d<a.length;d++)b.push(String(a[d]));return b},J=function(){return new Date},Fa=function(a,b){if(!Ba(a)||!Ba(b)||a>b)a=0,b=2147483647;return Math.round(Math.random()*(b-a)+a)},Ga=function(){this.prefix="gtm.";this.values={}};Ga.prototype.set=function(a,b){this.values[this.prefix+a]=b};Ga.prototype.get=function(a){return this.values[this.prefix+a]};Ga.prototype.contains=function(a){return void 0!==this.get(a)};
var Ha=function(a,b,d){try{return a["3"](a,b||Aa,d||Aa)}catch(c){}return!1},Ia=function(a,b){function d(b,c){a.contains(b)||a.set(b,[]);a.get(b).push(c)}for(var c=Da(b).split("&"),e=0;e<c.length;e++)if(c[e]){var f=c[e].indexOf("=");0>f?d(c[e],"1"):d(c[e].substring(0,f),c[e].substring(f+1))}},Ja=function(a){var b=a?a.length:0;return 0<b?a[b-1]:""},Ka=function(a){for(var b=0;b<a.length;b++)a[b]()},ea=J().getTime(),ha=function(a,b,d){return a&&a.hasOwnProperty(b)?a[b]:d},La=function(a,
b,d){a.prototype["gtm_proxy_"+b]=a.prototype[b];a.prototype[b]=d},Ma=function(a){return null!==a&&void 0!==a&&void 0!==a.length},fa=function(a,b,d){if(!(b&&d&&Ma(a)&&Q(a)&&0!=a.length))return null;for(var c={},e=0;e<a.length;e++)a[e]&&a[e].hasOwnProperty(b)&&a[e].hasOwnProperty(d)&&(c[a[e][b]]=a[e][d]);return c};var v=window,O=document,Pa=navigator,I=function(a,b,d){var c=v[a];if(a&&/^[a-zA-Z_]\w*$/g.test(a)){var e="var "+a+";";if(P.execScript)P.execScript(e,"JavaScript");else if(P.eval)if(null==ua&&(P.eval("var _et_ = 1;"),"undefined"!=typeof P._et_?(delete P._et_,ua=!0):ua=!1),ua)P.eval(e);else{var f=P.document,g=f.createElement("SCRIPT");g.type="text/javascript";g.defer=!1;g.appendChild(f.createTextNode(e));f.body.appendChild(g);f.body.removeChild(g)}else throw Error("goog.globalEval not available");}v[a]=
void 0===c||d?b:c;return v[a]},N=function(a,b,d,c){return(c||"http:"!=v.location.protocol?a:b)+d},Qa=function(a){var b=O.getElementsByTagName("script")[0];b.parentNode.insertBefore(a,b)},ja=function(a,b){b&&(a.addEventListener?a.onload=b:a.onreadystatechange=function(){a.readyState in{loaded:1,complete:1}&&(a.onreadystatechange=null,b())})},C=function(a,b,d){var c=O.createElement("script");c.type="text/javascript";c.async=!0;c.src=a;ja(c,b);d&&(c.onerror=d);Qa(c)},ba=function(a,b){var d=O.createElement("iframe");
d.height="0";d.width="0";d.style.display="none";d.style.visibility="hidden";Qa(d);ja(d,b);void 0!==a&&(d.src=a);return d},n=function(a,b,d){var c=new Image(1,1);c.onload=function(){c.onload=null;b&&b()};c.onerror=function(){c.onerror=null;d&&d()};c.src=a},R=function(a,b,d,c){a.addEventListener?a.addEventListener(b,d,!!c):a.attachEvent&&a.attachEvent("on"+b,d)},q=function(a){v.setTimeout(a,0)},la=!1,ma=[],Ra=function(a){if(!la){var b=O.createEventObject,d="complete"==O.readyState,c="interactive"==
O.readyState;if(!a||"readystatechange"!=a.type||d||!b&&c){la=!0;for(var e=0;e<ma.length;e++)ma[e]()}}},Sa=0,Ta=function(){if(!la&&140>Sa){Sa++;try{O.documentElement.doScroll("left"),Ra()}catch(a){v.setTimeout(Ta,50)}}},Va=function(a){var b=O.getElementById(a);if(b&&Ua(b,"id")!=a)for(var d=1;d<document.all[a].length;d++)if(Ua(document.all[a][d],"id")==a)return document.all[a][d];return b},Ua=function(a,b){return a&&b&&a.attributes&&a.attributes[b]?a.attributes[b].value:null},Wa=function(a){return a.target||
a.srcElement||{}},ra=function(a){var b=O.createElement("div");b.innerHTML="A<div>"+a+"</div>";for(var b=b.lastChild,d=[];b.firstChild;)d.push(b.removeChild(b.firstChild));return d},Xa=function(a,b){for(var d={},c=0;c<b.length;c++)d[b[c]]=!0;for(var e=a,c=0;e&&!d[String(e.tagName).toLowerCase()]&&100>c;c++)e=e.parentElement;e&&!d[String(e.tagName).toLowerCase()]&&(e=null);return e},Ya=!1,Za=[],$a=function(){if(!Ya){Ya=!0;for(var a=0;a<Za.length;a++)Za[a]()}},ab=function(a){a=a||v;var b=a.location.href,
d=b.indexOf("#");return 0>d?"":b.substring(d+1)},pa=function(a){window.console&&window.console.log&&window.console.log(a)};var db=function(a,b,d,c,e){var f,g=(a.protocol.replace(":","")||v.location.protocol.replace(":","")).toLowerCase();switch(b){case "protocol":f=g;break;case "host":f=(a.hostname||v.location.hostname).split(":")[0].toLowerCase();if(d){var h=/^www\d*\./.exec(f);h&&h[0]&&(f=f.substr(h[0].length))}break;case "port":f=String(1*(a.hostname?a.port:v.location.port)||("http"==g?80:"https"==g?443:""));break;case "path":f="/"==a.pathname.substr(0,1)?a.pathname:"/"+a.pathname;var m=f.split("/");0<=Ca(c||[],m[m.length-
1])&&(m[m.length-1]="");f=m.join("/");break;case "query":f=a.search.replace("?","");if(e)a:{for(var l=f.split("&"),k=0;k<l.length;k++){var p=l[k].split("=");if(decodeURIComponent(p[0]).replace("+"," ")==e){f=decodeURIComponent(p.slice(1).join("=")).replace("+"," ");break a}}f=void 0}break;case "fragment":f=a.hash.replace("#","");break;default:f=a&&a.href}return f},eb=function(a){var b="";a&&a.href&&(b=a.hash?a.href.replace(a.hash,""):a.href);return b},ca=function(a){var b=O.createElement("a");a&&
(b.href=a);return b};var da=function(a,b){b&&void 0===v[a]&&(v[a]=b);return v[a]};var fb=new Ga,gb={},ib={set:function(a,b){za(hb(a,b),gb)},get:function(a){return D(a,2)},reset:function(){fb=new Ga;gb={}}},D=function(a,b){if(2==b){for(var d=gb,c=a.split("."),e=0;e<c.length;e++){if(void 0===d[c[e]])return;d=d[c[e]]}return d}return fb.get(a)},hb=function(a,b){for(var d={},c=d,e=a.split("."),f=0;f<e.length-1;f++)c=c[e[f]]={};c[e[e.length-1]]=b;return d};var jb=new RegExp(/^(.*\.)?(google|youtube|blogger)(\.com?)?(\.[a-z]{2})?\.?$/),kb={customPixels:["nonGooglePixels"],html:["customScripts","customPixels","nonGooglePixels","nonGoogleScripts","nonGoogleIframes"],customScripts:["html","customPixels","nonGooglePixels","nonGoogleScripts","nonGoogleIframes"],nonGooglePixels:[],nonGoogleScripts:["nonGooglePixels"],nonGoogleIframes:["nonGooglePixels"]},lb={customPixels:["customScripts","html"],html:["customScripts"],customScripts:["html"],nonGooglePixels:["customPixels",
"customScripts","html","nonGoogleScripts","nonGoogleIframes"],nonGoogleScripts:["customScripts","html"],nonGoogleIframes:["customScripts","html","nonGoogleScripts"]},mb=function(a,b){for(var d=[],c=0;c<a.length;c++)d.push(a[c]),d.push.apply(d,b[a[c]]||[]);return d},nb=function(){var a=D("gtm.whitelist");
var b=a&&mb(Ea(a),kb),d=D("gtm.blacklist")||D("tagTypeBlacklist")||[];jb.test(v.location&&v.location.hostname)&&(d=Ea(d),d.push("customScripts"));var c=d&&mb(Ea(d),lb),e={};return function(f){var g=f&&f["3"];if(!g)return!0;if(void 0!==e[g.a])return e[g.a];var h=!0;if(a)a:{if(0>Ca(b,g.a))if(g.b&&0<g.b.length)for(var m=0;m<g.b.length;m++){if(0>Ca(b,g.b[m])){h=
!1;break a}}else{h=!1;break a}h=!0}var l=!1;if(d){var k;if(!(k=0<=Ca(c,g.a)))a:{for(var p=g.b||[],r=new Ga,t=0;t<c.length;t++)r.set(c[t],!0);for(t=0;t<p.length;t++)if(r.get(p[t])){k=!0;break a}k=!1}l=k}return e[g.a]=!h||l}};var S=function(a){var b=O;return ob?b.querySelectorAll(a):null},pb;a:{var qb=/MSIE +([\d\.]+)/.exec(Pa.userAgent);if(qb&&qb[1]){var rb=O.documentMode;rb||(rb="CSS1Compat"==O.compatMode?parseInt(qb[1],10):5);if(!rb||8>=rb){pb=!1;break a}}pb=!!O.querySelectorAll}var ob=pb;var _et=function(a){var b=D("gtm.element"),d;if(b){var c=b.innerText||b.textContent||"";c&&" "!=c&&(c=c.replace(/^[\s\xa0]+|[\s\xa0]+$/g,""));c&&(c=c.replace(/(\xa0+|\s{2,}|\n|\r\t)/g," "));d=c}else d="";var e=d;return e?e:a[""]};_et.a="et";_et.b=["google"];var _eu=function(a){var b=String(D("gtm.elementUrl")||a[""]||""),d=ca(b);return b};_eu.a="eu";_eu.b=["google"];var sb=Math.random(),tb=null,ub=null,T={};var _e=function(){return ub};_e.a="e";_e.b=["google"];var _v=function(a){var b=D(a["7"].replace(/\\\./g,"."),a[""]);return void 0!==b?b:a[""]};_v.a="v";_v.b=["google"];var _f=function(a){var b=String(D("gtm.referrer")||O.referrer);if(!b)return b;var d=ca(b);return b};_f.a="f";_f.b=["google"];var aa=function(a){var b=v.location,d=b.hash?b.href.replace(b.hash,""):b.href,c;if(c=a[""]?a[""]:D("gtm.url"))d=String(c),b=ca(d);var e,f,g;
a["2"]&&(d=db(b,a["2"],e,f,g));return d},_u=aa;_u.a="u";_u.b=["google"];var _eq=function(a){return String(a["0"])==String(a["1"])};_eq.a="eq";_eq.b=["google"];var _re=function(a){return(new RegExp(a["1"],a[""]?"i":void 0)).test(a["0"])};_re.a="re";_re.b=["google"];var Bb=Math.random(),Db="1.000000">Bb;var Eb=Aa;var Fb=Aa,Gb=[],Hb=!1,Ib=function(a){return v["dataLayer"].push(a)},Jb=function(a){var b=!1;return function(){!b&&L(a)&&q(a);b=!0}},Qb=function(){for(var a=!1;!Hb&&0<Gb.length;){Hb=!0;var b=Gb.shift();if(L(b))try{b.call(ib)}catch(d){}else if(Q(b))a:{var c=b;if("string"==xa(c[0])){for(var e=c[0].split("."),f=e.pop(),g=c.slice(1),h=gb,m=0;m<e.length;m++){if(void 0===h[e[m]])break a;h=h[e[m]]}try{h[f].apply(h,g)}catch(l){}}}else{var k=b,p=void 0;for(p in k)if(k.hasOwnProperty(p)){var r=p,t=k[p];
fb.set(r,t);za(hb(r,t),gb)}var A=!1,u=k.event;if(u){ub=u;var z=Jb(k.eventCallback),F=k.eventTimeout;F&&v.setTimeout(z,Number(F));A=Fb(u,z,k.eventReporter)}tb||(tb=k["gtm.start"])&&Eb();ub=null;a=A||a}var K=b,V=gb;Pb();Hb=!1}return!a};var Rb,Sb=/(Firefox\D28\D)/g.test(Pa.userAgent),Tb={nwnc:{},nwc:{},wnc:{},wc:{},wt:null,l:!1},Ub={nwnc:{},nwc:{},wnc:{},wc:{},wt:null,l:!1},$b=function(a,b){return function(d){d=d||v.event;var c=Wa(d),e=!1;if(3!==d.which||"LINK_CLICK"!=a){"LINK_CLICK"==a&&(c=Xa(c,["a","area"]),e=!c||!c.href||Vb(c.href)||2===d.which||null==d.which&&4==d.button||d.ctrlKey||d.shiftKey||d.altKey||!0===d.metaKey);var f="FORM_SUBMIT"==a?Ub:Tb;if(d.defaultPrevented||!1===d.returnValue||d.da&&d.da()){if(c){var g={simulateDefault:!1},
h=Wb(f,["wnc","nwnc"]);h&&Xb(a,c,g,f.wt,h)}}else{if(c){var g={},m=!0,l=Wb(f,["wnc","nwnc","nwc","wc"]);(m=Xb(a,c,g,f.wt,l))||(Yb(g.eventReport,f)?b=!0:e=!0);e=e||m||"LINK_CLICK"==a&&Sb;g.simulateDefault=!m&&b&&!e;g.simulateDefault&&(e=Zb(c,g)||e,!e&&d.preventDefault&&d.preventDefault());d.returnValue=m||!b||e;return d.returnValue}return!0}}}},Xb=function(a,b,d,c,e){var f=c||2E3,g={"gtm.element":b,"gtm.elementClasses":b.className,"gtm.elementId":b["for"]||Ua(b,"id")||"","gtm.elementTarget":b.formTarget||
b.target||""};switch(a){case "LINK_CLICK":g["gtm.triggers"]=e||"";g.event="gtm.linkClick";g["gtm.elementUrl"]=b.href;g.eventTimeout=f;g.eventCallback=ac(b,d);g.eventReporter=function(a){d.eventReport=a};break;case "FORM_SUBMIT":g["gtm.triggers"]=e||"";g.event="gtm.formSubmit";g["gtm.elementUrl"]=bc(b);g.eventTimeout=f;g.eventCallback=cc(b,d);g.eventReporter=function(a){d.eventReport=a};break;case "CLICK":g.event="gtm.click";g["gtm.elementUrl"]=b.formAction||b.action||b.href||b.src||b.code||b.codebase||
"";break;default:return!0}return Ib(g)},bc=function(a){var b=a.action;b&&b.tagName&&(b=a.cloneNode(!1).action);return b},dc=function(a){var b=a.target;if(!b)switch(String(a.tagName).toLowerCase()){case "a":case "area":case "form":b="_self"}return b},Zb=function(a,b){var d=!1,c=/(iPad|iPhone|iPod)/g.test(Pa.userAgent),e=dc(a).toLowerCase();switch(e){case "":case "_self":case "_parent":case "_top":var f;f=(e||"_self").substring(1);b.targetWindow=v.frames&&v.frames[f]||v[f];break;case "_blank":c?(b.simulateDefault=
!1,d=!0):(b.targetWindowName="gtm_autoEvent_"+J().getTime(),b.targetWindow=v.open("",b.targetWindowName));break;default:c&&!v.frames[e]?(b.simulateDefault=!1,d=!0):(v.frames[e]||(b.targetWindowName=e),b.targetWindow=v.frames[e]||v.open("",e))}return d},ac=function(a,b,d){return function(){b.simulateDefault&&(b.targetWindow?b.targetWindow.location.href=a.href:(d=d||J().getTime(),500>J().getTime()-d&&v.setTimeout(ac(a,b,d),25)))}},cc=function(a,b,d){return function(){if(b.simulateDefault)if(b.targetWindow){var c;
b.targetWindowName&&(c=a.target,a.target=b.targetWindowName);O.gtmSubmitFormNow=!0;ec(a).call(a);b.targetWindowName&&(a.target=c)}else d=d||J().getTime(),500>J().getTime()-d&&v.setTimeout(cc(a,b,d),25)}},Wb=function(a,b){for(var d=[],c=0;c<b.length;c++){var e=a[b[c]],f;for(f in e)e.hasOwnProperty(f)&&e[f]&&d.push(f)}return d.join(",")},fc=function(a,b,d,c,e){var f=e;if(!f||"0"==f){if(a.l)return;a.l=!0;f="0"}var g=a.wt;b&&(!g||g>c)&&(a.wt=c);a[b?d?"wc":"wnc":d?"nwc":"nwnc"][f]=!0},Yb=function(a,b){if(b.wnc["0"]||
b.wc["0"])return!0;for(var d=0;d<gc.length;d++)if(a.passingRules[d]){var c=gc[d],e=hc[d],f=e&&e[0]&&e[0][0]||e[1]&&e[1][0];if(f&&"0"!=f&&(b.wc[f]||b.wnc[f]))for(var g=c[1],h=0;h<g.length;h++)if(a.resolvedTags[g[h]])return!0}return!1},ic=function(a,b,d,c,e){var f,g,h=!1;switch(a){case "CLICK":if(O.gtmHasClickListenerTag)return;O.gtmHasClickListenerTag=!0;f="click";g=function(a){var b=Wa(a);b&&Xb("CLICK",b,{},c)};h=!0;break;case "LINK_CLICK":b&&!Rb&&(Rb=eb(O.location));fc(Tb,b||!1,d||!1,c,e);if(O.gtmHasLinkClickListenerTag)return;
O.gtmHasLinkClickListenerTag=!0;f="click";g=$b(a,b||!1);break;case "FORM_SUBMIT":fc(Ub,b||!1,d||!1,c,e);if(O.gtmHasFormSubmitListenerTag)return;O.gtmHasFormSubmitListenerTag=!0;f="submit";g=$b(a,b||!1);break;default:return}R(O,f,g,h)},Vb=function(a){if(!Rb)return!0;var b=a.indexOf("#");if(0>b)return!1;if(0==b)return!0;var d=ca(a);return Rb==eb(d)},ec=function(a){try{if(a.constructor&&a.constructor.prototype)return a.constructor.prototype.submit}catch(b){}if(a.gtmReplacedFormSubmit)return a.gtmReplacedFormSubmit;
O.gtmFormElementSubmitter||(O.gtmFormElementSubmitter=O.createElement("form"));return O.gtmFormElementSubmitter.submit.call?O.gtmFormElementSubmitter.submit:a.submit};var vb=new String("undefined"),qc=function(a){this.resolve=function(b){for(var d=[],c=0;c<a.length;c++)d.push(a[c]===vb?b:a[c]);return d.join("")}},rc={},sc=function(a,b){var d="gtm"+ea++;rc[d]=[a,b];return d},tc=function(a){var b=a?0:1;return function(a){var c=rc[a];if(c&&L(c[b]))c[b]();rc[a]=void 0}};var uc=String.prototype.trim?function(a){return a.trim()}:function(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")},vc=function(a,b){return a<b?-1:a>b?1:0};var U;a:{var wc=P.navigator;if(wc){var xc=wc.userAgent;if(xc){U=xc;break a}}U=""};var yc=function(){return-1!=U.indexOf("Edge")};var zc=-1!=U.indexOf("Opera")||-1!=U.indexOf("OPR"),W=-1!=U.indexOf("Edge")||-1!=U.indexOf("Trident")||-1!=U.indexOf("MSIE"),Ac=-1!=U.indexOf("Gecko")&&!(-1!=U.toLowerCase().indexOf("webkit")&&!yc())&&!(-1!=U.indexOf("Trident")||-1!=U.indexOf("MSIE"))&&!yc(),Bc=-1!=U.toLowerCase().indexOf("webkit")&&!yc(),Cc=function(){var a=U;if(Ac)return/rv\:([^\);]+)(\)|;)/.exec(a);if(W&&yc())return/Edge\/([\d\.]+)/.exec(a);if(W)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);if(Bc)return/WebKit\/(\S+)/.exec(a)},
Dc=function(){var a=P.document;return a?a.documentMode:void 0},Ec=function(){if(zc&&P.opera){var a=P.opera.version;return"function"==sa(a)?a():a}var b="",d=Cc();d&&(b=d?d[1]:"");if(W&&!yc()){var c=Dc();if(c>parseFloat(b))return String(c)}return b}(),Fc={},Gc=function(a){var b;if(!(b=Fc[a])){for(var d=0,c=uc(String(Ec)).split("."),e=uc(String(a)).split("."),f=Math.max(c.length,e.length),g=0;0==d&&g<f;g++){var h=c[g]||"",m=e[g]||"",l=RegExp("(\\d*)(\\D*)","g"),k=RegExp("(\\d*)(\\D*)","g");do{var p=
l.exec(h)||["","",""],r=k.exec(m)||["","",""];if(0==p[0].length&&0==r[0].length)break;d=vc(0==p[1].length?0:parseInt(p[1],10),0==r[1].length?0:parseInt(r[1],10))||vc(0==p[2].length,0==r[2].length)||vc(p[2],r[2])}while(0==d)}b=Fc[a]=0<=d}return b},Hc=P.document,Ic=Dc(),Jc=!Hc||!W||!Ic&&yc()?void 0:Ic||("CSS1Compat"==Hc.compatMode?parseInt(Ec,10):5);var Kc;if(!(Kc=!Ac&&!W)){var Lc;if(Lc=W)Lc=W&&(yc()||9<=Jc);Kc=Lc}Kc||Ac&&Gc("1.9.1");W&&Gc("9");var Mc=function(a){Mc[" "](a);return a};Mc[" "]=function(){};var qa=function(a,b){var d="";W&&!Nc(a)&&(d='<script>document.domain="'+document.domain+'";\x3c/script>'+d);var c="<!DOCTYPE html><html><head><script>var inDapIF=true;\x3c/script>"+d+"</head><body>"+b+"</body></html>";if(Oc)a.srcdoc=c;else if(Pc){var e=a.contentWindow.document;e.open("text/html","replace");e.write(c);e.close()}else Qc(a,c)},Oc=Bc&&"srcdoc"in document.createElement("iframe"),Pc=Ac||Bc||W&&Gc(11),Qc=function(a,b){W&&Gc(7)&&!Gc(10)&&6>Rc()&&Sc(b)&&(b=Tc(b));var d=function(){a.contentWindow.goog_content=
b;a.contentWindow.location.replace("javascript:window.goog_content")};W&&!Nc(a)?Uc(a,d):d()},Rc=function(){var a=navigator.userAgent.match(/Trident\/([0-9]+.[0-9]+)/);return a?parseFloat(a[1]):0},Nc=function(a){try{var b;var d=a.contentWindow;try{var c;if(c=!!d&&null!=d.location.href)b:{try{Mc(d.foo);c=!0;break b}catch(e){}c=!1}b=c}catch(f){b=!1}return b}catch(g){return!1}},Vc=0,Uc=function(a,b){var d="goog_rendering_callback"+Vc++;window[d]=b;a.src="javascript:'<script>(function() {document.domain = \""+
document.domain+'";var continuation = window.parent.'+d+";window.parent."+d+" = null;continuation();})()\x3c/script>'"},Sc=function(a){for(var b=0;b<a.length;++b)if(127<a.charCodeAt(b))return!0;return!1},Tc=function(a){for(var b=unescape(encodeURIComponent(a)),d=Math.floor(b.length/2),c=[],e=0;e<d;++e)c[e]=String.fromCharCode(256*b.charCodeAt(2*e+1)+b.charCodeAt(2*e));1==b.length%2&&(c[d]=b.charAt(b.length-1));return c.join("")};/*
 Copyright (c) 2014 Derek Brans, MIT license https://github.com/krux/postscribe/blob/master/LICENSE. Portions derived from simplehtmlparser, which is licensed under the Apache License, Version 2.0 */

var Xc=function(a,b,d,c){return function(){try{if(0<b.length){var e=b.shift(),f=Xc(a,b,d,c);if("SCRIPT"==String(e.nodeName).toUpperCase()&&"text/gtmscript"==e.type){var g=O.createElement("script");g.async=!1;g.type="text/javascript";g.id=e.id;g.text=e.text||e.textContent||e.innerHTML||"";e.charset&&(g.charset=e.charset);var h=e.getAttribute("data-gtmsrc");h&&(g.src=h,ja(g,f));a.insertBefore(g,null);h||f()}else if(e.innerHTML&&0<=e.innerHTML.toLowerCase().indexOf("<script")){for(var m=[];e.firstChild;)m.push(e.removeChild(e.firstChild));
a.insertBefore(e,null);Xc(e,m,f,c)()}else a.insertBefore(e,null),f()}else d()}catch(l){q(c)}}};var Zc=function(a,b,d){if(O.body){var c=a["4"];c instanceof qc&&(c=
c.resolve(sc(b,d)),b=Aa);if(a[""])try{qa(ba(),"<script>var google_tag_manager=parent.google_tag_manager;\x3c/script>"+c),q(b)}catch(e){q(d)}else a[""]?Yc(c,b,d):Xc(O.body,ra(c),b,d)()}else v.setTimeout(function(){Zc(a,b,d)},200)},_html=Zc;_html.a="html";_html.b=["customScripts"];var $c={},bd=function(a,b,d,c,e){if(!ob)return!1;var f=$c[a];f||(f={id:a,C:[],S:0,oa:null,ta:!1},$c[a]=f);var g={id:a+":"+f.C.length,Oa:d,Ja:c,B:b,ca:0,Z:e||null,sa:0,R:!1};f.C.push(g);null===b?(g.R=!0,d(null)):ad(f);return!0},ad=function(a){for(var b=a.S;b<a.C.length;b++){var d=a.C[b],c=b==a.S;if(!d.R&&!cd(c,d))break;d.R&&c&&a.S++}a.C.length>a.S&&(a.oa||(a.oa=v.setTimeout(function(){a.oa=null;ad(a)},80)),la||a.ta||(a.ta=!0,ma.push(function(){ad(a)})))},cd=function(a,b){var d=[];if(b.B){var c=dd(b.B,
b.id),e=null;b.Z&&(e=dd(b.Z,b.id+"-t"));for(var f=0;f<c.length;f++){var g=c[f],h;if(null!=e&&(h=e.length>f?e[f]:null,!h&&!la&&(null===b.Z.f||b.sa+d.length<b.Z.f)))break;d.push({element:g,nb:h})}}if(!la&&b.Ja&&(!a||null==b.B.f||b.B.f!=b.ca+d.length))return!1;for(var m=0;m<d.length;m++){var l=d[m].element,k=d[m].nb;b.ca++;ed(l,b.id);k&&(b.sa++,ed(k,b.id+"-t"));b.Oa(l,k)}if(b.B.f&&b.B.f==b.ca||la)b.R=!0;return!0},ed=function(a,b){a.gtmProgressiveApplied||(a.gtmProgressiveApplied={});a.gtmProgressiveApplied[b]=
!0},dd=function(a,b){for(var d=S(a.j)||[],c=[],e=0;e<d.length;e++){var f=d[e];if(!f.gtmProgressiveApplied||!f.gtmProgressiveApplied[b]){var g;if(g=a.m){var h;a:{for(var m=f;m;){if(m.nextSibling){h=!0;break a}m=m.parentNode}h=!1}g=!h}if(g)break;c.push(f)}}return c};
var pd=function(a){var b,d="";if(0<=O.cookie.indexOf("comScore"))for(var c=O.cookie.split(";"),e=0;e<c.length;e++){var f=c[e].indexOf("comScore");0<=f&&(d="&"+unescape(c[e].substring(f+8)))}b=d;var g=encodeURIComponent;return N("https://sb","http://b",".scorecardresearch.com/b?c1=2&c2="+g(a)+"&ns__t="+J().valueOf()+"&ns_c="+(O.characterSet||O.defaultCharset||"")+"&c8="+g(O.title||"")+b+"&c7="+g(O.URL)+"&c9="+g(O.referrer))},qd=function(a){var b=encodeURIComponent;if(2048<a.length){var d=a.substring(0,
2040).lastIndexOf("&");a=a.substring(0,d)+"&ns_cut="+b(a.substring(d+1));a=a.substring(0,2048)}return a},_csm=function(a,b,d){function c(){var c=N("https://sb","http://b",".scorecardresearch.com/c2/"+e(a["5"])+"/cs.js");C(c,b,d)}var e=encodeURIComponent;n(qd(pd(a["5"])));"complete"===O.readyState?c():R(v,"load",c)};_csm.a="csm";_csm.b=["nonGoogleScripts"];var rd,sd;
var Cd=function(a){return function(){}},Dd=function(a){return function(){}};var Ud=function(a){var b=v||P,d=b.onerror,c=!1;Bc&&!Gc("535.3")&&(c=!c);b.onerror=function(b,f,g,h,m){d&&d(b,f,g,h,m);a({message:b,fileName:f,gb:g,Eb:h,error:m});return c}};var qe=46,re=[],se=[],Kb=[],te=new Ga,ue=[],Z=[],gc=[],hc=[],ve=function(){this.s=[]};ve.prototype.set=function(a,b){this.s.push([a,b]);return this};ve.prototype.resolve=function(a,b){for(var d={},c=0;c<this.s.length;c++){var e=we(this.s[c][0],a,b),f=we(this.s[c][1],a,b);d[e]=f}return d};var xe=function(a){this.index=a};
xe.prototype.resolve=function(a,b){var d=Kb[this.index];if(d&&!b(d)){var c=d["6"];if(a){if(a.get(c))return;a.set(c,!0)}d=we(d,a,b);a&&a.set(c,!1);return Ha(d)}};
var _M=function(a){return new xe(a)},ye=function(a){this.resolve=function(b,d){for(var c=[],e=!1,f=0;f<a.length;f++){var g=we(re[a[f]],b,d);g===vb&&(e=!0);c.push(g)}return e?new qc(c):c.join("")}},_T=function(a){return new ye(arguments)},ze=function(a){function b(b){for(var c=1;c<a.length;c++)if(a[c]==b)return!0;return!1}this.resolve=
function(d,c){var e=we(a[0],d,c);if(a[0]instanceof xe&&b(8)&&b(16)){var f="gtm"+ea++;te.set(f,e);return'google_tag_manager["GTM-W9LTJC"].macro(\''+f+"')"}for(var e=String(e),g=1;g<a.length;g++)e=Y[a[g]](e);return e}},_E=function(a,b){return new ze(arguments)},Ae=function(a){this.u=a},_R=function(a){return new Ae(a)},Nb=function(a,b){return we(a,new Ga,b)},we=function(a,b,d){var c=a;if(a instanceof xe||a instanceof ve||a instanceof ye||a instanceof ze)return a.resolve(b,d);if(!(a instanceof Ae))if(Q(a))for(var c=
[],e=0;e<a.length;e++)c[e]=we(a[e],b,d);else if(a&&"object"==typeof a){var c={},f;for(f in a)a.hasOwnProperty(f)&&(c[f]=we(a[f],b,d))}return c},Be=function(a,b){var d=b[a],c=d;if(d instanceof xe||d instanceof ze||d instanceof ye||d instanceof Ae)c=d;else if(Q(d))for(var c=[],e=0;e<d.length;e++)c[e]=Be(d[e],b);else if("object"==typeof d){var c=new ve,f;for(f in d)d.hasOwnProperty(f)&&c.set(b[f],Be(d[f],b))}return c},De=function(a,b){for(var d=b?b.split(","):[],c=0;c<d.length;c++){var e=d[c]=d[c].split(":");
0==a&&(e[1]=re[e[1]]);if(1==a)for(var f=Ce(e[0]),e=d[c]={},g=0;g<f.length;g++){var h=se[f[g]];e[h[0]]=h[1]}if(2==a)for(g=0;4>g;g++)e[g]=Ce(e[g]);3==a&&(d[c]=re[e[0]]);if(4==a)for(g=0;2>g;g++)if(e[g]){e[g]=e[g].split(".");for(var m=0;m<e[g].length;m++)e[g][m]=re[e[g][m]]}else e[g]=[];5==a&&(d[c]=e[0])}return d},Ce=function(a){var b=[];if(!a)return b;for(var d=0,c=0;c<a.length&&d<qe;d+=6,c++){var e=a&&a.charCodeAt(c)||65;if(65!=e){var f=0,f=65<e&&90>=e?e-65:97<=e&&122>=e?e-97+26:95==e?63:48<=e?e-48+
52:62;1&f&&b.push(d);2&f&&b.push(d+1);4&f&&b.push(d+2);8&f&&b.push(d+3);16&f&&b.push(d+4);32&f&&b.push(d+5)}}return b},Ee=function(a,b,d){a.push.apply(a,De(b,d))};var Fe=function(a){var b=this;this.D=this.Fa=!1;this.Ga=[];this.za=[];this.aa={};this.H=function(){b.D||Ka(b.Ga);b.D=!0;T[a]&&(T[a].executed=!0,T[a].succeeded=!0)};this.G=function(){b.D||Ka(b.za);b.D=!0;T[a]&&(T[a].executed=!0,T[a].succeeded=!1)};this.h=Aa},Ge=function(a,b){a.Ga.push(b)},He=function(a,b){a.za.push(b)},Ie=function(){this.i=[];this.ma=[];this.na=[];this.xa={};this.ha=[];this.F=0;this.Da={};this.Ha={}};Ie.prototype.addListener=function(a){this.ha.push(a)};
var Je=function(a,b,d,c,e,f){if(!d.D){a.i[b]=d;void 0==c&&(c=[]);void 0==e&&(e=[]);void 0==f&&(f=[]);Q(c)||(c=["or",c]);Q(e)||(e=[e]);Q(f)||(f=[f]);a.xa[b]=c;a.Da[b]=0<e.length;a.Ha[b]=0<f.length;a.F++;var g=function(){0<a.F&&a.F--;0<a.F||Ka(a.ha)};Ge(d,g);He(d,g)}},Ke=function(a,b,d){a.i[b]&&(Ge(a.i[b],function(){d(b,!0)}),He(a.i[b],function(){d(b,!1)}))},Le=function(a,b){var d=!1;return function(c,e){var f;a:{for(var g=0;g<a.length;g++)if(a[g]instanceof Ae&&a[g].u===c||a[g]===c){f=g;break a}f=-1}d||
0>f||("or"==a[0]?e?(d=!0,b()):(a.splice(f,1),1==a.length&&(d=!0)):e?(a.splice(f,1),1==a.length&&(d=!0,b())):d=!0)}},Oe=function(a,b){var d=[],c=function(a){var b=Z[a],e=void 0===b[""]?[]:b[""],e=Q(e)?e:[e];0<e.length&&c(e[0].u);d.push(a);var f=void 0===b[""]?[]:b[""],f=Q(f)?f:[f];0<f.length&&c(f[0].u)};c(b);for(var e=[],f=0;f<d.length;f++){var g=Me(a,b,d[f]);if(0<f){var h=e[f-1];Ge(h,Ne(b,h,g));He(h,function(){})}e.push(g)}e[0].aa[b]=
!0;a.ma.push(e)},Ne=function(a,b,d){return function(){b.aa[a]&&(d.aa[a]=!0,d.h())}},Me=function(a,b,d){var c;T[d]&&T[d].oncePerEvent?(c=a.i[d]?a.i[d]:a.na[d]?a.na[d]:Pe(Z[d]),a.na[d]=c):c=Pe(Z[d]);c.aa[b]=!1;return c};var Qe=function(a,b){return function(){a["9"]=b.H;a["10"]=b.G;var d=a["8"],c=b.Fa,e=!(!T[d]||!T[d].executed),f=!(!T[d]||!T[d].oncePerLoad),g=!(!T[d]||!T[d].oncePerEvent);!c&&!e||!c&&!f||!f&&!g?(b.Fa=!0,Ha(a,b.H,b.G)):T[d]&&T[d].succeeded?b.H():b.G()}},Pe=function(a){var b=new Fe(a["8"]);Ge(b,Cd(a));He(b,Dd(a));b.h=Qe(a,b);return b};var Ve,We;var Pb=function(){};var jf=function(){var a=[];return function(b,d){if(void 0===a[b]){var c=ue[b]&&Nb(ue[b],d),e=c;if(c)if(c[""]&&Q(c["1"]))for(var f=c["1"],e=!1,g=0;!e&&g<f.length;g++)c["1"]=f[g],e=Ha(c);else e=Ha(c);a[b]=[e,c]}return a[b]}},kf=function(a,b){for(var d=b[0],c=0;c<d.length;c++)if(!a.A(d[c],a.g)[0])return!1;for(var e=b[2],c=0;c<e.length;c++)if(a.A(e[c],a.g)[0])return!1;return!0},lf=!1,Fb=function(a,b,d){switch(a){case "gtm.js":if(lf)return!1;lf=!0;break;
case "gtm.sync":if(D("gtm.snippet")!=sb)return!1}D("tagTypeBlacklist");for(var c={name:a,N:b||Aa,M:Ce(),X:Ce(),A:jf(),g:nb()},e=[],f=0;f<gc.length;f++)if(kf(c,gc[f])){e[f]=!0;for(var g=c,h=gc[f],m=h[1],l=0;l<m.length;l++)g.M[m[l]]=!0;for(var k=h[3],l=0;l<k.length;l++)g.X[k[l]]=!0}else e[f]=!1;var p=[];for(var r=0;r<qe;r++)if(c.M[r]&&!c.X[r])if(c.g(Z[r])){}else{p[r]=Nb(Z[r],c.g);}c.Y=p;for(var t=new Ie,A=0;A<qe;A++)if(c.M[A]&&!c.X[A]&&!c.g(Z[A])){var u=c.Y[A],z=Pe(u);Je(t,A,z,u[""],u[""],u[""]);if(u[""])break}t.addListener(c.N);
for(var F=[],y=0;y<t.i.length;y++){var G=t.i[y];if(G){var w=t.xa[y],B=t.Da[y],x=t.Ha[y];if(0!=w.length||B||x){if(0<w.length)for(var H=Le(w,G.h),K=0;K<w.length;K++)w[K]instanceof Ae&&w[K].u!=y&&Ke(t,w[K].u,H);(B||x)&&Oe(t,y)}else F.push(y)}}for(y=0;y<F.length;y++)t.i[F[y]].h();for(y=0;y<t.ma.length;y++)t.ma[y][0].h();0<t.F||Ka(t.ha);d&&L(d)&&d({passingRules:e,resolvedTags:c.Y});return 0<c.Y.length};var mf={macro:function(a){if(te.contains(a))return te.get(a)}};mf.dataLayer=ib;mf.onHtmlSuccess=tc(!0);mf.onHtmlFailure=tc(!1);mf.Sa=function(){var a=v.google_tag_manager;a||(a=v.google_tag_manager={});a["GTM-W9LTJC"]||(a["GTM-W9LTJC"]=mf)};re.push.apply(re,function(){for(var a=[_re,_u,'url',_M(0),'.*',_eq,_e,'_event',_M(1),'gtm.js',_csm,'7770950',1,_html,'\n\x3cscript type\x3d\x22text/gtmscript\x22\x3evar _qevents\x3d_qevents||[];(function(){var a\x3ddocument.createElement(\x22script\x22);a.src\x3d(\x22https:\x22\x3d\x3ddocument.location.protocol?\x22https://secure\x22:\x22http://edge\x22)+\x22.quantserve.com/quant.js\x22;a.async\x3d!0;a.type\x3d\x22text/javascript\x22;var b\x3ddocument.getElementsByTagName(\x22script\x22)[0];b.parentNode.insertBefore(a,b)})();_qevents.push({qacct:\x22p-f8oruOqDFlMeI\x22});\x3c/script\x3e\n\n\x3cnoscript\x3e\n\x3cdiv style\x3d\x22display:none;\x22\x3e\n\x3cimg src\x3d\x22//pixel.quantserve.com/pixel/p-f8oruOqDFlMeI.gif\x22 border\x3d\x220\x22 height\x3d\x221\x22 width\x3d\x221\x22 alt\x3d\x22Quantcast\x22\x3e\n\x3c/div\x3e\n\x3c/noscript\x3e\n',2,'url path','path',_f,'referrer','url hostname','host',_v,'element classes','gtm.elementClasses','element id','gtm.elementId','event','element','gtm.element',_et,'element text','element target','gtm.elementTarget','history new url fragment','gtm.newUrlFragment','element url','gtm.elementUrl','history new state','gtm.newHistoryState','history old url fragment','gtm.oldUrlFragment','history change source','gtm.historyChangeSource','history old state','gtm.oldHistoryState'],b=[],d=0;d<a.length;d++)b[d]=Be(d,a);return b}());Ee(se,0,"3:0,3:1,6:2,0:3,1:4,3:5,3:6,6:7,0:8,1:9,3:10,5:11,8:12,3:13,4:14,8:15,6:16,2:17,3:18,6:19,6:20,2:21,3:22,6:23,7:24,6:25,7:26,6:27,6:28,7:29,3:30,6:31,6:32,7:33,6:34,7:35,6:36,7:37,6:38,7:39,6:40,7:41,6:42,7:43,6:44,7:45");Ee(Kb,1,"G,AD,CAw,AAAD,CAAM,AAAwB,AAAQG,ABAAI,AAAQw,AAAAAD,AAAQAM,AAAQAw,AAAQAAD,AAAQAAM,AAAQAAw,AAAQAAAD,AAAQAAAM");
Ee(ue,1,"Z,gM");Ee(Z,1,"AwB,AAO");Ee(gc,2,"D:D::");Ee(hc,4,":");mf.Sa();
(function(a){})("async");
(function(){var a=I("dataLayer",[],!1),b=I("google_tag_manager",{},!1),b=b["dataLayer"]=b["dataLayer"]||{};ma.push(function(){b.gtmDom||(b.gtmDom=!0,a.push({event:"gtm.dom"}))});Za.push(function(){b.gtmLoad||(b.gtmLoad=!0,a.push({event:"gtm.load"}))});var d=a.push;a.push=function(){var b=[].slice.call(arguments,0);d.apply(a,b);for(Gb.push.apply(Gb,b);300<this.length;)this.shift();return Qb()};Gb.push.apply(Gb,a.slice(0));q(Qb)})();
if("interactive"==O.readyState&&!O.createEventObject||"complete"==O.readyState)Ra();else{R(O,"DOMContentLoaded",Ra);R(O,"readystatechange",Ra);if(O.createEventObject&&O.documentElement.doScroll){var nf=!0;try{nf=!v.frameElement}catch(of){}nf&&Ta()}R(v,"load",Ra)}"complete"===O.readyState?$a():R(v,"load",$a);
(function(a){})("async");for(var pf=0;pf<Z.length;pf++){var qf=Z[pf];T[qf["8"]]={oncePerEvent:!!qf[""],oncePerLoad:!!qf[""],executed:!1,succeeded:!1}};var _vs="res_ts:1402004399983000,srv_cl:93697819,ds:live,cv:4";
})()
