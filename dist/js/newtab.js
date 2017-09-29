/*! (c) Philipp König under GPL-3.0 */
(e=>{"use strict";window.EntryHelper=function(e){let t={},s={},l=!1;this.init=(()=>new Promise(a=>{l=e.helper.model.getData("u/showHidden"),e.helper.model.call("entries").then(e=>{t=e.entries,s=e.amounts,a()})})),this.getAmount=(e=>{if(s[e]){let t=s[e].visible;return l&&(t+=s[e].hidden),t}return null}),this.getAllPinnedData=(()=>Object.values(t.pinned)),this.getAllBookmarkData=(()=>Object.values(t.bookmarks)),this.getData=(e=>{let s=null;return"object"==typeof t.bookmarks[e]?(s=t.bookmarks[e],"object"==typeof t.pinned[e]&&(s.pinnedIndex=t.pinned[e].index)):"object"==typeof t.directories[e]&&(s=t.directories[e]),s}),this.addData=((e,s,l)=>{"object"==typeof t.bookmarks[e]?("pinnedIndex"===s&&"object"==typeof t.pinned[e]&&(t.pinned[e].index=l),t.bookmarks[e][s]=l):"object"==typeof t.directories[e]&&(t.directories[e][s]=l)}),this.isVisible=(e=>{let s=!1;return"object"==typeof t.bookmarks[e]?s=!1===t.bookmarks[e].hidden:"object"==typeof t.directories[e]&&(s=!1===t.directories[e].hidden),s})},window.EditHelper=function(t){let s=!1;this.init=(async()=>{l(),e("<a />").addClass(t.opts.classes.edit).attr(t.opts.attr.pos,t.helper.model.getData("b/sidebarPosition")).appendTo(t.opts.elm.body),location.href.search(/#edit$/)>-1&&r()}),this.isEditMode=(()=>s);let l=()=>{t.opts.elm.body.on("click","a."+t.opts.classes.edit,e=>{e.preventDefault(),s||r()}).on("click","menu."+t.opts.classes.infoBar+" > a",s=>{s.preventDefault();let l=e(s.currentTarget);l.hasClass(t.opts.classes.cancel)?o():l.hasClass(t.opts.classes.save)&&a().then(()=>{o()})})},a=()=>new Promise(s=>{let l=[];t.opts.elm.topNav.find("a."+t.opts.classes.link).forEach(t=>{let s=e(t).text().trim(),a=(e(t).data("href")||e(t).attr("href")).trim();s&&s.length>0&&a&&a.length>0&&l.push({label:s,url:a})});let a=+new Date,o=t.helper.template.loading().appendTo(t.opts.elm.body);t.opts.elm.body.addClass(t.opts.classes.loading),t.helper.model.setData({"n/searchEngine":t.opts.elm.search.wrapper.children("select")[0].value,"n/topPagesType":t.opts.elm.topPages.children("select")[0].value,"n/shortcuts":l}).then(()=>e.delay(Math.max(0,1e3-(+new Date-a)))).then(()=>{t.opts.elm.body.removeClass(t.opts.classes.loading),o.remove(),s()})}),o=()=>{s=!1,history.pushState({},null,location.href.replace(/#edit/g,"")),t.opts.elm.body.removeClass(t.opts.classes.edit),t.opts.elm.search.wrapper.children("select").remove(),t.opts.elm.topPages.children("select").remove(),t.opts.elm.topNav.find("a:not(."+t.opts.classes.link+")").remove(),t.helper.search.updateSearchEngine(t.helper.model.getData("n/searchEngine")),t.helper.topPages.setType(t.helper.model.getData("n/topPagesType")),t.helper.shortcuts.refreshEntries(),e.delay(500).then(()=>{e("menu."+t.opts.classes.infoBar).remove()})},r=()=>{s=!0,history.pushState({},null,location.href.replace(/#edit/g,"")+"#edit"),e("<menu />").addClass(t.opts.classes.infoBar).append("<a class='"+t.opts.classes.cancel+"'>"+t.helper.i18n.get("overlay_cancel")+"</a>").append("<a class='"+t.opts.classes.save+"'>"+t.helper.i18n.get("settings_save")+"</a>").appendTo(t.opts.elm.body),e.delay().then(()=>{t.opts.elm.body.addClass(t.opts.classes.edit),h(),p(),n(),e.delay(500).then(()=>{e(window).trigger("resize")})})},n=()=>{let s=["<a class='"+t.opts.classes.edit+"' />","<a class='"+t.opts.classes.remove+"' />","<a "+t.opts.attr.pos+"='left' />","<a "+t.opts.attr.pos+"='right' />"];t.opts.elm.topNav.find("> ul > li").forEach(t=>{e(t).append(s)}),e("<a class='"+t.opts.classes.add+"' />").prependTo(t.opts.elm.topNav),t.opts.elm.topNav.off("click.edit").on("click.edit","a."+t.opts.classes.edit,t=>{t.stopPropagation();let s=e(t.currentTarget).parent("li");i(s)}).on("click.edit","a."+t.opts.classes.add,()=>{let l=e("<li />").append("<a class='"+t.opts.classes.link+"'>&nbsp;</a>").append(s).prependTo(t.opts.elm.topNav.children("ul"));e.delay().then(()=>{i(l)})}).on("click.edit","a."+t.opts.classes.remove,t=>{e(t.currentTarget).parent("li").remove()}).on("click.edit","a["+t.opts.attr.pos+"]",s=>{let l=e(s.currentTarget).attr(t.opts.attr.pos),a=e(s.currentTarget).parent("li");switch(l){case"left":a.prev("li").length()>0&&a.insertBefore(a.prev("li"));break;case"right":a.next("li").length()>0&&a.insertAfter(a.next("li"))}}).on("click.edit","> ul > li > div",e=>{"BUTTON"!==e.target.tagName&&e.stopPropagation()}),e(document).off("click.edit").on("click.edit",()=>{t.opts.elm.topNav.find("> ul > li > div").remove()})},i=s=>{t.opts.elm.topNav.find("> ul > li > div").remove();let l=s.children("a."+t.opts.classes.link).eq(0);e("<div />").append("<label>"+t.helper.i18n.get("overlay_bookmark_title")+"</label>").append("<input type='text' value='"+l.text().trim()+"' "+t.opts.attr.type+"='label' />").append("<label>"+t.helper.i18n.get("overlay_bookmark_url")+"</label>").append("<input type='text' value='"+(l.data("href")||l.attr("href")).trim()+"' "+t.opts.attr.type+"='url' />").append("<button type='submit'>"+t.helper.i18n.get("overlay_close")+"</button>").appendTo(s).find("input[type='text']").on("change input",s=>{let a=s.currentTarget.value.trim();switch(e(s.currentTarget).attr(t.opts.attr.type)){case"url":l.removeAttr("href").removeData("href"),a&&a.length>0&&(a.startsWith("chrome://")||a.startsWith("chrome-extension://")?l.data("href",a):(0!==a.search(/^\w+\:\/\//)&&(a="http://"+a),l.attr("href",a)));break;case"label":a&&a.length>0?l.text(a.trim()):l.html("&nbsp;")}})},p=()=>{let s=e("<select />").prependTo(t.opts.elm.topPages),l=t.helper.topPages.getAllTypes(),a=t.helper.model.getData("n/topPagesType");Object.keys(l).forEach(o=>{let r=t.helper.i18n.get("newtab_top_pages_"+l[o]);e("<option value='"+o+"' "+(a===o?"selected":"")+" />").text(r).appendTo(s)}),s.on("input change",e=>{t.helper.topPages.setType(e.currentTarget.value)})},h=()=>{let s=e("<select />").appendTo(t.opts.elm.search.wrapper),l=t.helper.search.getSearchEngineList(),a=t.helper.model.getData("n/searchEngine");Object.entries(l).forEach(([t,l])=>{e("<option value='"+t+"' "+(a===t?"selected":"")+" />").text(l.name).appendTo(s)}),s.on("input change",e=>{t.helper.search.updateSearchEngine(e.currentTarget.value)})}},window.SearchHelper=function(t){let s={},l=null,a={},o={google:{name:"Google",url:"https://www.google.com/",queryUrl:"https://www.google.com/search?q={1}",sorting:10},bing:{name:"Bing",url:"https://www.bing.com/",queryUrl:"https://www.bing.com/search?q={1}",sorting:20},yahoo:{name:"Yahoo",url:"https://search.yahoo.com/",queryUrl:"https://search.yahoo.com/search?p={1}",sorting:30,lang:{de:{url:"https://de.search.yahoo.com/",queryUrl:"https://de.search.yahoo.com/search?p={1}"},jp:{url:"https://search.yahoo.co.jp/",queryUrl:"https://search.yahoo.co.jp/search?p={1}"}}},yandex:{name:"Yandex",url:"https://yandex.com/",queryUrl:"https://yandex.com/search/?text={1}",sorting:40,lang:{ru:{name:"Яндекс",url:"https://yandex.ru/",queryUrl:"https://yandex.ru/search/?text={1}",sorting:15},uk:{name:"Яндекс",url:"https://yandex.ua/",queryUrl:"https://yandex.ua/search/?text={1}",sorting:15},tr:{url:"https://yandex.com.tr/",queryUrl:"https://yandex.com.tr/search/?text={1}",sorting:15}}},baidu:{name:"Baidu",url:"https://www.baidu.com/",queryUrl:"https://www.baidu.com/s?wd={1}",sorting:50,lang:{"zh-CN":{name:"百度",sorting:15}}}};this.init=(async()=>{r(),h(),this.updateSearchEngine(t.helper.model.getData("n/searchEngine"))}),this.updateSearchEngine=(e=>{if(a[e]){l=e;let s=t.helper.i18n.get("newtab_search_placeholder",[a[e].name]);t.opts.elm.search.field.attr("placeholder",s)}}),this.getSearchEngineList=(()=>a);let r=()=>{let e=t.helper.i18n.getUILanguage(),s=[];Object.entries(o).forEach(([t,l])=>{let a={alias:t,name:l.name,url:l.url,queryUrl:l.queryUrl,sorting:l.sorting};l.lang&&l.lang[e]&&Object.entries(l.lang[e]).forEach(([e,t])=>{a[e]=t}),a.name&&a.url&&a.queryUrl&&s.push(a)}),s.sort((e,t)=>(e.sorting||9999)-(t.sorting||9999)),a={},s.forEach(e=>{a[e.alias]=e})},n=s=>{let l=e("ul."+t.opts.classes.suggestions+" > li."+t.opts.classes.active),a="next"===s?0:-1;l.length()>0&&(a=l.prevAll("li").length()+("next"===s?1:-1),l.removeClass(t.opts.classes.active));let o=!1;if(a>=0){let s=e("ul."+t.opts.classes.suggestions+" > li").eq(a);s.length()>0&&(o=!0,s.addClass(t.opts.classes.active),t.opts.elm.search.field[0].value=s.text().trim())}!1===o&&(t.opts.elm.search.field[0].value=t.opts.elm.search.field.data("typedVal"))},i=e=>{e&&e.trim().length>0&&(0===e.search(/https?\:\/\//)||0===e.search(/s?ftps?\:\/\//)||0===e.search(/chrome\:\/\//)?chrome.tabs.update({url:e}):a[l]&&chrome.tabs.update({url:a[l].queryUrl.replace("{1}",encodeURIComponent(e))}))},p=t=>new Promise(l=>{if(t)if(s[t])l(s[t]);else{let a=encodeURIComponent(t),o=(e=[])=>{s[t]=e,l(e)};e.xhr("http://google.com/complete/search?client=chrome&q="+a,{responseType:"json"}).then(e=>{try{if(e.response&&e.response[0]===t){let t=[],s=[];e.response[1].forEach((l,a)=>{"NAVIGATION"===e.response[4]["google:suggesttype"][a]?t.push({type:"url",label:l}):s.push({type:"word",label:l})}),o(t.concat(s))}}catch(e){o()}},()=>{o()})}else l([])}),h=()=>{t.opts.elm.search.submit.on("click",e=>{e.preventDefault(),e.stopPropagation();let s=t.opts.elm.search.field[0].value;s&&s.trim().length>0?i(s):a[l]&&chrome.tabs.update({url:a[l].url})}),t.opts.elm.search.field.on("keyup click",s=>{s.preventDefault(),s.stopPropagation();let l=s.currentTarget.value,a=event.which||event.keyCode;13===a?i(l):40===a?n("next"):38===a?n("prev"):(t.opts.elm.search.field.data("typedVal",l),p(l).then(s=>{if(e("ul."+t.opts.classes.suggestions).remove(),s.length>0){let l=e("<ul />").addClass(t.opts.classes.suggestions).insertAfter(t.opts.elm.search.field);s.some((s,a)=>{if(e("<li />").attr(t.opts.attr.type,s.type).text(s.label).appendTo(l),a>4)return!0}),l.css({top:t.opts.elm.search.field[0].offsetTop+"px",left:t.opts.elm.search.field[0].offsetLeft+"px"})}}))}),e(document).on("mousemove","ul."+t.opts.classes.suggestions+" > li",s=>{e("ul."+t.opts.classes.suggestions+" > li").removeClass(t.opts.classes.active),e(s.currentTarget).addClass(t.opts.classes.active)}).on("click","ul."+t.opts.classes.suggestions+" > li",s=>{s.preventDefault(),s.stopPropagation();let l=e(s.currentTarget).text().trim();t.opts.elm.search.field[0].value=l,i(l)}),e(document).on("click",()=>{e("ul."+t.opts.classes.suggestions).remove(),!1===t.helper.edit.isEditMode()&&t.opts.elm.search.field[0].focus()}),e(window).on("resize",()=>{e("ul."+t.opts.classes.suggestions).remove()})}},window.ShortcutsHelper=function(t){this.init=(async()=>{this.refreshEntries(),s()}),this.refreshEntries=(()=>{let s=t.helper.model.getData("n/shortcuts");t.opts.elm.topNav.children("ul").remove();let l=e("<ul />").appendTo(t.opts.elm.topNav);s&&s.length>0&&s.forEach(s=>{let a=e("<li />").appendTo(l),o=e("<a />").addClass(t.opts.classes.link).text(s.label).appendTo(a);s.url.startsWith("chrome://")||s.url.startsWith("chrome-extension://")?o.data("href",s.url):o.attr("href",s.url)})});let s=()=>{t.opts.elm.topNav.on("mousedown","a."+t.opts.classes.link,s=>{let l=e(s.currentTarget).data("href");l&&(s.preventDefault(),t.helper.model.call("openLink",{href:l,newTab:2===s.which,position:t.helper.model.getData("b/newTabPosition"),active:2!==s.which}))})}},window.TopPagesHelper=function(t){let s=null,l={topPages:"default",mostUsed:"most_used",recentlyUsed:"recently_used",pinnedEntries:"pinned_entries",hidden:"hidden"};this.init=(async()=>{a(),t.opts.elm.topPages.html("<ul />"),this.setType(t.helper.model.getData("n/topPagesType")),setInterval(()=>{r()},3e5)}),this.getAllTypes=(()=>l),this.setType=(e=>{s===e&&"hidden"!==s||(s=e,r())});let a=()=>{e(window).on("resize",()=>{let e=o(),s=t.opts.elm.topPages.children("ul").data("total");e.total!==s&&r()})},o=()=>{let s={total:8,rows:2},l={w:window.innerWidth,h:window.innerHeight},a=e("menu."+t.opts.classes.infoBar);return a.length()>0&&(l.h-=a[0].offsetHeight),l.w>650?s.total=8:l.w>490?s.total=6:l.w>340?s.total=4:s.total=0,l.h<280?s.total=0:l.h<420&&(s.total/=2,s.rows=1),s},r=()=>{t.opts.elm.topPages.children("ul").removeClass(t.opts.classes.visible),"hidden"===s?!1===t.helper.edit.isEditMode()&&t.opts.elm.topPages.children("ul").data("total",0).html(""):Promise.all([i(),e.delay(200)]).then(([s])=>{let l=o();return t.opts.elm.topPages.children("ul").html("").data("total",l.total).attr(t.opts.attr.perRow,l.total/l.rows),s.forEach(s=>{let l=e("<li />").html("<a href='"+s.url+"' title='"+s.title+"'><span>"+s.title+"</span></a>").appendTo(t.opts.elm.topPages.children("ul"));t.helper.model.call("favicon",{url:s.url}).then(e=>{e.img&&l.find("> a > span").prepend("<img src='"+e.img+"' />")});let a=e("<img />").appendTo(l.children("a"));t.helper.model.call("thumbnail",{url:s.url}).then(e=>{e.img&&a.attr("src",e.img).addClass(t.opts.classes.visible)})}),e.delay(100)}).then(()=>{t.opts.elm.topPages.children("ul").addClass(t.opts.classes.visible)})},n=()=>new Promise(e=>{t.helper.entry.init().then(()=>{e()})}),i=()=>new Promise(e=>{let t=o();if(t.total>0)switch(s){case"mostUsed":case"recentlyUsed":n().then(()=>{let t=h(s);e(t)});break;case"pinnedEntries":n().then(()=>{let t=p();e(t)});break;case"topPages":default:chrome.topSites.get(s=>{let l=s.slice(0,t.total);e(l)})}else e([])}),p=()=>{let e=t.helper.entry.getAllPinnedData(),s=t.helper.model.getData(["u/showHidden"]),l=o(),a=[];return e.some(e=>{if((s.showHidden||t.helper.entry.isVisible(e.id))&&(a.push(e),a.length>=l.total))return!0}),a},h=e=>{let s=o(),l=t.helper.entry.getAllBookmarkData(),a=t.helper.model.getData(["u/showHidden","u/mostViewedPerMonth"]),r=t.helper.i18n.getLocaleSortCollator();"recentlyUsed"===e?l.sort((e,s)=>{let l=t.helper.entry.getData(e.id),a=t.helper.entry.getData(s.id),o=l?l.views.lastView:0,n=a?a.views.lastView:0;return o===n?r.compare(e.title,s.title):n-o}):"mostUsed"===e&&l.sort((e,s)=>{let l=t.helper.entry.getData(e.id),o=t.helper.entry.getData(s.id),n=l?l.views[a.mostViewedPerMonth?"perMonth":"total"]:0,i=o?o.views[a.mostViewedPerMonth?"perMonth":"total"]:0;return n===i?r.compare(e.title,s.title):i-n});let n=[];return l.some(e=>{if((a.showHidden||t.helper.entry.isVisible(e.id))&&(n.push(e),n.length>=s.total))return!0}),n}},window.newtab=function(){this.opts={classes:{building:"building",initLoading:"initLoading",loading:"loading",chromeApps:"chromeApps",suggestions:"suggestions",edit:"edit",add:"add",link:"link",remove:"remove",infoBar:"infoBar",save:"save",cancel:"cancel",active:"active",visible:"visible",darkMode:"dark"},attr:{type:"data-type",perRow:"data-perRow",pos:"data-pos"},elm:{body:e("body"),title:e("head > title"),content:e("section#content"),topNav:e("section#content > nav"),search:{wrapper:e("div#search"),field:e("div#search > input[type='text']"),submit:e("div#search > button[type='submit']")},topPages:e("div#topPages")},manifest:chrome.runtime.getManifest()},this.run=(()=>{chrome.permissions.contains({permissions:["tabs","topSites"]},function(e){e?t():chrome.tabs.update({url:"chrome-search://local-ntp/local-ntp.html"})})});let t=()=>{l(),s();let t=this.helper.template.loading().appendTo(this.opts.elm.body);this.opts.elm.body.addClass(this.opts.classes.initLoading),this.helper.model.init().then(()=>(!0===this.helper.model.getData("a/darkMode")&&this.opts.elm.body.addClass(this.opts.classes.darkMode),this.helper.i18n.init())).then(()=>(this.helper.font.init(),this.helper.stylesheet.init(),this.helper.stylesheet.addStylesheets(["newtab"],e(document)),this.helper.i18n.parseHtml(document),this.helper.topPages.init(),this.helper.search.init(),this.helper.shortcuts.init(),this.helper.edit.init(),e.delay(500))).then(()=>{t.remove(),this.opts.elm.body.removeClass([this.opts.classes.building,this.opts.classes.initLoading])})},s=()=>{this.helper={model:new window.ModelHelper(this),template:new window.TemplateHelper(this),i18n:new window.I18nHelper(this),font:new window.FontHelper(this),stylesheet:new window.StylesheetHelper(this),search:new window.SearchHelper(this),entry:new window.EntryHelper(this),shortcuts:new window.ShortcutsHelper(this),topPages:new window.TopPagesHelper(this),edit:new window.EditHelper(this)}},l=()=>{this.opts.manifest.content_scripts[0].css.forEach(t=>{e("head").append("<link href='"+chrome.extension.getURL(t)+"' type='text/css' rel='stylesheet' />")});let t=(e=0)=>{let s=this.opts.manifest.content_scripts[0].js[e];if(void 0!==s){let l=document.createElement("script");document.head.appendChild(l),l.onload=(()=>t(e+1)),l.src="/"+s}};t()}},(new window.newtab).run()})(jsu);