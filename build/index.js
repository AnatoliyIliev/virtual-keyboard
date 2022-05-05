(()=>{"use strict";function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}var t=new(function(){function t(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),this.main=null,this.keysContainer=null,this.keys=[],this.onInput=null,this.onClose=null,this.value="",this.capsLock=!1}var n,a;return n=t,(a=[{key:"init",value:function(){this.main=document.createElement("div"),this.keysContainer=document.createElement("div"),this.main.classList.add("keyboard","keyboard--hidden"),this.keysContainer.classList.add("keyboard__keys"),this.main.appendChild(this.elements.keysContainer),document.body.appendChild(this.elements.main)}},{key:"_createKeys",value:function(){var e=this,t=document.createDocumentFragment(),n=function(e){return'<i class="icons">'.concat(e,"</i>")};return["backtick","1","2","3","4","5","6","7","8","9","0","-","=","backspace","tab","q","w","e","r","t","y","u","i","o","p","[","]","\\","del","capslock","a","s","d","f","g","h","j","k","l",";","'","enter","leftshift","z","x","c","v","b","n","m",",",".","/","uparrow","rightshift","leftctrl","win","leftalt","spacebar","rightalt","leftarrow","downarrow","rightarrow","rightctrl"].forEach((function(a){var i=document.createElement("button"),r=-1!==["backspace","del","enter","shift","ctrl"].indexOf(a);switch(i.setAttribute("type","button"),i.classList.add("keyboard__key"),a){case"backspace":i.classList.add("keyboard__key--wide"),i.innerHTML=n("backspase"),i.addEventListener("click",(function(){e.value=e.value.substring(0,e.value.length-1),e._trigerEvent("onInput")}));break;case"caps":i.classList.add("keyboard__key--wide","keyboard__key--activatable"),i.innerHTML=n("keyboard_capslock"),i.addEventListener("click",(function(){e._toggleCapsLock(),i.classList.toggle("keyboard__key--active",e.capsLock)}));break;case"enter":i.classList.add("keyboard__key--wide"),i.innerHTML=n("keyboard_return"),i.addEventListener("click",(function(){e.value+="\n",e._trigerEvent("onInput")}));break;case"spase":i.classList.add("keyboard__key--extra-wide"),i.innerHTML=n("space_bar"),i.addEventListener("click",(function(){e.value+=" ",e._trigerEvent("onInput")}));break;case"done":i.classList.add("keyboard__key--wide","keyboard__key--dark"),i.innerHTML=n("space_bar"),i.addEventListener("click",(function(){e.close(),e._trigerEvent("onClose")}));break;default:i.textContent=a.toLowerCase(),i.addEventListener("click",(function(){e.value+=e.capsLock?a.toUpperCase():a.toLowerCase(),e._trigerEvent("onInput")}))}t.appendChild(i),r&&t.appendChild(document.createElement("br"))})),t}},{key:"_trigerEvent",value:function(){}}])&&e(n.prototype,a),Object.defineProperty(n,"prototype",{writable:!1}),t}());t.init(),console.log(t)})();