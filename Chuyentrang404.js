// ==UserScript==
// @name         auto chuyển trang lỗi 404
// @namespace    datcn.pro
// @version      1.1
// @match        *://uptolink.*/*
// @match        *://*.uptolink.*/*
// @grant        none
// @run-at       document-idle
// @icon         https://truyentranhmoi.edu.vn/upload/2025/08/anh-choso-01.webp
// ==/UserScript==

(function () {
    'use strict';

    const TARGET = "https://maxtask.net/home/tasks";

    function is404Page() {
        const text = document.body.innerText.toLowerCase();

        return (
            text.includes("404 not found") ||
            text.includes("404") ||
            text.includes("không tìm thấy")
        );
    }

    function redirect() {
        console.log("⚠️ 404 detected → redirecting...");
        window.location.href = TARGET;
    }

    // check nhiều lần vì site load động
    let tries = 0;
    const interval = setInterval(() => {
        tries++;

        if (is404Page()) {
            clearInterval(interval);
            redirect();
        }

        if (tries > 10) {
            clearInterval(interval);
        }
    }, 800);

})();
