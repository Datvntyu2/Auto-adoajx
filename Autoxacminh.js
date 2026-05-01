// ==UserScript==
// @name         auto xác minh
// @match        *://*.maxtask.net/*
// @grant        none
// @run-at       document-idle
// @icon         https://truyentranhmoi.edu.vn/upload/2025/08/anh-choso-01.webp
// ==/UserScript==

(function () {
    'use strict';

    console.log("=== FULL AUTO START ===");

    // =========================
    // FIND CANVAS
    // =========================
    function findCanvas() {
        return [...document.querySelectorAll("canvas")]
            .find(c => {
                const r = c.getBoundingClientRect();
                return Math.round(r.width) === 280 && Math.round(r.height) === 280;
            });
    }

    // =========================
    // HOLD
    // =========================
    function hold3s(el, done) {
        const rect = el.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        console.log("→ HOLD");

        ["pointerdown", "mousedown"].forEach(type => {
            el.dispatchEvent(new MouseEvent(type, {
                bubbles: true,
                clientX: x,
                clientY: y
            }));
        });

        setTimeout(() => {
            console.log("→ RELEASE");

            ["mouseup", "pointerup", "click"].forEach(type => {
                el.dispatchEvent(new MouseEvent(type, {
                    bubbles: true,
                    clientX: x,
                    clientY: y
                }));
            });

            done && done();

        }, 3000);
    }

    // =========================
    // FIND BUTTON (SMART)
    // =========================
    function findButton() {
        return [...document.querySelectorAll("a, button")]
            .find(el => {
                const cls = el.className || "";
                const text = (el.innerText || "").toLowerCase();

                return (
                    cls.includes("inline-flex") ||
                    cls.includes("justify-center")
                ) && (
                    el.offsetWidth > 300 ||
                    text.includes("tiếp") ||
                    text.includes("continue") ||
                    text.includes("duyệt")
                );
            });
    }

    // =========================
    // FORCE CLICK MAX
    // =========================
    function forceClick(el) {
        const rect = el.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        console.log("→ CLICKING:", el);

        // scroll tới
        el.scrollIntoView({ block: "center" });

        // remove block
        el.removeAttribute("disabled");
        el.style.pointerEvents = "auto";
        el.style.opacity = "1";

        // click thường
        el.click();

        // spam event
        ["pointerdown", "mousedown", "mouseup", "pointerup", "click"].forEach(type => {
            el.dispatchEvent(new MouseEvent(type, {
                bubbles: true,
                clientX: x,
                clientY: y
            }));
        });

        // click tọa độ (rất quan trọng)
        document.elementFromPoint(x, y)?.click();
    }

    // =========================
    // MAIN FLOW
    // =========================
    const canvasLoop = setInterval(() => {
        const canvas = findCanvas();

        if (canvas) {
            clearInterval(canvasLoop);

            hold3s(canvas, () => {

                console.log("=== START FIND BUTTON ===");

                const btnLoop = setInterval(() => {
                    const btn = findButton();

                    if (btn) {
                        forceClick(btn);
                    }
                }, 300);

            });
        }
    }, 500);

})();
