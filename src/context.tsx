import { useEffect, type FC } from "react";
import {amllAmbiguousControlAtom, amllRubyUsedAtom, consoleLog} from "./settings";

export const ExtensionContext: FC = () => {
    useEffect(() => {
        console.log("extension context has been mounted");
    }, []);

    useEffect(() => {
        const storedRubyUsedAtom = localStorage.getItem('amllRubyUsedAtom');
        consoleLog('INFO', 'context', "storedRubyUsedAtom: " + storedRubyUsedAtom);
        if (storedRubyUsedAtom) {
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

        const storedAmbiguousControlAtom = localStorage.getItem('amllAmbiguousControlAtom');
        consoleLog('INFO', 'context', "storedAmbiguousControlAtom: " + storedAmbiguousControlAtom);
        if (storedAmbiguousControlAtom) {
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
    }, []);

    return null;
}