import { useEffect, type FC } from "react";
import {
    amllAmbiguousControlAtom,
    amllCenterHoleAtom,
    amllRubyUsedAtom,
    amllTransCoverAtom,
    consoleLog
} from "./settings";

export const ExtensionContext: FC = () => {
    useEffect(() => {
        console.log("extension context has been mounted");
    }, []);

    useEffect(() => {
        const storedRubyUsedAtom = localStorage.getItem('amllRubyUsedAtom');
        consoleLog('INFO', 'context', "storedRubyUsedAtom: " + storedRubyUsedAtom);
        if (storedRubyUsedAtom == "true") {
            // 创建一个 <style> 标签，并为其设置 id
            let styleElement = document.getElementById('ruby_used');
            if (!styleElement) {
                styleElement = document.createElement('style');
                // 将 <style> 标签添加到 head 中
                document.head.appendChild(styleElement);
            }
            styleElement.id = 'ruby_used';  // 设置 id
            styleElement.innerHTML = `
div[class*="_lyricLine"]:has(ruby) {
    padding-top: 3rem;
}

div.amll-lyric-player.dom rt {
    font-size: 40%;
    font-weight: lighter;
    position: absolute;
    top: 0.25em;
    mask-image: linear-gradient(to right,rgba(0,0,0,var(--bright-mask-alpha, 1.0)) 45%,rgba(0,0,0,var(--dark-mask-alpha, 1.0)) 55%);
    mask-repeat: no-repeat;
    mask-size: 210% 100%;
}
            `;
            consoleLog("INFO", "extend", "Ruby兼容开启");
        }

        const storedBgPaddingAtom = localStorage.getItem('amllBgPaddingAtom');
        consoleLog('INFO', 'context', "storedBgPaddingAtom: " + storedBgPaddingAtom);
        if (storedBgPaddingAtom == "true") {
            // 创建一个 <style> 标签，并为其设置 id
            let styleElement = document.getElementById('bg_padding');
            if (!styleElement) {
                styleElement = document.createElement('style');
                // 将 <style> 标签添加到 head 中
                document.head.appendChild(styleElement);
            }
            styleElement.id = 'bg_padding';  // 设置 id
            styleElement.innerHTML = `
div[class*="_lyricLine"]:not([class*="_lyricDuetLine"]) {
    padding-left: 5vh !important;
}

div[class*="_lyricLine"][class*="_lyricDuetLine"] {
    padding-right: 5vh !important;
}
            `;
            consoleLog("INFO", "extend", "歌词边距强对齐");
        }

        const storedAmbiguousControlAtom = localStorage.getItem('amllAmbiguousControlAtom');
        consoleLog('INFO', 'context', "storedAmbiguousControlAtom: " + storedAmbiguousControlAtom);
        if (storedAmbiguousControlAtom == "true") {
            // 创建一个 <style> 标签，并为其设置 id
            let styleElement = document.getElementById('ctrl_bar');
            if (!styleElement) {
                styleElement = document.createElement('style');
                // 将 <style> 标签添加到 head 中
                document.head.appendChild(styleElement);
            }
            styleElement.id = 'ctrl_bar';  // 设置 id
            styleElement.innerHTML = `
div[class*="_horizontalLayout"] > div[class*="_controls"]:has(> div[class*="_controls"]:empty) {
    justify-content: center;
}

div[class*="_cover"]:has(+ div[class*="_controls"] > div[class*="_controls"]:empty) > div[class*="_cover"] {
    position: absolute;
    top: 10%;
}
            `;
            consoleLog("INFO", "fix", "自动调整左半布局");
        }

        const storedFixControlAtom = localStorage.getItem('amllFixControlAtom');
        consoleLog('INFO', 'context', "storedFixControlAtom: " + storedFixControlAtom);
        if (storedFixControlAtom == "true") {
            // 创建一个 <style> 标签，并为其设置 id
            let styleElement = document.getElementById('fix_control');
            if (!styleElement) {
                styleElement = document.createElement('style');
                // 将 <style> 标签添加到 head 中
                document.head.appendChild(styleElement);
            }
            styleElement.id = 'fix_control';  // 设置 id
            styleElement.innerHTML = `
div[class*="_controlThumb"] > button {
    position: relative;
    left: 50%;
}
            `;
            consoleLog("INFO", "fix", "修复关闭按钮定位");
        }

        const storedRomaGapAtom = localStorage.getItem('amllRomaGapAtom');
        consoleLog('INFO', 'context', "storedRomaGapAtom: " + storedRomaGapAtom);
        if (storedRomaGapAtom == "true") {
            // 创建一个 <style> 标签，并为其设置 id
            let styleElement = document.getElementById('roma_gap');
            if (!styleElement) {
                styleElement = document.createElement('style');
                // 将 <style> 标签添加到 head 中
                document.head.appendChild(styleElement);
            }
            styleElement.id = 'roma_gap';  // 设置 id
            styleElement.innerHTML = `
div[class*="_romanWord"] {
    margin-right: 0.25em;
}
`
            consoleLog("INFO", "fix", "调整逐字音译字间距");
        }

        const storedTransCoverAtom = localStorage.getItem('amllTransCoverAtom');
        consoleLog('INFO', 'context', "storedTransCoverAtom: " + storedTransCoverAtom);
        if (storedTransCoverAtom == "true") {
            // 创建一个 <style> 标签，并为其设置 id
            let styleElement = document.getElementById('trans_cover');
            if (!styleElement) {
                styleElement = document.createElement('style');
                // 将 <style> 标签添加到 head 中
                document.head.appendChild(styleElement);
            }
            styleElement.id = 'trans_cover';  // 设置 id
            styleElement.innerHTML = `
div[class*="_coverInner"] {
    background-color: transparent !important;
}
                `
            consoleLog("INFO", "set", "专辑透明底");
        }

        const storedCircleCoverAtom = localStorage.getItem('amllCircleCoverAtom');
        consoleLog('INFO', 'context', "storedCircleCoverAtom: " + storedCircleCoverAtom);
        if (storedCircleCoverAtom == "true") {
            // 创建一个 <style> 标签，并为其设置 id
            let styleElement = document.getElementById('circle_cover');
            if (!styleElement) {
                styleElement = document.createElement('style');
                // 将 <style> 标签添加到 head 中
                document.head.appendChild(styleElement);
            }
            styleElement.id = 'circle_cover';  // 设置 id
            styleElement.innerHTML = `
div[class*="_coverInner"] > div[class*="_coverInner"] {
    border-radius: 50% !important;
}
                `
            consoleLog("INFO", "set", "专辑圆形封面");
        }

        const storedRotaryCoverAtom = localStorage.getItem('amllRotaryCoverAtom');
        const storedCenterHoleAtom = localStorage.getItem('amllCenterHoleAtom');
        const storedRotaryCycleAtom = localStorage.getItem('amllRotaryCycleAtom');
        consoleLog('INFO', 'context', "storedRotaryCoverAtom: " + storedRotaryCoverAtom);
        consoleLog('INFO', 'context', "storedCenterHoleAtom: " + storedCenterHoleAtom);
        consoleLog('INFO', 'context', "storedRotaryCycleAtom: " + storedRotaryCycleAtom);
        if (storedRotaryCoverAtom == "true" || storedCenterHoleAtom == "true") {
            // 创建一个 <style> 标签，并为其设置 id
            let styleElement = document.getElementById('rotary_cover');
            if (!styleElement) {
                styleElement = document.createElement('style');
                // 将 <style> 标签添加到 head 中
                document.head.appendChild(styleElement);
            }
            styleElement.id = 'rotary_cover';  // 设置 id
            styleElement.innerHTML = [`
/* 关键帧定义 */
@keyframes rotate {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

div[class*="_coverInner"] > div[class*="_coverInner"] {
    animation: rotate ${parseFloat(storedRotaryCycleAtom) || 36}s linear infinite;
    animation-play-state: paused;
}

#amll-lyric-player:has(path[d="M8.46953 37C7.37801 37 6.56603 36.7271 6.03359 36.1814C5.51445 35.6489 5.25488 34.8502 5.25488 33.7854V4.21464C5.25488 3.14975 5.52111 2.35108 6.05355 1.81864C6.59931 1.27288 7.40463 1 8.46953 1H13.3813C14.4329 1 15.2249 1.27288 15.7574 1.81864C16.3031 2.35108 16.576 3.14975 16.576 4.21464V33.7854C16.576 34.8502 16.3031 35.6489 15.7574 36.1814C15.2249 36.7271 14.4329 37 13.3813 37H8.46953ZM24.6426 37C23.5644 37 22.759 36.7271 22.2266 36.1814C21.6942 35.6489 21.4279 34.8502 21.4279 33.7854V4.21464C21.4279 3.14975 21.6942 2.35108 22.2266 1.81864C22.7724 1.27288 23.5777 1 24.6426 1H29.5544C30.6193 1 31.4179 1.27288 31.9504 1.81864C32.4828 2.35108 32.7491 3.14975 32.7491 4.21464V33.7854C32.7491 34.8502 32.4828 35.6489 31.9504 36.1814C31.4179 36.7271 30.6193 37 29.5544 37H24.6426Z"]) div[class*="_coverInner"] > div[class*="_coverInner"] {
    /* 旋转动画 */
    animation-play-state: running;
}
`, storedCenterHoleAtom == "true" ? `
div[class*="_coverInner"] > div[class*="_coverInner"] {
    mask: radial-gradient(circle, transparent 15%, #FFFFFFAA 15%, #FFFFFFAA 20%, black 20%, black 68%, #FFFFFFAA 68%)
}

div[class*="_coverInner"] > div[class*="_coverInner"]::before {
    content: "";
    position: absolute;
    background: white;
    width: 100%;
    height: 100%;
    mask: radial-gradient(circle, black 20%, transparent 20%, transparent 65%, black 65%);
    opacity: .5;
}
` : ''].join("\n")
            consoleLog("INFO", "set", "专辑旋转封面");
        }
    }, []);

    return null;
}