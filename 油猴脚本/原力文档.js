// ==UserScript==
// @name         原力文档插件
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://max.book118.com/html/*
// @require      https://cdn.bootcdn.net/ajax/libs/axios/0.21.0/axios.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    let sy = -1
    let namearr = [],
        fileName = document.querySelector("#header > div > div.search > div.search-group > input").placeholder
    setTimeout(()=>{
        function scoll() {
            if(document.querySelector("#btn_preview_remain")){
                document.querySelector("#btn_preview_remain").click();
                setTimeout(()=>{
                    scoll()
                },1000)
                return;
            }
            setTimeout(() => {
                window.scrollTo(0, 0);
            }, 1200);
            return new Promise((res) => {
                setTimeout(() => {
                    let scollSIV = setInterval(() => {
                        let st = getScrollTop() + 100;
                        let sy = window.scrollY
                        window.scrollTo(0, st);
                        console.log(document.querySelector("body").offsetHeight, st);
                        if ( sy === window.scrollY) {
                            clearInterval(scollSIV);
                            res();
                        }
                    }, 100);
                }, 2000);
            }).then(suc);;
        }

        function getScrollTop() {
            var scrollTop = 0;
            if (document.documentElement && document.documentElement.scrollTop) {
                scrollTop = document.documentElement.scrollTop;
            } else if (document.body) {
                scrollTop = document.body.scrollTop;
            }
            return scrollTop;
        }

        function suc() {
            var imgBoxList = document.querySelectorAll(".webpreview-item");
            for (let i = 0; i < imgBoxList.length; i++) {
                let dataId = imgBoxList[i].getAttribute("data-id");
                console.log(dataId);
                let img = imgBoxList[i].querySelector("img");
                if (img.src) {
                    console.log(document.title + dataId + "." + getFileExt(img.src))
                    saveFile(img.src, document.title + dataId + "." + getFileExt(img.src),i);
                    continue;
                }

                img.addEventListener("load", function () {
                    console.log(this.src);
                    saveFile(this.src, document.title + dataId + "." + getFileExt(this.src),i);
                });
            }
        }

        function getFileExt(str) {
            let temp = str.split(".");
            return temp[temp.length - 1];
        }

        scoll()

        var saveFile = function (data, filename,index) {
            namearr[index] = filename
            let newdom = window.open(data+"#"+filename,"_blank")
            setTimeout(()=>{
                newdom.close()
            },5000)
        };
        function creatDocx(){
            console.log(namearr)
            setTimeout(()=>{
                console.log(namearr.length , document.querySelectorAll(".webpreview-item").length)
                let flag = false;
                for(let i = 0;i<namearr.length;i++){
                    if(!namearr[i]){
                        flag = false;
                        console.warn("第",i,"页未加载")
                        break;
                    }
                    if(i===namearr.length-1){
                        flag = true;
                    }
                }
                if(flag){
                    setTimeout(()=>{
                        axios({
                            method:"POST",
                            url:"https://localhost:8001/creatworld",
                            data:{
                                fileName:fileName,
                                imgList:namearr
                            }
                        }).then((res)=>{
                            console.log(res)
                            alert("文档完成 查看out目录")
                        })
                    },5000)
                }else{
                    creatDocx()
                }
            },1000)
        }
        creatDocx()

    }, 1500)
})();