!function(t,o){for(var e in o)t[e]=o[e]}(exports,function(t){function o(n){if(e[n])return e[n].exports;var r=e[n]={i:n,l:!1,exports:{}};return t[n].call(r.exports,r,r.exports,o),r.l=!0,r.exports}var e={};return o.m=t,o.c=e,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:n})},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,o){return Object.prototype.hasOwnProperty.call(t,o)},o.p="",o(o.s=0)}([function(t,o,e){"use strict";function n(t){for(var o=[],e=1;e<arguments.length;e++)o[e-1]=arguments[e];if(Object.assign)return(a=Object.assign).call.apply(a,[this,t].concat(o));if(void 0===t||null===t)throw new TypeError("assign: Cannot convert first argument to object");for(var n=Object(t),r=1;r<arguments.length;r++){var i=arguments[r];if(void 0!==i&&null!==i)for(var c=Object.keys(Object(i)),u=0,p=c.length;u<p;u++){var f=c[u],s=Object.getOwnPropertyDescriptor(i,f);void 0!==s&&s.enumerable&&(n[f]=i[f])}}return n;var a}Object.defineProperty(o,"__esModule",{value:!0}),o.checkBinaryOptionAttr=function(t,o,e){return o&&t.hasAttribute(o)?"false"!==t.getAttribute(o).toLowerCase():!!e};var r=function(){function t(t,o){this._root=t,this._options=o}return Object.defineProperty(t.prototype,"root",{get:function(){return this._root},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"options",{get:function(){return this._options},enumerable:!0,configurable:!0}),t}();o.Component=r;var i=function(){function t(t,o,e){this._compName=t,this._defOptions=o,this._defComponent=e}return t.prototype.init=function(t,o){return this.initByFunc(this.ctorToCreator(o),t)},t.prototype.initByFunc=function(t,o){for(var e=o&&o.rootSelector?o.rootSelector:this._defOptions.rootSelector,n=document.querySelectorAll(e),r=0;r<n.length;++r)this.createCompByFunc(t,n[r],o)},t.prototype.createComp=function(t,o,e){return this.createCompByFunc(this.ctorToCreator(t),o,e)},t.prototype.createCompByFunc=function(o,e,r){r=n({},this._defOptions,r);var i=null;return this._defComponent&&(i=t.fromRoot(this._compName,e)),i||(i=o(e,r),t.setComponent(this._compName,e,i)),i},t.prototype.ctorToCreator=function(t){if(!t&&!this._defComponent)throw new Error("Cannot create component: given type is empty");var o=t||this._defComponent;return function(t,e){return new o(t,e)}},t.prototype.fromRoot=function(o){return t.fromRoot(this._compName,o)},t.fromRoot=function(t,o){return o["__hidden_comp_"+t]||null},t.setComponent=function(t,o,e){o["__hidden_comp_"+t]=e},t}();o.ComponentFactory=i,o.assign=n}]));