import { useEffect, type FC } from "react";
import {amllAlignCenterAtom, amllLyricModeAtom, amllUserCssAtom, consoleLog} from "./settings";
import {useAtom} from "jotai";
import {atomWithStorage} from "jotai/utils";

export const ExtensionContext: FC = () => {
    useEffect(() => {
        console.log("extension context has been mounted");
    }, []);

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
            let innerHTML: string[] = [];

            innerHTML.push(`
div[class*="_cover_"] {
    transform: perspective(0);
}

div[class*="_coverInner"] {
    background-color: transparent !important;
}
                `)
            consoleLog("INFO", "set", "专辑透明底");

            if (storedCircleCoverAtom == "true") {
                innerHTML.push(`
div[class*="_coverInner"]:has(> div[class*="_coverInner"]), button[class*="_coverButton"], button[class*="_coverButton"]::before, img.rt-AvatarImage {
    border-radius: 50% !important;
    overflow: hidden;
}
                `)
                consoleLog("INFO", "set", "专辑圆形封面");

                if (storedRotaryCoverAtom == "true")
                    innerHTML.push(`
/* 关键帧定义 */
@keyframes rotate {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

div[class*="_coverInner"] > div[class*="_coverInner"], button[class*="_coverButton"] {
    animation: rotate ${parseFloat(storedRotaryCycleAtom) || 36}s linear infinite;
    animation-play-state: paused;
}
                `)
                consoleLog("INFO", "set", "专辑旋转封面");

                if (storedCenterHoleAtom == "true")
                    innerHTML.push(`
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
                `)
                consoleLog("INFO", "set", "专辑仿真镂空");
            }

            styleElement.innerHTML = innerHTML.join('\n');
        }

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
#amll-lyric-player div[class*="_coverInner"] > div[class*="_coverInner"], button[class*="_coverButton"] {
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

    const storedExtraInfoAtom = localStorage.getItem('amllExtraInfoAtom');
    consoleLog('INFO', 'context', "storedExtraInfoAtom: " + storedExtraInfoAtom);
    if (storedExtraInfoAtom) {
        const storedExtraInfo = storedExtraInfoAtom?.replace(/^"/g, '').replace(/"$/g, '');
        // 创建一个 <style> 标签，并为其设置 id
        let styleElement = document.getElementById('extra_info');
        if (!styleElement) {
            styleElement = document.createElement('style');
            // 将 <style> 标签添加到 head 中
            document.head.appendChild(styleElement);
        }
        styleElement.id = 'extra_info';  // 设置 id
        styleElement.innerHTML = `
div.amll-lyric-player > div[class*="_lyricLine"]:empty {
    transition: transform 0.25s;
    transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
    transform-origin: 0px 87.7188px;
    mask: linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2));
    font-size: 0.8em;
}

div.amll-lyric-player > div[class*="_lyricLine"]:empty::before {
    content: "${storedExtraInfo}";
}
            `
        consoleLog("INFO", "set", `额外信息 ${storedExtraInfo}`);
    }

    const [amllFixStyle, setAmllFixStyle] = useAtom(amllFixStyleAtom)
    useEffect(() => {
        if (amllFixStyle) {
            let styleElement = document.getElementById('fix_style');
            if (!styleElement) {
                styleElement = document.createElement('style');
                // 将 <style> 标签添加到 head 中
                document.head.appendChild(styleElement);
            }
            styleElement.id = 'fix_style';  // 设置 id
            styleElement.innerHTML = `
.amll-lyric-player.dom {
    line-height: 1.5;
    --bright-mask-alpha: 1;
    --dark-mask-alpha: 0.4;
    --amll-lp-color: light-dark(var(--p-neutral-800), var(--p-neutral-100));
    --amll-lp-hover-bg-color: color-mix(in srgb, var(--amll-lp-color), transparent 95%);
}
            `
        } else {
            let styleElement = document.getElementById('fix_style');
            if (styleElement) {
                document.head.removeChild(styleElement);
            }
        }
    }, [amllFixStyle]);

    const [amllUserCss, setAmllUserCss] = useAtom(amllUserCssAtom)
    let cssTimer = null
    useEffect(() => {
        if (cssTimer) {
            // stop
            clearTimeout(cssTimer);
            cssTimer = null;
        }
        cssTimer = setTimeout(()=>{
            consoleLog("INFO", "context", "AmllUserCssAtom: " + amllUserCss);
            let styleElement = document.getElementById('user_css');
            if (amllUserCss) {
                if (!styleElement) {
                    styleElement = document.createElement('style');
                    // 将 <style> 标签添加到 head 中
                    document.head.appendChild(styleElement);
                }
                styleElement.id = 'user_css';  // 设置 id
                styleElement.innerHTML = amllUserCss;
                consoleLog("INFO", "extend", "自定义样式");
            } else {
                if (styleElement) {
                    document.head.removeChild(styleElement);
                }
                consoleLog("INFO", "extend", "取消自定义样式");
            }
        }, 1000);
    }, [amllUserCss]);

    const [amllLyricMode, setAmllLyricMode] = useAtom(amllLyricModeAtom)
    const [amllAlignCenter, setAmllAlignCenter] = useAtom(amllAlignCenterAtom)
    useEffect(() => {
        if (amllLyricMode) {
            let styleElement = document.getElementById('lyric_mode');
            if (!styleElement) {
                styleElement = document.createElement('style');
                // 将 <style> 标签添加到 head 中
                document.head.appendChild(styleElement);
            }
            styleElement.id = 'lyric_mode';  // 设置 id
            styleElement.innerHTML = `
div[class*="_lyricPage"] > div[class*="_horizontalLayout"]:not([class*="_hideLyric"]) {
    grid-template-columns: 5vw [player-side info-side]1fr 5vw;
    grid-template-rows: [drag-area]30px [thumb]auto [info-side]3fr [music-info]1fr [bottom-controls]0fr 10px;
}

div[class*="_lyricPage"] > div[class*="_horizontalLayout"]:not([class*="_hideLyric"]) > div[class*="_cover"] {
    display: none;
}

div[class*="_lyricPage"] > div[class*="_horizontalLayout"]:not([class*="_hideLyric"]) > div[class*="_thumb"] {
    margin: none;
}

div[class*="_lyricPage"] > div[class*="_horizontalLayout"]:not([class*="_hideLyric"]) > div[class*="_lyric"] {
    grid-area: 3/player-side/3;
    padding-right: 0;
}

div[class*="_lyricPage"] > div[class*="_horizontalLayout"]:not([class*="_hideLyric"]) > div[class*="_controls"] {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    width: 95%;
    margin-top: 0;
}

div[class*="_lyricPage"] > div[class*="_horizontalLayout"]:not([class*="_hideLyric"]) > div[class*="_controls"] > div {
    order: 1;
    flex-basis: 100%;
}

div[class*="_lyricPage"] > div[class*="_horizontalLayout"]:not([class*="_hideLyric"]) > div[class*="_controls"] > div[class*="_musicInfo"] {
    order: 3;
    flex-basis: min(45%,400px);
}

div[class*="_lyricPage"] > div[class*="_horizontalLayout"]:not([class*="_hideLyric"]) > div[class*="_controls"] > div[class*="_controls"] {
    order: 2;
    flex-basis: min(45%,400px);
}

div[class*="_lyricPage"] > div[class*="_horizontalLayout"]:not([class*="_hideLyric"]) > div[class*="_bottomControls"] {
    grid-area: bottom-controls/1/bottom-controls/4;
}
${ amllAlignCenter ? `
div.amll-lyric-player.dom:not([class*="_hasDuetLine"]) {
    text-align: center;
}

div.amll-lyric-player.dom:not([class*="_hasDuetLine"]) > div[class*="_lyricLine"] {
    text-align: center;
    transform-origin: center;
}
` : '' }
            `
        } else {
            let styleElement = document.getElementById('lyric_mode');
            if (styleElement) {
                document.head.removeChild(styleElement);
            }
        }
    }, [amllLyricMode, amllAlignCenter]);

    return null;
}

export const amllFixStyleAtom = atomWithStorage(
    "amllFixStyleAtom",
    false
)
