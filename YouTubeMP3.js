// ==UserScript==
// @name         Leo's YouTube MP3 2021
// @match        https://loader.to/*
// @match        https://www.youtube.com/*
// @match        https://youtu.be/*
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

mp3ran = false;

getRndInteger = function(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

openWindowURL = function(turl){
    wid = getRndInteger(10000, 999999);
    window.open(turl, "_" + wid, "height=200,width=200,left=9999,top=9999");
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        vars[key] = value;
    });
    return vars;
}

setTimeout(function() {
    if (window.location.href.includes("loader.to")) {
        url = GM_getValue("youtubeURL");
        document.getElementById("format").value = "mp3";
        document.getElementById("link").value = url;
        document.getElementById("load").click();
        intv = setInterval(function() {
            if (!document.getElementsByTagName("button")[1].disabled) {
                clearInterval(intv);
                document.getElementsByTagName("button")[1].click();
                setTimeout(function(){
                    window.close();
                }, 3000);
            }
        }, 500)
    } else {
        document.addEventListener("keydown", function(zEvent) {
            if (zEvent.ctrlKey && zEvent.altKey) {
                if (!mp3ran) {
                    mp3ran = true;
                    GM_setValue("youtubeURL", window.location.href.split("&list")[0]);
                    openWindowURL("https://loader.to/en24/youtube-m4a-converter.html");
                    setTimeout(function() {
                        mp3ran = false;
                    }, 2000);
                }
            } else if (zEvent.ctrlKey && zEvent.shiftKey) {
                downloadPlaylist();
            }
        });
    }

}, 2500);