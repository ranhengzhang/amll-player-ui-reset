import { atom, useAtom } from "jotai";
import {atomWithStorage} from "jotai/utils";
import {useEffect, type FC, PropsWithChildren} from "react";
import chalk from "chalk";
import {TextProps, Text, Flex, Switch, Card, Separator, TextField, Slider, TextArea} from "@radix-ui/themes";

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
    const [amllPartPercent, setAmllPartPercent] = useAtom(amllPartPercentAtom)
    const [amllPlayBar, setAmllPlayBar] = useAtom(amllPlayBarAtom)
    const [amllExtraInfo, setAmllExtraInfo] = useAtom(amllExtraInfoAtom)
    const [amllFixStyle, setAmllFixStyle] = useAtom(amllFixStyleAtom)
    const [amllUserCss, setAmllUserCss] = useAtom(amllUserCssAtom)
    const [amllLyricMode, setAmllLyricMode] = useAtom(amllLyricModeAtom)
    const [amllAlignCenter, setAmllAlignCenter] = useAtom(amllAlignCenterAtom)

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
                        onCheckedChange={(e) => setAmllAmbiguousControl(e)}/>
            </Flex>
            <Flex direction="row" align="center" gap="4" my="2">
                <Flex direction="column" flexGrow="1">
                    <Text as="div">修复「取消弹簧动画」时样式丢失<br/>(解决方法来自 Linho1219)</Text>
                </Flex>
                <Switch checked={amllFixStyle}
                        onCheckedChange={(e) => setAmllFixStyle(e)}/>
            </Flex>
            <Flex direction="row" align="center" gap="4" my="2">
                <Flex direction="column" flexGrow="1">
                    <Text as="div">播放条置顶</Text>
                </Flex>
                <Switch checked={amllPlayBar}
                        onCheckedChange={(e) => setAmllPlayBar(e)}/>
            </Flex>
            <Flex direction="row" align="center" gap="4" my="2">
                <Flex direction="column" flexGrow="1">
                    <Text as="div">沉浸式歌词</Text>
                </Flex>
                <Switch checked={amllLyricMode}
                        onCheckedChange={(e) => setAmllLyricMode(e)}/>
            </Flex>
            <Flex direction="row" align="center" gap="4" my="2">
                <Flex direction="column" flexGrow="1">
                    <Text as="div">没有对唱时居中对齐</Text>
                </Flex>
                <Switch checked={amllAlignCenter}
                        onCheckedChange={(e) => setAmllAlignCenter(e)}/>
            </Flex>
            <Separator my="3" size="4" />
            <Flex direction="row" align="center" gap="4" my="2">
                <Flex direction="column" flexGrow="1">
                    <Text as="div">专辑信息和歌词部分占比</Text>
                </Flex>
                <Slider defaultValue={[amllPartPercent]}
                        onValueChange={(e) => setAmllPartPercent(e[0])}/>
                {amllPartPercent}
            </Flex>
            <Flex direction="row" align="center" gap="4" my="2">
                <Flex direction="column" flexGrow="1">
                    <Text as="div">对齐歌词边距</Text>
                </Flex>
                <Switch checked={amllBgPadding}
                        onCheckedChange={(e) => setAmllBgPadding(e)}/>
            </Flex>
            <Flex direction="row" align="center" gap="4" my="2">
                <Flex direction="column" flexGrow="1">
                    <Text as="div">固定关闭按钮</Text>
                </Flex>
                <Switch checked={amllFixControl}
                        onCheckedChange={(e) => setAmllFixControl(e)}/>
            </Flex>
            <Flex direction="row" align="center" gap="4" my="2">
                <Flex direction="column" flexGrow="1">
                    <Text as="div">逐字音译间距</Text>
                </Flex>
                <Switch checked={amllRomaGap}
                        onCheckedChange={(e) => setAmllRomaGap(e)}/>
            </Flex>
            <Flex direction="row" align="center" gap="4" my="2">
                <Flex direction="column" flexGrow="1">
                    <Text as="div">逐字音译时隐藏行音译</Text>
                </Flex>
                <Switch checked={amllHideRoman}
                        onCheckedChange={(e) => setAmllHideRoman(e)}/>
            </Flex>
            <Flex direction="row" align="center" gap="4" my="2">
                <Flex direction="column" flexGrow="1">
                    <Text as="div">逐字音译对齐</Text>
                </Flex>
                <Switch checked={amllRomanWord}
                        onCheckedChange={(e) => setAmllRomanWord(e)}/>
            </Flex>
            {amllRomanWord ?
                <Flex direction="row" align="center" gap="4" my="2">
                    <Flex direction="column" flexGrow="1">
                        <Text as="div">逐字音译居上</Text>
                    </Flex>
                    <Switch checked={amllTopRoman}
                            onCheckedChange={(e) => setAmllTopRoman(e)}/>
                </Flex>
                : null}
            <Flex direction="row" align="center" gap="4" my="2">
                <Flex direction="column" flexGrow="1">
                    <Text as="div">歌词页额外信息</Text>
                </Flex>
                <TextField.Root value={amllExtraInfo}
                                onChange={(e) => setAmllExtraInfo(e.currentTarget.value)}/>
            </Flex>
        </Card>
        <SubTitle>专辑封面</SubTitle>
        <Card mt="2">
            <Flex direction="row" align="center" gap="4" my="2">
                <Flex direction="column" flexGrow="1">
                    <Text as="div">透明底</Text>
                </Flex>
                <Switch checked={amllTransCover}
                        onCheckedChange={(e) => setAmllTransCover(e)}/>
            </Flex>
            {amllTransCover ?
                <>
                    <Flex direction="row" align="center" gap="4" my="2">
                        <Flex direction="column" flexGrow="1">
                            <Text as="div">圆形封面</Text>
                        </Flex>
                        <Switch checked={amllCircleCover}
                                onCheckedChange={(e) => setAmllCircleCover(e)}/>
                    </Flex>
                {amllCircleCover ?
                    <>
                        <Flex direction="row" align="center" gap="4" my="2">
                            <Flex direction="column" flexGrow="1">
                                <Text as="div">仿真挖孔</Text>
                            </Flex>
                            <Switch checked={amllCenterHole}
                                    onCheckedChange={(e) => setAmllCenterHole(e)}/>
                        </Flex>
                        <Flex direction="row" align="center" gap="4" my="2">
                            <Flex direction="column" flexGrow="1">
                                <Text as="div">旋转封面</Text>
                            </Flex>
                            <Switch checked={amllRotaryCover}
                                onCheckedChange={(e) => setAmllRotaryCover(e)}/>
                        </Flex>
                        {amllRotaryCover ?
                            <Flex direction="row" align="center" gap="4" my="2">
                                <Flex direction="column" flexGrow="1">
                                    <Text as="div">旋转周期</Text>
                                </Flex>
                                <TextField.Root type="number" value={amllRotaryCycle}
                                                onChange={(e) => setAmllRotaryCycle(e.currentTarget.value)}/>
                                s
                            </Flex>
                            : null}
                    </>
                    : null}
            </>
            : null}
        </Card>
        <SubTitle>自定义 CSS</SubTitle>
        <Card mt="2">
            <TextArea resize="vertical" value={amllUserCss} placeholder="请输入自定义CSS"
                      onChange={(e) => setAmllUserCss(e.currentTarget.value)}/>
        </Card>
    </div>
}

export const amllBgPaddingAtom = atomWithStorage(
    "amllBgPaddingAtom",
    false
)

export const amllAmbiguousControlAtom = atomWithStorage(
    "amllAmbiguousControlAtom",
    false
)

export const amllFixStyleAtom = atomWithStorage(
    "amllFixStyleAtom",
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

export const amllUserCssAtom = atomWithStorage(
    "amllUserCssAtom",
    ""
)

export const amllLyricModeAtom = atomWithStorage(
    "amllLyricModeAtom",
    false
)

export const amllAlignCenterAtom = atomWithStorage(
    "amllAlignCenterAtom",
    false
)
