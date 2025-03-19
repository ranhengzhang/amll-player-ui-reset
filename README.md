# AMLL Player Ui Reset

> 更改AMLL Player的部分布局，主要用于兼容Ruby注音
>
> ```html
> <ruby><rt style="
> left: 左边距px;
> ">注音内容</rt></ruby>
> ```
>
> 注：$$\texttt{left}_{rt}=\texttt{padding-left}_{行}+\left(\sum^{n}_{i=0}\texttt{width}_{左边文字}\right) \divsymbol 2+\texttt{width}_{rt} \divsymbol 2$$

## 开始使用

### 下载已编译好的插件

前往 [Github Actions](../../actions) 页面，在最新编译中下载编译好的插件包，将插件解压至插件目录[^1]下。

### 自行编译插件

使用`git clone`命令将项目克隆至本地后，使用`pnpm i`安装需要的依赖包，接着使用以下命令**之一**编译至`dist`文件夹，移动到插件目录[^1]下。

```bash
pnpm build:dev # Build plugin with source map
pnpm build:src # Build minified plugin with source map
pnpm build # Build minified plugin without source map
```

[^1]: C:\Users\用户名\AppData\Roaming\net.stevexmh.amllplayer\extensions
