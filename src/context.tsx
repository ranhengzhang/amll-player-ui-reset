import { useEffect, type FC } from "react";
import { consoleLog } from "./settings";
import {useAtom} from "jotai";

export const ExtensionContext: FC = () => {
    useEffect(() => {
        console.log("extension context has been mounted");
    }, []);

    useEffect(() => {
        const storedLyricSwappedAtom = localStorage.getItem('amll-react-full.enableLyricSwapTransRomanLineAtom');
        const getSwapped = ((storedLyricSwappedAtom: string)=>{
            let val = false;
            if (storedLyricSwappedAtom) {
                const storedLyricSwapped = storedLyricSwappedAtom?.replace(/^"/g, '').replace(/"$/g, '');
                val = storedLyricSwapped !== "false";
            }
            consoleLog("LOG", "ui", "swapped: " + (storedLyricSwappedAtom??val));
            return ()=>val;
        })(storedLyricSwappedAtom);

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

        const storedPlayBarAtom = localStorage.getItem('amllPlayBarAtom');
        consoleLog('INFO', 'context', "storedPlayBarAtom: " + storedPlayBarAtom);
        if (storedPlayBarAtom == "true") {
            // 创建一个 <style> 标签，并为其设置 id
            let styleElement = document.getElementById('play_bar');
            if (!styleElement) {
                styleElement = document.createElement('style');
                // 将 <style> 标签添加到 head 中
                document.head.appendChild(styleElement);
            }
            styleElement.id = 'play_bar';  // 设置 id
            styleElement.innerHTML = `
div[class*="_playbar"] {
    z-index: 9999;
    background-color: white;
}
        `
            consoleLog("INFO", "extend", "播放条置顶");
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

div[class*="_lyricDuetLine"] div[class*="_romanWord"] {
    margin-right: 0;
    margin-left: 0.25em;
}
`
            consoleLog("INFO", "fix", "调整逐字音译字间距");
        }

        const storedHideRomanAtom = localStorage.getItem('amllHideRomanAtom');
        consoleLog('INFO', 'context', "storedHideRomanAtom: " + storedHideRomanAtom);
        if (storedHideRomanAtom == "true") {
            // 创建一个 <style> 标签，并为其设置 id
            let styleElement = document.getElementById('hide_roman');
            if (!styleElement) {
                styleElement = document.createElement('style');
                // 将 <style> 标签添加到 head 中
                document.head.appendChild(styleElement);
            }
            styleElement.id = 'hide_roman';  // 设置 id
            styleElement.innerHTML = `
div[class*="_lyricLine"]:has( div[class*="_romanWord"]) > div[class*="_lyricSubLine"]:nth-child(${getSwapped() ? 2 : 3}) {
    display: none;
}
            `
            consoleLog("INFO", "fix", "逐字音译时隐藏行音译");
        }

        const storedRomanWordAtom = localStorage.getItem('amllRomanWordAtom');
        const storedTopRomanAtom = localStorage.getItem('amllTopRomanAtom');
        consoleLog('INFO', 'context', "storedRomanWordAtom: " + storedRomanWordAtom);
        consoleLog('INFO', 'context', "storedTopRomanAtom: " + storedTopRomanAtom);
        if (storedRomanWordAtom == "true") {
            // 创建一个 <style> 标签，并为其设置 id
            let styleElement = document.getElementById('roman_word');
            if (!styleElement) {
                styleElement = document.createElement('style');
                // 将 <style> 标签添加到 head 中
                document.head.appendChild(styleElement);
            }
            styleElement.id = 'roman_word';  // 设置 id
            styleElement.innerHTML = [`
div[class*="_lyricMainLine"]:has( div[class*="_romanWord"]) span[style^="mask-image"] {
    display: inline-flex;
    flex-wrap: wrap;
    flex-direction: ${storedTopRomanAtom == "true" ? "column-reverse" : "column"};
}

div[class*="_lyricMainLine"] span[style^="mask-image"] > span {
    display: contents;
}
            `, storedTopRomanAtom == "true" ? `
div[class*="_lyricMainLine"]:has(div[class*="_romanWord"]) span[style^="mask-image"]:not(:has(> div[class*="_romanWord"]))::after {
    content: " ";
    display: block;
    font-size: .5em;
    line-height: 1.25em;
}
                ` : ""].join("\n");
            consoleLog("INFO", "fix", "修复无音译音节下沉");
            if (storedTopRomanAtom == "true")
                consoleLog("INFO", "fix", "音译音节居上");
        }

        const storedTransCoverAtom = localStorage.getItem('amllTransCoverAtom');
        const storedCircleCoverAtom = localStorage.getItem('amllCircleCoverAtom');
        const storedRotaryCoverAtom = localStorage.getItem('amllRotaryCoverAtom');
        const storedCenterHoleAtom = localStorage.getItem('amllCenterHoleAtom');
        const storedRotaryCycleAtom = localStorage.getItem('amllRotaryCycleAtom');
        consoleLog('INFO', 'context', "storedTransCoverAtom: " + storedTransCoverAtom);
        consoleLog('INFO', 'context', "storedCircleCoverAtom: " + storedCircleCoverAtom);
        consoleLog('INFO', 'context', "storedRotaryCoverAtom: " + storedRotaryCoverAtom);
        consoleLog('INFO', 'context', "storedCenterHoleAtom: " + storedCenterHoleAtom);
        consoleLog('INFO', 'context', "storedRotaryCycleAtom: " + storedRotaryCycleAtom);
        if (storedTransCoverAtom == "true") {
            // 创建一个 <style> 标签，并为其设置 id
            let styleElement = document.getElementById('cover');
            if (!styleElement) {
                styleElement = document.createElement('style');
                // 将 <style> 标签添加到 head 中
                document.head.appendChild(styleElement);
            }
            styleElement.id = 'cover';  // 设置 id
            styleElement.innerHTML = [`
div[class*="_cover_"] {
    transform: perspective(0);
}
            
div[class*="_coverInner"] {
    background-color: transparent !important;
}
                `, storedCircleCoverAtom == "true" ? `
div[class*="_coverInner"]:has(> div[class*="_coverInner"]) {
    border-radius: 50% !important;
}
                `:'', storedCircleCoverAtom == "true" && storedRotaryCoverAtom == "true" ? `
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
                ` : '', storedCircleCoverAtom == "true" && storedCenterHoleAtom == "true" ? `
div[class*="_coverInner"]:has(> div[class*="_coverInner"]) {
    mask: radial-gradient(circle, transparent 15%, #FFFFFF77 15.25%, #FFFFFF77 20%, black 20.25%, black 68%, #FFFFFFAA 68.25%);
}

div[class*="_coverInner"]:has(> div[class*="_coverInner"])::before {
    content: "";
    position: absolute;
    background: white;
    width: 100%;
    height: 100%;
    mask: radial-gradient(circle, black 20%, transparent 20.25%, transparent 65%, black 65.25%);
    opacity: .5;
    z-index: 1;
}
                ` : ''].join('\n')
            consoleLog("INFO", "set", "专辑透明底");
            if (storedCircleCoverAtom == "true")
                consoleLog("INFO", "set", "专辑圆形封面");
            if (storedRotaryCoverAtom == "true")
                consoleLog("INFO", "set", "专辑旋转封面");
            if (storedCenterHoleAtom == "true")
                consoleLog("INFO", "set", "专辑仿真镂空");
        }
    }, []);

    const [musicPlaying, setMusicPlaying] = useAtom<boolean>(extensionContext.amllStates.musicPlayingAtom);
    useEffect(() => {
        if (musicPlaying) {
            let styleElement = document.getElementById('music_playing');
            if (!styleElement) {
                styleElement = document.createElement('style');
                // 将 <style> 标签添加到 head 中
                document.head.appendChild(styleElement);
            }
            styleElement.id = 'music_playing';  // 设置 id
            styleElement.innerHTML = `
#amll-lyric-player div[class*="_coverInner"] > div[class*="_coverInner"] {
    /* 旋转动画 */
    animation-play-state: running;
}
            `;
            consoleLog("INFO", "context", "封面开始旋转");
        } else {
            let styleElement = document.getElementById('music_playing');
            if (styleElement) {
                document.head.removeChild(styleElement);
                consoleLog("INFO", "context", "封面停止旋转");
            }
        }
    }, [musicPlaying]);

    const storedPartPercentAtom = localStorage.getItem('amllPartPercentAtom');
    consoleLog('INFO', 'context', "storedPartPercentAtom: " + storedPartPercentAtom);
    if (!isNaN(Number(storedPartPercentAtom))) {
        // 创建一个 <style> 标签，并为其设置 id
        let styleElement = document.getElementById('part_percent');
        if (!styleElement) {
            styleElement = document.createElement('style');
            // 将 <style> 标签添加到 head 中
            document.head.appendChild(styleElement);
        }
        styleElement.id = 'part_percent';  // 设置 id
        styleElement.innerHTML = `
div[class*="_lyricPage"] > div[class*="_horizontalLayout"] {
    grid-template-columns: [info-side] .${Number(storedPartPercentAtom)}fr [player-side] .${100-Number(storedPartPercentAtom)}fr [side-controls] 0fr;
}
        `
        consoleLog("INFO", "set", `专辑信息和歌词部分占比 ${Number(storedPartPercentAtom)}:${100-Number(storedPartPercentAtom)}`);
    }

    return null;
}
