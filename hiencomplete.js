// ==UserScript==
// @name         hiện complete
// @namespace    datcn.pro
// @version      1.1
// @description  Hiển thị mọi giá trị qq góc trái
// @match        *://linkhuongdan.online/*
// @grant        none
// @run-at       document-end
// @icon         https://truyentranhmoi.edu.vn/upload/2025/08/anh-choso-01.webp
// ==/UserScript==

(function () {
    'use strict';

    const urlParams = new URLSearchParams(window.location.search);
    const qqValue = urlParams.get("qq");

    const box = document.createElement("div");

    if (qqValue) {
        box.innerText = "qq=" + qqValue;
    } else {
        box.innerText = "qq= (không có)";
    }

    Object.assign(box.style, {
        position: "fixed",
        top: "10px",
        left: "10px",
        padding: "8px 12px",
        background: "rgba(0,0,0,0.7)",
        color: "#fff",
        fontSize: "14px",
        fontWeight: "bold",
        borderRadius: "6px",
        zIndex: "999999",
        backdropFilter: "blur(6px)"
    });

    document.body.appendChild(box);
})();
