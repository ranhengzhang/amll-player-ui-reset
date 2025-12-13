import { atom, useAtom } from "jotai";
import {atomWithStorage} from "jotai/utils";
import {useEffect, type FC, PropsWithChildren} from "react";
import chalk from "chalk";
import {TextProps, Text, Flex, Switch, Card, Separator, TextField, Slider} from "@radix-ui/themes";
import {amllFixStyleAtom} from "./context";
const x = () => {

}
const WARN_TAG = chalk.bgHex("#de2a18").hex("#FFFFFF")(" WARN ");
const INFO_TAG = chalk.bgHex("#2376b7").hex("#FFFFFF")(" INFO ");
const  LOG_TAG = chalk.bgHex("#1ba784").hex("#FFFFFF")(" LOG ");
const NAME_TAG = chalk.bgHex("#737c7b").hex("#FFFFFF")(" UI ");

function getChalk(bg: string, fg: string, part: string) {
    return chalk.bgHex(bg).hex(fg)(` ${part} `);
}

export function consoleLog(type: string, part: string, info: string) {

    const PART_TAG = getChalk("#61649f", "#FFFFFF", part);
    if (type === "INFO") {
        console.log(NAME_TAG + INFO_TAG + PART_TAG, info)

    } else if (type === "WARN") {
        console.log(NAME_TAG + WARN_TAG + PART_TAG, info)

    } else if (type === "LOG") {
        console.log(NAME_TAG + LOG_TAG + PART_TAG, info)

    } else {
        console.log(NAME_TAG + NAME_TAG + PART_TAG, info)
    }

}

export const SettingPage: FC = () => {
    const [amllRubyUsed, setAmllRubyUsed] = useAtom(amllRubyUsedAtom);
    const [amllAmbiguousControl, setAmllAmbiguousControl] = useAtom(amllAmbiguousControlAtom)
    const [amllBgPadding, setAmllBgPadding] = useAtom(amllBgPaddingAtom)
    const [amllFixControl, setAmllFixControl] = useAtom(amllFixControlAtom)
    const [amllRomaGap, setAmllRomaGap] = useAtom(amllRomaGapAtom)
    const [amllTransCover, setAmllTransCover] = useAtom(amllTransCoverAtom)
    const [amllCircleCover, setAmllCircleCover] = useAtom(amllCircleCoverAtom)
    const [amllRotaryCover, setAmllRotaryCover] = useAtom(amllRotaryCoverAtom)
    const [amllCenterHole, setAmllCenterHole] = useAtom(amllCenterHoleAtom)
    const [amllRotaryCycle, setAmllRotaryCycle] = useAtom(amllRotaryCycleAtom)
    const [amllRomanWord, setAmllRomanWord] = useAtom(amllRomanWordAtom)
    const [amllTopRoman, setAmllTopRoman] = useAtom(amllTopRomanAtom)
    const [amllHideRoman, setAmllHideRoman] = useAtom(amllHideRomanAtom)
    const [amllSwapped, setAmllSwapped] = useAtom(enableLyricSwapTransRomanLineAtom)
    const [amllPartPercent, setAmllPartPercent] = useAtom(amllPartPercentAtom)
    const [amllPlayBar, setAmllPlayBar] = useAtom(amllPlayBarAtom)
    const [amllExtraInfo, setAmllExtraInfo] = useAtom(amllExtraInfoAtom)
    const [amllFixStyle, setAmllFixStyle] = useAtom(amllFixStyleAtom)

    function setAmllRubyUsedFunc(used: boolean) {
        setAmllRubyUsed(used);

        // 创建一个 <style> 标签，并为其设置 id
        let styleElement = document.getElementById('ruby_used');
        if (used) {
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
        } else {
            if (styleElement) {
                document.head.removeChild(styleElement);
            }
            consoleLog("INFO", "extend", "Ruby兼容关闭");
        }
    }

    function setAmllAmbiguousControlFunc(fix: boolean) {
        setAmllAmbiguousControl(fix);

        // 创建一个 <style> 标签，并为其设置 id
        let styleElement = document.getElementById('ctrl_bar');
        if (fix) {
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
        } else {
            if (styleElement) {
                document.head.removeChild(styleElement);
            }
            consoleLog("INFO", "fix", "不调整左半布局");
        }
    }

    function setAmllBgPaddingFunc(fix: boolean) {
        setAmllBgPadding(fix);

        // 创建一个 <style> 标签，并为其设置 id
        let styleElement = document.getElementById('bg_padding');
        if (fix) {
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
            consoleLog("INFO", "fix", "对齐歌词边距");
        } else {
            if (styleElement) {
                document.head.removeChild(styleElement);
            }
            consoleLog("INFO", "fix", "还原歌词边距");
        }
    }

    function setAmllFixControlFunc(fix: boolean) {
        setAmllFixControl(fix);

        // 创建一个 <style> 标签，并为其设置 id
        let styleElement = document.getElementById('fix_control');
        if (fix) {
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
        } else {
            if (styleElement) {
                document.head.removeChild(styleElement);
            }
            consoleLog("INFO", "fix", "还原关闭按钮");
        }
    }

    function setAmllRomaGapFunc(fix:boolean) {
        setAmllRomaGap(fix);

        // 创建一个 <style> 标签，并为其设置 id
        let styleElement = document.getElementById('roma_gap');
        if (fix) {
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
        } else {
            if (styleElement) {
                document.head.removeChild(styleElement);
            }
            consoleLog("INFO", "fix", "还原逐字音译字间距");
        }
    }

    let [setAmllTransCoverFunc, setAmllCircleCoverFunc, setAmllRotaryCoverFunc, setAmllCenterHoleFunc, setAmllRotaryCycleFunc] =(()=> {
        let trans_cover = amllTransCover;
        let circle_cover = amllCircleCover;
        let rotary_cover = amllRotaryCover;
        let center_hole = amllCenterHole;
        let rotary_cycle = amllRotaryCycle;

        let set_cover = (log: () => void)=> {
            log()
            let styleElement = document.getElementById('cover');
            if (trans_cover) {
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

                if (circle_cover) {
                    innerHTML.push(`
div[class*="_coverInner"]:has(> div[class*="_coverInner"]), button[class*="_coverButton"], button[class*="_coverButton"]::before, img.rt-AvatarImage {
    border-radius: 50% !important;
    overflow: hidden;
}
                `)

                    if (rotary_cover)
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
    animation: rotate ${parseFloat(rotary_cycle) || 36}s linear infinite;
    animation-play-state: paused;
}
                `)

                    if (center_hole)
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
                }

                styleElement.innerHTML = innerHTML.join('\n');
            } else {
                if (styleElement) {
                    document.head.removeChild(styleElement);
                }
            }
        }

        return [(trans:boolean)=>{
            setAmllTransCover(trans);
            trans_cover = trans;
            set_cover(()=>consoleLog("INFO", "context", "AmllTransCoverAtom: " + trans_cover));
        },(circle:boolean)=>{
            setAmllCircleCover(circle);
            circle_cover = circle;
            set_cover(()=>consoleLog("INFO", "context", "AmllCircleCoverAtom: " + circle_cover));
        },(rotary:boolean)=>{
            setAmllRotaryCover(rotary);
            rotary_cover = rotary;
            set_cover(()=>consoleLog("INFO", "context", "AmllRotaryCoverAtom: " + rotary_cover));
        },(hole:boolean)=>{
            setAmllCenterHole(hole);
            center_hole = hole;
            set_cover(()=>consoleLog("INFO", "context", "AmllCenterHoleAtom: " + center_hole));
        },(cycle:string)=>{
            const v = parseFloat(cycle)
            if (isNaN(v) || v == 0) return
            setAmllRotaryCycle(cycle);
            rotary_cycle = cycle;
            set_cover(()=>consoleLog("INFO", "context", "AmllRotaryCycleAtom: " + rotary_cycle));
        }]
    })()

    function setAmllHideRomanFunc(hide:boolean) {
        setAmllHideRoman(hide);

        let styleElement = document.getElementById('hide_roman');
        if (hide) {
            if (!styleElement) {
                styleElement = document.createElement('style');
                // 将 <style> 标签添加到 head 中
                document.head.appendChild(styleElement);
            }
            styleElement.id = 'hide_roman';  // 设置 id
            styleElement.innerHTML = `
div[class*="_lyricLine"]:has( div[class*="_romanWord"]) > div[class*="_lyricSubLine"]:nth-child(${amllSwapped ? 2 : 3}) {
    display: none;
}
            `
        } else {
                if (styleElement) {
                    document.head.removeChild(styleElement);
                }
                consoleLog("INFO", "fix", "逐字音译时显示行音译");
        }
    }

    let [setAmllRomanWordFunc, setAmllTopRomanFunc] = (()=>{
        let roman_word = amllRomanWord;
        let top_roman = amllTopRoman;
        let set_cover = (log: () => void)=> {
            log()
            let styleElement = document.getElementById('roman');
            if (roman_word) {
                if (!styleElement) {
                    styleElement = document.createElement('style');
                    // 将 <style> 标签添加到 head 中
                    document.head.appendChild(styleElement);
                }
                styleElement.id = 'roman';  // 设置 id
                styleElement.innerHTML = [`
div[class*="_lyricMainLine"]:has( div[class*="_romanWord"]) span[style^="mask-image"] {
    display: inline-flex;
    flex-wrap: wrap;
    flex-direction: ${top_roman ? "column-reverse" : "column"};
}

div[class*="_lyricMainLine"] span[style^="mask-image"] > span {
    display: contents;
}
                `, top_roman ? `
div[class*="_lyricMainLine"]:has(div[class*="_romanWord"]) span[style^="mask-image"]:not(:has(> div[class*="_romanWord"]))::after {
    content: " ";
    display: block;
    font-size: .5em;
    line-height: 1.25em;
}
                ` : ""].join('\n')
            } else {
                if (styleElement) {
                    document.head.removeChild(styleElement);
                }
            }
        }

        return [(word:boolean)=>{
            setAmllRomanWord(word);
            roman_word = word;
            set_cover(()=>consoleLog("INFO", "context", "AmllRomanWordAtom: " + roman_word));
        },(top:boolean)=>{
            setAmllTopRoman(top);
            top_roman = top;
            set_cover(()=>consoleLog("INFO", "context", "AmllTopRomanAtom: " + top_roman));
        }]
    })()

    function setAmllPartPercentFunc(percent:number) {
        setAmllPartPercent(percent);

        consoleLog("INFO", "context", "AmllPartPercentAtomAtom: " + percent);
        let styleElement = document.getElementById('part_percent');
        if (!styleElement) {
            styleElement = document.createElement('style');
            // 将 <style> 标签添加到 head 中
            document.head.appendChild(styleElement);
        }
        styleElement.id = 'part_percent';  // 设置 id
        styleElement.innerHTML = `
div[class*="_lyricPage"] > div[class*="_horizontalLayout"] {
    grid-template-columns: [info-side] .${percent}fr [player-side] .${100-percent}fr [side-controls] 0fr;
}
        `
    }

    function setAmllPlayBarFunc(top:boolean) {
        setAmllPlayBar(top);
        consoleLog("INFO", "context", "AmllPlayBarAtom: " + top);
        let styleElement = document.getElementById('play_bar');
        if (top) {
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
        } else {
            if (styleElement) {
                document.head.removeChild(styleElement);
                consoleLog("INFO", "extend", "播放条取消置顶");
            }
        }
    }

    function setAmllExtraInfoFunc(info:string) {
        setAmllExtraInfo(info);
        consoleLog("INFO", "context", "AmllExtraInfoAtom: " + info);
        let styleElement = document.getElementById('extra_info');
        if (info) {
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
}

div.amll-lyric-player > div[class*="_lyricLine"]:empty::before {
    content: "${info}";
}
            `
            consoleLog("INFO", "extend", "额外专辑信息");
        } else {
            if (styleElement) {
                document.head.removeChild(styleElement);
                consoleLog("INFO", "extend", "取消额外专辑信息");
            }
        }
    }

    function setAmllFixStyleFunc(fix:boolean) {
        setAmllFixStyle(fix);
        consoleLog("INFO", "context", "AmllFixStyleAtom: " + fix);
        if (fix)
            consoleLog("INFO", "extend", "修复样式丢失");
        else
            consoleLog("INFO", "extend", "取消修复样式丢失");
    }

    useEffect(() => {
        console.log("SettingPage Loaded");
    }, []);

    // 前置组件
    const SubTitle: FC<PropsWithChildren<TextProps>> = ({ children, ...props }) => {
        return (
            <Text weight="bold" size="4" my="4" as="div" {...props}>
                {children}
            </Text>
        );
    };

    return <div>
        <SubTitle>布局调整</SubTitle>
        <Card mt="2">
            <Flex direction="row" align="center" gap="4" my="2">
                <Flex direction="column" flexGrow="1">
                    <Text as="div">无控制条时调整左半布局</Text>
                </Flex>
                <Switch checked={amllAmbiguousControl}
                        onCheckedChange={(e) => setAmllAmbiguousControlFunc(e)}/>
            </Flex>
            <Flex direction="row" align="center" gap="4" my="2">
                <Flex direction="column" flexGrow="1">
                    <Text as="div">修复「取消弹簧动画」时样式丢失<br/>(解决方法来自 Linho1219)</Text>
                </Flex>
                <Switch checked={amllFixStyle}
                        onCheckedChange={(e) => setAmllFixStyleFunc(e)}/>
            </Flex>
            <Flex direction="row" align="center" gap="4" my="2">
                <Flex direction="column" flexGrow="1">
                    <Text as="div">播放条置顶</Text>
                </Flex>
                <Switch checked={amllPlayBar}
                        onCheckedChange={(e) => setAmllPlayBarFunc(e)}/>
            </Flex>
            <Separator my="3" size="4" />
            <Flex direction="row" align="center" gap="4" my="2">
                <Flex direction="column" flexGrow="1">
                    <Text as="div">专辑信息和歌词部分占比</Text>
                </Flex>
                <Slider defaultValue={[amllPartPercent]}
                        onValueChange={(e) => setAmllPartPercentFunc(e[0])}/>
                {amllPartPercent}
            </Flex>
            <Flex direction="row" align="center" gap="4" my="2">
                <Flex direction="column" flexGrow="1">
                    <Text as="div">对齐歌词边距</Text>
                </Flex>
                <Switch checked={amllBgPadding}
                        onCheckedChange={(e) => setAmllBgPaddingFunc(e)}/>
            </Flex>
            <Flex direction="row" align="center" gap="4" my="2">
                <Flex direction="column" flexGrow="1">
                    <Text as="div">关闭按钮对齐</Text>
                </Flex>
                <Switch checked={amllFixControl}
                        onCheckedChange={(e) => setAmllFixControlFunc(e)}/>
            </Flex>
            <Flex direction="row" align="center" gap="4" my="2">
                <Flex direction="column" flexGrow="1">
                    <Text as="div">逐字音译间距</Text>
                </Flex>
                <Switch checked={amllRomaGap}
                        onCheckedChange={(e) => setAmllRomaGapFunc(e)}/>
            </Flex>
            <Flex direction="row" align="center" gap="4" my="2">
                <Flex direction="column" flexGrow="1">
                    <Text as="div">逐字音译时隐藏行音译</Text>
                </Flex>
                <Switch checked={amllHideRoman}
                        onCheckedChange={(e) => setAmllHideRomanFunc(e)}/>
            </Flex>
            <Flex direction="row" align="center" gap="4" my="2">
                <Flex direction="column" flexGrow="1">
                    <Text as="div">逐字音译对齐</Text>
                </Flex>
                <Switch checked={amllRomanWord}
                        onCheckedChange={(e) => setAmllRomanWordFunc(e)}/>
            </Flex>
            {amllRomanWord ?
                <Flex direction="row" align="center" gap="4" my="2">
                    <Flex direction="column" flexGrow="1">
                        <Text as="div">逐字音译居上</Text>
                    </Flex>
                    <Switch checked={amllTopRoman}
                            onCheckedChange={(e) => setAmllTopRomanFunc(e)}/>
                </Flex>
                : null}
            <Flex direction="row" align="center" gap="4" my="2">
                <Flex direction="column" flexGrow="1">
                    <Text as="div">歌词页额外信息</Text>
                </Flex>
                <TextField.Root value={amllExtraInfo}
                                onChange={(e) => setAmllExtraInfoFunc(e.currentTarget.value)}/>
            </Flex>
        </Card>
        <SubTitle>额外兼容</SubTitle>
        <Card mt="2">
            <Flex direction="row" align="center" gap="4" my="2">
                <Flex direction="column" flexGrow="1">
                    <Text as="div">兼容ruby注释</Text>
                </Flex>
                <Switch checked={amllRubyUsed}
                        onCheckedChange={(e) => setAmllRubyUsedFunc(e)}/>
            </Flex>
        </Card>
        <SubTitle>专辑封面</SubTitle>
        <Card mt="2">
            <Flex direction="row" align="center" gap="4" my="2">
                <Flex direction="column" flexGrow="1">
                    <Text as="div">透明底</Text>
                </Flex>
                <Switch checked={amllTransCover}
                        onCheckedChange={(e) => setAmllTransCoverFunc(e)}/>
            </Flex>
            {amllTransCover ?
                <Flex direction="row" align="center" gap="4" my="2">
                    <Flex direction="column" flexGrow="1">
                        <Text as="div">圆形封面</Text>
                    </Flex>
                    <Switch checked={amllCircleCover}
                            onCheckedChange={(e) => setAmllCircleCoverFunc(e)}/>
                </Flex>
                : null}
            {amllTransCover && amllCircleCover ?
                <Flex direction="row" align="center" gap="4" my="2">
                    <Flex direction="column" flexGrow="1">
                        <Text as="div">旋转封面</Text>
                    </Flex>
                    <Switch checked={amllRotaryCover}
                            onCheckedChange={(e) => setAmllRotaryCoverFunc(e)}/>
                </Flex>
                : null}
            {amllTransCover && amllCircleCover ?
                <Flex direction="row" align="center" gap="4" my="2">
                    <Flex direction="column" flexGrow="1">
                        <Text as="div">仿真挖孔</Text>
                    </Flex>
                    <Switch checked={amllCenterHole}
                            onCheckedChange={(e) => setAmllCenterHoleFunc(e)}/>
                </Flex>
                : null}
            {amllTransCover && amllCircleCover && amllRotaryCover ?
                <Flex direction="row" align="center" gap="4" my="2">
                    <Flex direction="column" flexGrow="1">
                        <Text as="div">旋转周期</Text>
                    </Flex>
                    <TextField.Root type="number" value={amllRotaryCycle}
                                    onChange={(e) => setAmllRotaryCycleFunc(e.currentTarget.value)}/>
                    s
                </Flex>
                : null}
        </Card>
    </div>
}

export const amllRubyUsedAtom = atomWithStorage(
    "amllRubyUsedAtom",
    false
)

export const amllBgPaddingAtom = atomWithStorage(
    "amllBgPaddingAtom",
    false
)

export const amllAmbiguousControlAtom = atomWithStorage(
    "amllAmbiguousControlAtom",
    false
)

export const amllFixControlAtom = atomWithStorage(
    "amllFixControlAtom",
    false
)

export const amllRomaGapAtom = atomWithStorage(
    "amllRomaGapAtom",
    false
)

export const amllTransCoverAtom = atomWithStorage(
    "amllTransCoverAtom",
    false
)

export const amllCircleCoverAtom = atomWithStorage(
    "amllCircleCoverAtom",
    false
)

export const amllRotaryCoverAtom = atomWithStorage(
    "amllRotaryCoverAtom",
    false
)

export const amllCenterHoleAtom = atomWithStorage(
    "amllCenterHoleAtom",
    false
)

export const amllRotaryCycleAtom = atomWithStorage(
    "amllRotaryCycleAtom",
    "36"
)

export const amllRomanWordAtom = atomWithStorage(
    "amllRomanWordAtom",
    false
)

export const amllTopRomanAtom = atomWithStorage(
    "amllTopRomanAtom",
    false
)

export const amllHideRomanAtom = atomWithStorage(
    "amllHideRomanAtom",
    false
)

export const enableLyricSwapTransRomanLineAtom = atomWithStorage(
    "amll-react-full.enableLyricSwapTransRomanLineAtom",
    false,
);

export const amllPartPercentAtom = atomWithStorage(
    "amllPartPercentAtom",
    45
)

export const amllPlayBarAtom = atomWithStorage(
    "amllPlayBarAtom",
    false
)

export const amllExtraInfoAtom = atomWithStorage(
    "amllExtraInfoAtom",
    ""
)
