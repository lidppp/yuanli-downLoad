// ==UserScript==
// @name         原力文档图片下载插件
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *://view-cache.book118.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    var a = document.createElement('a');
    var event = new MouseEvent('click');
    a.download = decodeURI(location.hash).substring(1);
    a.href = location.href;
    a.dispatchEvent(event);
})();