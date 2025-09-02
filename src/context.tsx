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
    /* 旋转动画 */
    animation: rotate ${parseFloat(storedRotaryCycleAtom) || 36}s linear infinite;
}`, storedCenterHoleAtom == "true" ? `
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