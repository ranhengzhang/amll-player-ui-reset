import {useEffect, type FC} from "react";
import {
    consoleLog,
    amllAlignCenterAtom,
    amllExtraInfoAtom,
    amllLyricModeAtom,
    amllUserCssAtom,
    amllPlayBarAtom,
    amllAmbiguousControlAtom,
    amllFixControlAtom,
    amllRomaGapAtom,
    amllHideRomanAtom,
    amllTransCoverAtom,
    amllCircleCoverAtom,
    amllRotaryCoverAtom,
    amllCenterHoleAtom,
    amllRotaryCycleAtom,
    amllPartPercentAtom, amllFixStyleAtom,
} from "./settings";
import {useAtom} from "jotai";
import {atomWithStorage} from "jotai/utils";

export const ExtensionContext: FC = () => {
    useEffect(() => {
        console.log("extension context has been mounted");
    }, []);

    const storedLyricSwappedAtom = localStorage.getItem('amll-react-full.enableLyricSwapTransRomanLineAtom');
    const getSwapped = ((storedLyricSwappedAtom: string) => {
        let val = false;
        if (storedLyricSwappedAtom) {
            const storedLyricSwapped = storedLyricSwappedAtom?.replace(/^"/g, '').replace(/"$/g, '');
            val = storedLyricSwapped !== "false";
        }
        consoleLog("LOG", "ui", "swapped: " + (storedLyricSwappedAtom ?? val));
        return () => val;
    })(storedLyricSwappedAtom);

    const [amllPlayBar, setAmllPlayBar] = useAtom(amllPlayBarAtom);
    useEffect(() => {
        consoleLog('INFO', 'context', "amllPlayBar: " + amllPlayBar);
        // 创建一个 <style> 标签，并为其设置 id
        let styleElement = document.getElementById('play_bar');
        if (!styleElement) {
            styleElement = document.createElement('style');
            // 将 <style> 标签添加到 head 中
            document.head.appendChild(styleElement);
        }
        styleElement.id = 'play_bar';  // 设置 id
            
        if (amllPlayBar) {
            styleElement.innerHTML = `
div[class*="playbar"] {
    z-index: 9999;
    background-color: white;
}
        `
            consoleLog("INFO", "extend", "播放条置顶");
        } else {
            if (styleElement) {
                document.head.removeChild(styleElement);
            }
            consoleLog("INFO", "extend", "取消播放条置顶");
        }
    }, [amllPlayBar]);

    const [amllAmbiguousControl, setAmllAmbiguousControl] = useAtom(amllAmbiguousControlAtom);
    useEffect(() => {
        consoleLog('INFO', 'context', "amllAmbiguousControl: " + amllAmbiguousControl);
        // 创建一个 <style> 标签，并为其设置 id
        let styleElement = document.getElementById('ctrl_bar');
        if (!styleElement) {
            styleElement = document.createElement('style');
            // 将 <style> 标签添加到 head 中
            document.head.appendChild(styleElement);
        }
        styleElement.id = 'ctrl_bar';  // 设置 id

        if (amllAmbiguousControl) {
            styleElement.innerHTML = `
div[class*="horizontalLayout"] > div[class*="controls"]:has(> div[class*="controls"]:empty) {
    justify-content: center;
}

div[class*="cover"]:has(+ div[class*="controls"] > div[class*="controls"]:empty) > div[class*="cover"] {
    position: absolute;
    top: 10%;
}
            `;
            consoleLog("INFO", "fix", "自动调整左半布局");
        } else {
            if (styleElement) {
                document.head.removeChild(styleElement);
            }
            consoleLog("INFO", "fix", "取消自动调整左半布局");
        }
    }, [amllAmbiguousControl]);

    const [amllFixControl, setAmllFixControl] = useAtom(amllFixControlAtom);
    useEffect(() => {
        consoleLog('INFO', 'context', "amllFixControl: " + amllFixControl);
        // 创建一个 <style> 标签，并为其设置 id
        let styleElement = document.getElementById('fix_control');
        if (!styleElement) {
            styleElement = document.createElement('style');
            // 将 <style> 标签添加到 head 中
            document.head.appendChild(styleElement);
        }
        styleElement.id = 'fix_control';  // 设置 id

        if (amllFixControl) {
            styleElement.innerHTML = `
div[class*="controlThumb"] > button {
    transform: translateX(-50%) translateY(-50%) !important;
}
            `;
            consoleLog("INFO", "fix", "固定关闭按钮定位");
        } else {
            if (styleElement) {
                document.head.removeChild(styleElement);
            }
            consoleLog("INFO", "fix", "取消固定关闭按钮定位");
        }
    }, [amllFixControl]);

    const [amllRomaGap, setAmllRomaGap] = useAtom(amllRomaGapAtom);
    useEffect(() => {
        consoleLog('INFO', 'context', "amllRomaGap: " + amllRomaGap);
        // 创建一个 <style> 标签，并为其设置 id
        let styleElement = document.getElementById('roma_gap');
        if (!styleElement) {
            styleElement = document.createElement('style');
            // 将 <style> 标签添加到 head 中
            document.head.appendChild(styleElement);
        }
        styleElement.id = 'roma_gap';  // 设置 id
        
        if (amllRomaGap) {
            styleElement.innerHTML = `
div[class*="romanWord"] {
    margin-right: 0.25em;
}

div[class*="lyricDuetLine"] div[class*="romanWord"] {
    margin-right: 0;
    margin-left: 0.25em;
}
`
            consoleLog("INFO", "fix", "调整逐字音译字间距");
        } else {
            if (styleElement) {
                document.head.removeChild(styleElement);
            }
            consoleLog("INFO", "fix", "取消调整逐字音译字间距");
        }
    }, [amllRomaGap]);

    const [amllHideRoman, setAmllHideRoman] = useAtom(amllHideRomanAtom);
    useEffect(() => {
        consoleLog('INFO', 'context', "amllHideRoman: " + amllHideRoman);
        // 创建一个 <style> 标签，并为其设置 id
        let styleElement = document.getElementById('hide_roman');
        if (!styleElement) {
            styleElement = document.createElement('style');
            // 将 <style> 标签添加到 head 中
            document.head.appendChild(styleElement);
        }
        styleElement.id = 'hide_roman';  // 设置 id
        if (amllHideRoman) {
            styleElement.innerHTML = `
div[class*="lyricLine"]:has( div[class*="romanWord"]) > div[class*="lyricSubLine"]:nth-child(${getSwapped() ? 2 : 3}) {
    display: none;
}
            `
            consoleLog("INFO", "fix", "逐字音译时隐藏行音译");
        } else {
            if (styleElement) {
                document.head.removeChild(styleElement);
            }
            consoleLog("INFO", "fix", "取消逐字音译时隐藏行音译");
        }
    }, [amllHideRoman]);

    const [amllTransCover, setAmllTransCover] = useAtom(amllTransCoverAtom);
    const [amllCircleCover, setAmllCircleCover] = useAtom(amllCircleCoverAtom);
    const [amllRotaryCover, setAmllRotaryCover] = useAtom(amllRotaryCoverAtom);
    const [amllCenterHole, setAmllCenterHole] = useAtom(amllCenterHoleAtom);
    const [amllRotaryCycle, setAmllRotaryCycle] = useAtom(amllRotaryCycleAtom);
    useEffect(() => {
        consoleLog('INFO', 'context', "amllTransCover: " + amllTransCover);
        consoleLog('INFO', 'context', "amllCircleCover: " + amllCircleCover);
        consoleLog('INFO', 'context', "amllRotaryCover: " + amllRotaryCover);
        consoleLog('INFO', 'context', "amllCenterHole: " + amllCenterHole);
        consoleLog('INFO', 'context', "amllRotaryCycle: " + amllRotaryCycle);
        
        // 创建一个 <style> 标签，并为其设置 id
        let styleElement = document.getElementById('cover');
        if (!styleElement) {
            styleElement = document.createElement('style');
            // 将 <style> 标签添加到 head 中
            document.head.appendChild(styleElement);
        }
        styleElement.id = 'cover';  // 设置 id
        let innerHTML: string[] = [];

        if (amllTransCover) {
            innerHTML.push(`
div[class*="cover"] {
    transform: perspective(0);
}

div[class*="coverInner"] {
    background-color: transparent !important;
}
                `)
            consoleLog("INFO", "set", "专辑透明底");

            if (amllCircleCover) {
                innerHTML.push(`
div[class*="coverInner"]:has(> div[class*="coverInner"]), button[class*="coverButton"], button[class*="coverButton"]::before, img.rt-AvatarImage {
    border-radius: 50% !important;
    overflow: hidden;
}
                `)
                consoleLog("INFO", "set", "专辑圆形封面");

                if (amllRotaryCover)
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

div[class*="coverInner"] > div[class*="coverInner"], button[class*="coverButton"] {
    animation: rotate ${parseFloat(amllRotaryCycle) || 36}s linear infinite;
    animation-play-state: paused;
}
                `)
                consoleLog("INFO", "set", "专辑旋转封面");

                if (amllCenterHole)
                    innerHTML.push(`
div[class*="coverInner"]:has(> div[class*="coverInner"]) {
    mask: radial-gradient(circle, transparent 15%, #FFFFFF77 15.25%, #FFFFFF77 20%, black 20.25%, black 68%, #FFFFFFAA 68.25%);
}

div[class*="coverInner"]:has(> div[class*="coverInner"])::before {
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
        }

        styleElement.innerHTML = innerHTML.join('\n');
    }, [amllTransCover, amllCircleCover, amllRotaryCover, amllCenterHole, amllRotaryCycle]);

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
#amll-lyric-player div[class*="coverInner"] > div[class*="coverInner"], button[class*="coverButton"] {
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

    const [amllPartPercent, setAmllPartPercent] = useAtom(amllPartPercentAtom);
    consoleLog('INFO', 'context', "amllPartPercent: " + amllPartPercent);

    // 1. 通过 id 找到基准元素
    const baseElement = document.getElementById('amll-lyric-player');
    if (!baseElement) return;

    // 2. 在基准元素下查找目标节点
    const target = baseElement.querySelector('div[class*="horizontalLayout"]');
    if (!target) return;

    // 3. 从浏览器的 CSSStyleSheet 中读取原始的 grid-template-columns
    //    这里能拿到编译后的完整字符串，例如：
    //    [-DaA0W_info-side] .45fr [-DaA0W_player-side] .55fr [-DaA0W_side-controls] 0fr
    let originalGrid = '';
    try {
        for (const sheet of document.styleSheets) {
            const rules = sheet.cssRules || sheet.rules;
            for (const rule of rules) {
                if (
                    rule instanceof CSSStyleRule &&
                    rule.selectorText.includes('horizontalLayout') &&
                    rule.style.gridTemplateColumns
                ) {
                    originalGrid = rule.style.gridTemplateColumns;
                    break;
                }
            }
            if (originalGrid) break;
        }
    } catch (e) {
        // 跨域样式表会抛出安全错误，此时忽略
        console.warn('无法读取样式表，可能是跨域资源', e);
    }

    // 4. 提取其中带 Hash 的 [line-name]，例如 [-DaA0W_info-side]
    const lineNames = originalGrid
        ? [...originalGrid.matchAll(/\[[^\]]+\]/g)].map(m => m[0])
        : [];
    useEffect(() => {
        const percent = Number(amllPartPercent);
        let newGridValue: string;

        if (lineNames.length >= 3) {
            // 使用读取到的真实带 Hash 的 Line Names 重新组装
            newGridValue = `${lineNames[0]} ${percent}fr ${lineNames[1]} ${100 - percent}fr ${lineNames[2]} 0fr`;
        } else {
            // Fallback：如果因跨域等原因读不到样式表，退化为无 Hash 的写法
            // 此时 grid-column: xxx 的引用可能会失效，但布局比例仍然正常
            newGridValue = `[info-side] ${percent}fr [player-side] ${100 - percent}fr [side-controls] 0fr`;
        }

        if (!isNaN(Number(amllPartPercent))) {
            // 创建一个 <style> 标签，并为其设置 id
            let styleElement = document.getElementById('part_percent');
            if (!styleElement) {
                styleElement = document.createElement('style');
                // 将 <style> 标签添加到 head 中
                document.head.appendChild(styleElement);
            }
            styleElement.id = 'part_percent';  // 设置 id
            // 5. 直接设置到目标元素的内联样式上（推荐）
            //    这样不需要担心选择器权重问题，也能确保覆盖编译后的 CSS Modules 样式
            //         target.style.gridTemplateColumns = newGridValue;

            // --- 如果你仍然坚持通过 styleElement 插入样式，可以用以下替代 ---
            const selector = `div#amll-lyric-player > div[class*="horizontalLayout"]`;
            styleElement.innerHTML = `
            ${selector} {
                grid-template-columns: ${newGridValue};
            }
            `;
            consoleLog("INFO", "set", `专辑信息和歌词部分占比 ${Number(amllPartPercent)}:${100 - Number(amllPartPercent)}`);
        }
    }, [amllPartPercent]);

    const [amllExtraInfo, setAmllExtraInfo] = useAtom(amllExtraInfoAtom)
    useEffect(() => {
        let styleElement = document.getElementById('extra_info');
        if (!styleElement) {
            styleElement = document.createElement('style');
            // 将 <style> 标签添加到 head 中
            document.head.appendChild(styleElement);
        }
        styleElement.id = 'extra_info';  // 设置 id
        if (amllExtraInfo) {
            styleElement.innerHTML = `
div.amll-lyric-player > div[class*="lyricLine"][class*="bottomLine"]{
    &::after {
        content: "${amllExtraInfo}";
        font-size: max(max(2.4vh, 1.2vw), 10px);
        opacity: .3;
        transition: opacity .3s;
    }
    &[data-focused="true"]::after {
        opacity: 1;
    }
}
            `
            consoleLog("INFO", "extend", "额外歌曲信息");
        } else {
            if (styleElement) {
                document.head.removeChild(styleElement);
                consoleLog("INFO", "extend", "取消额外歌曲信息");
            }
        }
    }, [amllExtraInfo]);

    const [amllFixStyle, setAmllFixStyle] = useAtom(amllFixStyleAtom)
    useEffect(() => {
        let styleElement = document.getElementById('fix_style');
        if (!styleElement) {
            styleElement = document.createElement('style');
            // 将 <style> 标签添加到 head 中
            document.head.appendChild(styleElement);
        }
        styleElement.id = 'fix_style';  // 设置 id

        if (amllFixStyle) {
            styleElement.innerHTML = `
.amll-lyric-player.dom {
    line-height: 1.5;
    --bright-mask-alpha: 1;
    --dark-mask-alpha: 0.4;
    --amll-lp-color: light-dark(var(--p-neutral-800), var(--p-neutral-100));
    --amll-lp-hover-bg-color: color-mix(in srgb, var(--amll-lp-color), transparent 95%);
}
            `
            consoleLog("INFO", "fix", "修复弹簧动画");
        } else {
            if (styleElement) {
                document.head.removeChild(styleElement);
                consoleLog("INFO", "fix", "取消修复弹簧动画");
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
        cssTimer = setTimeout(() => {
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
        let styleElement = document.getElementById('lyric_mode');
        if (!styleElement) {
            styleElement = document.createElement('style');
            // 将 <style> 标签添加到 head 中
            document.head.appendChild(styleElement);
        }
        styleElement.id = 'lyric_mode';  // 设置 id
        
        let cssContent = [];
        if (amllLyricMode || amllAlignCenter) {
            if (amllLyricMode) {
                cssContent.push(`
div[class*="lyricPage"] > div#amll-lyric-player  > div[class*="horizontalLayout"]:not([class*="hideLyric"]) {
    grid-template-columns: [margin-left]0 [padding-left]20vw [player-side]1fr [padding-right info-side]20vw [margin-right]0;
    grid-template-rows: [drag-area]30px [thumb]auto [info-side]3fr [music-info]0fr [bottom-controls]0fr 10px;

    &.hover {
        grid-template-columns: [margin-left]20vw [padding-left]0 [player-side]1fr [padding-right]0 [margin-right info-side]20vw;
        grid-template-rows: [drag-area]30px [thumb]auto [info-side]3fr [music-info]1fr [bottom-controls]0fr 10px;
    }

    & > div[class*="cover"] {
        grid-area: 1/margin-left/-1/player-side;
        transform: translateX(-25%);
        width: calc(var(--horizontal-layout-max-width)*1.5);
        height: calc(var(--horizontal-layout-max-width)*1.5);
    }
    
    & > div[class*="thumb"] {
        margin: 0;
        grid-area: thumb/player-side;
    }

    & > div[class*="lyric"] {
        grid-area: info-side/player-side;
        padding-right: 0;
    }
    
    & > div[class*="controls"] {
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
        width: 95%;
        margin-top: 0;
        grid-area: music-info/padding-left/bottom-controls/margin-right;
    
        & > div {
            order: 1;
            flex-basis: 100%;
        }
        
        & > div[class*="musicInfo"] {
            order: 3;
            flex-basis: min(45%,400px);
        }
    
        & > div[class*="controls"] {
            order: 2;
            flex-basis: min(45%,400px);
        }
    }
    
    & > div[class*="bottomControls"] {
        grid-area: drag-area/padding-right/bottom-controls/-1;
        flex-direction: column-reverse;
        align-items: flex-end;
        padding: 4em;
    }
}`);
            }
            if (amllAlignCenter) {
                cssContent.push(`
div.amll-lyric-player.dom:not([class*="hasDuetLine"]) {
    text-align: center;

    & > div[class*="lyricLine"] {
        text-align: center;
        transform-origin: center;
    }
    
    & > div[class*="interludeDots"] {
        left: 0;
        right: 0;
        margin: auto;
    }
    
    & div[class*="romanWord"] {
        margin-right: 0.25em;
        margin-left: 0.25em;
    }
}`);
            }
            styleElement.innerHTML = cssContent.join("\n");
            consoleLog("INFO", "extend", "歌词模式");
        } else {
            if (styleElement) {
                document.head.removeChild(styleElement);
            } else {
                consoleLog("INFO", "extend", "取消歌词模式");
            }
        }
    }, [amllLyricMode, amllAlignCenter]);

    useEffect(() => {
        let retryTimer = null;
        let isMounted = true;
        let lyricCleanup = null;

        let timer = null;
        const initLyricEvents = () => {
            const player = document.getElementById('amll-lyric-player');
            if (!player) {
                retryTimer = setTimeout(initLyricEvents, 100);
                return;
            }

            const layout = player.querySelector('div[class*="horizontalLayout"]');
            if (!layout) {
                consoleLog("WARN", "extend", "未找到歌词容器");
                return;
            }

            consoleLog("INFO", "extend", "绑定歌词容器");

            const handleMouseEnter = () => {
                if (timer) {
                    clearTimeout(timer);
                    timer = null;
                }
                if (!isMounted) return;
                layout.className = (layout.className + ' hover').trim();
            };

            // 【修复】用 mouseout 代替 mouseleave，并检查鼠标是否真的离开了 lyric
            const handleMouseOut = (e) => {
                if (!isMounted) return;
                // e.relatedTarget 是鼠标移向的元素
                // 如果鼠标移向了 lyric 外部（或 null），才执行延迟
                if (!layout.contains(e.relatedTarget)) {
                    if (timer) {
                        clearTimeout(timer);
                        timer = null;
                    }
                    timer = setTimeout(() => {
                        let classList = layout.className.split(" ");
                        layout.className = classList.filter(item => item !== "hover").join(" ");
                    }, 1000)
                }
            };

            player.addEventListener('mouseenter', handleMouseEnter);
            player.addEventListener('mouseout', handleMouseOut);

            lyricCleanup = () => {
                player.removeEventListener('mouseenter', handleMouseEnter);
                player.removeEventListener('mouseout', handleMouseOut);
            };
        };

        initLyricEvents();

        return () => {
            isMounted = false;
            if (retryTimer) clearTimeout(retryTimer);
            if (typeof lyricCleanup === 'function') lyricCleanup();
        };
    }, [amllLyricMode]);

    return null;
}
