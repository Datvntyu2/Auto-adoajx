// ==UserScript==
// @name         tự dộng nhận nhiệm vụ
// @namespace    datcn.pro
// @version      1.1
// @match        *://maxtask.net/*
// @grant        none
// @run-at       document-idle
// @icon         https://truyentranhmoi.edu.vn/upload/2025/08/anh-choso-01.webp
// ==/UserScript==

(function () {
    'use strict';

    // ===== STORAGE =====
    const KEY_AUTO = "upto_auto";
    const KEY_STEP = "upto_step";

    let auto = localStorage.getItem(KEY_AUTO) === "true";
    let step = Number(localStorage.getItem(KEY_STEP)) || null;

    function sleep(ms) {
        return new Promise(r => setTimeout(r, ms));
    }

    function getButtons() {
        return Array.from(document.querySelectorAll("button"))
            .filter(b => b.innerText.includes("Làm nhiệm vụ"));
    }

    function match(btn, step) {
        const card = btn.closest("div");
        if (!card) return false;

        const text = card.innerText.toLowerCase();

        if (step === 2) return text.includes("uptolink 2");
        if (step === 3) return text.includes("uptolink 3");

        return false;
    }

    async function autoLoop() {
        console.log("🚀 Auto running | step:", step);

        while (auto) {
            const buttons = getButtons();

            for (const btn of buttons) {
                if (!auto) break;

                if (match(btn, step)) {
                    btn.scrollIntoView({ behavior: "smooth", block: "center" });

                    await sleep(300);

                    btn.style.outline = "3px solid lime";
                    btn.click();

                    console.log("✅ Click step", step);

                    await sleep(2000);
                }
            }

            await sleep(1000);
        }
    }

    // ===== MENU =====
    function createMenu() {
        const box = document.createElement("div");

        box.innerHTML = `
            <b>Uptolink</b><br>
            <label><input type="checkbox" id="auto"> Auto</label><br>
            <button id="s2">2 Step</button>
            <button id="s3">3 Step</button>
        `;

        Object.assign(box.style, {
            position: "fixed",
            top: "20px",
            left: "20px",
            background: "#111",
            color: "#fff",
            padding: "10px",
            borderRadius: "8px",
            zIndex: "999999"
        });

        const autoToggle = box.querySelector("#auto");
        autoToggle.checked = auto;

        autoToggle.onchange = () => {
            auto = autoToggle.checked;
            localStorage.setItem(KEY_AUTO, auto);

            console.log(auto ? "AUTO ON" : "AUTO OFF");

            if (auto && step) autoLoop();
        };

        box.querySelector("#s2").onclick = () => {
            step = 2;
            localStorage.setItem(KEY_STEP, step);

            if (auto) autoLoop();
        };

        box.querySelector("#s3").onclick = () => {
            step = 3;
            localStorage.setItem(KEY_STEP, step);

            if (auto) autoLoop();
        };

        document.body.appendChild(box);
    }

    createMenu();

    // ===== AUTO START SAU RELOAD =====
    if (auto && step) {
        setTimeout(() => {
            autoLoop();
        }, 1000);
    }

})();
