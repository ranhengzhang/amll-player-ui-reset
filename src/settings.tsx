import { atom, useAtom } from "jotai";
import {atomWithStorage} from "jotai/utils";
import {useEffect, type FC, PropsWithChildren} from "react";
import chalk from "chalk";
import {TextProps, Text, Flex, Switch, Card, Separator} from "@radix-ui/themes";

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