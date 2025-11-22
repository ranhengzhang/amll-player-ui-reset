import { atom, useAtom } from "jotai";
import {atomWithStorage} from "jotai/utils";
import {useEffect, type FC, PropsWithChildren} from "react";
import chalk from "chalk";
import {TextProps, Text, Flex, Switch, Card, Separator, TextField} from "@radix-ui/themes";
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
                styleElement.innerHTML = [`
div[class*="_cover_"] {
    transform: perspective(0);
}
                
div[class*="_coverInner"] {
    background-color: transparent !important;
}
                `, circle_cover ? `
div[class*="_coverInner"]:has(> div[class*="_coverInner"]) {
    border-radius: 50% !important;
}
                ` : '', circle_cover && rotary_cover ? `
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
    animation: rotate ${parseFloat(rotary_cycle) || 36}s linear infinite;
    animation-play-state: paused;
}

#amll-lyric-player:has(path[d="M8.46953 37C7.37801 37 6.56603 36.7271 6.03359 36.1814C5.51445 35.6489 5.25488 34.8502 5.25488 33.7854V4.21464C5.25488 3.14975 5.52111 2.35108 6.05355 1.81864C6.59931 1.27288 7.40463 1 8.46953 1H13.3813C14.4329 1 15.2249 1.27288 15.7574 1.81864C16.3031 2.35108 16.576 3.14975 16.576 4.21464V33.7854C16.576 34.8502 16.3031 35.6489 15.7574 36.1814C15.2249 36.7271 14.4329 37 13.3813 37H8.46953ZM24.6426 37C23.5644 37 22.759 36.7271 22.2266 36.1814C21.6942 35.6489 21.4279 34.8502 21.4279 33.7854V4.21464C21.4279 3.14975 21.6942 2.35108 22.2266 1.81864C22.7724 1.27288 23.5777 1 24.6426 1H29.5544C30.6193 1 31.4179 1.27288 31.9504 1.81864C32.4828 2.35108 32.7491 3.14975 32.7491 4.21464V33.7854C32.7491 34.8502 32.4828 35.6489 31.9504 36.1814C31.4179 36.7271 30.6193 37 29.5544 37H24.6426Z"]) div[class*="_coverInner"] > div[class*="_coverInner"] {
    /* 旋转动画 */
    animation-play-state: running;
}
                ` : '', circle_cover && center_hole ? `
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
                ` : ''].join("\n")
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

    function setAmllRomanWordFunc(fix: boolean) {
        setAmllRomanWord(fix);

        // 创建一个 <style> 标签，并为其设置 id
        let styleElement = document.getElementById('roman_word');
        if (fix) {
            if (!styleElement) {
                styleElement = document.createElement('style');
                // 将 <style> 标签添加到 head 中
                document.head.appendChild(styleElement);
            }
            styleElement.id = 'roman_word';  // 设置 id
            styleElement.innerHTML = `
div[class*="_lyricMainLine"] span[style^="mask-image"]:has(> div[class*="_romanWord"]) {
    display: inline-flex;
    flex-direction: column;
}
            `;
            consoleLog("INFO", "extend", "修复无音译音节下沉");
        } else {
            if (styleElement) {
                document.head.removeChild(styleElement);
            }
            consoleLog("INFO", "extend", "取消修复无音译音节下沉");
        }
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
            <Separator my="3" size="4" />
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
                    <Text as="div">逐字音译对齐</Text>
                </Flex>
                <Switch checked={amllRomanWord}
                        onCheckedChange={(e) => setAmllRomanWordFunc(e)}/>
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
            {amllCircleCover ?
                <Flex direction="row" align="center" gap="4" my="2">
                    <Flex direction="column" flexGrow="1">
                        <Text as="div">旋转封面</Text>
                    </Flex>
                    <Switch checked={amllRotaryCover}
                            onCheckedChange={(e) => setAmllRotaryCoverFunc(e)}/>
                </Flex>
                : null}
            {amllCircleCover ?
                <Flex direction="row" align="center" gap="4" my="2">
                    <Flex direction="column" flexGrow="1">
                        <Text as="div">仿真挖孔</Text>
                    </Flex>
                    <Switch checked={amllCenterHole}
                            onCheckedChange={(e) => setAmllCenterHoleFunc(e)}/>
                </Flex>
                : null}
            {amllCircleCover ?
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
