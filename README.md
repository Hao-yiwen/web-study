# web-study

[![React 18](https://img.shields.io/badge/react-18-149eca)](https://react.dev/)
[![Create React App 5.0.1](https://img.shields.io/badge/create--react--app-5.0.1-09d3ac)](https://github.com/facebook/create-react-app)
[![Node 22 verified](https://img.shields.io/badge/node-22.x%20verified-339933)](#本次验证)

个人 Web 前端学习记录。仓库里是一组互相独立的小示例，用来试 Bootstrap、CSS Modules、浏览器原生 ES Module，以及 `react-reconciler` 自定义渲染器。这里没有可发布的完整应用，也没有仓库根目录的 `package.json`。

## 内容一览

| 目录 | 实际内容 |
| --- | --- |
| [`cra-demo`](./cra-demo) | Create React App 页面，在入口引入 Bootstrap 5 样式，渲染邮箱输入框、多行文本和 Primary 按钮。 |
| [`css-module-test`](./css-module-test) | 同一页面里同时使用 CSS Modules（`App.module.scss`）和 styled-components。 |
| [`esmodule-browser`](./esmodule-browser) | 无构建步骤的静态页，用 `<script type="module">` 在浏览器里加载本地 ES Module。 |
| [`react-reconciler-test`](./react-reconciler-test) | 写了一个最小自定义渲染器；当前入口仍用 `react-dom` 的 `ReactDOM.render` 挂载计数器页面。 |
| [`react-reconciler-native-test`](./react-reconciler-native-test) | 用自定义渲染器把 `View` / `Text` 画到 DOM 上，宿主节点统一创建为 `div`。 |

## 技术栈

四个 React 示例都由 Create React App 脚手架生成，脚本都是 `start` / `build` / `test` / `eject`。`esmodule-browser` 只有三个静态文件，不安装依赖。

| 项目 | 依赖（`package.json` 范围） | 本次实际安装到的版本 |
| --- | --- | --- |
| `cra-demo` | `react` / `react-dom` `^18.2.0`，`react-scripts` `5.0.1`，`bootstrap` `^5.3.3` | pnpm lock：React 18.2.0、Bootstrap 5.3.3、react-scripts 5.0.1 |
| `css-module-test` | React `^18.2.0`，`react-scripts` `5.0.1`，`sass` `^1.71.1`，`styled-components` `^6.1.8` | Yarn lock：React 18.3.1、sass 1.77.8、styled-components 6.1.11 |
| `react-reconciler-test` | React `^18.3.1`，`react-scripts` `5.0.1`，`react-reconciler` `^0.29.2` | Yarn lock：React 18.3.1、react-reconciler 0.29.2 |
| `react-reconciler-native-test` | 与上一行相同 | 与上一行相同 |

锁文件并不统一：

- `cra-demo` 只有 `pnpm-lock.yaml`（`lockfileVersion: 6.0`），并在 `.npmrc` 里把 registry 指到 `https://registry.npmjs.org/`。
- 另外三个项目同时有 `package-lock.json` 和 `yarn.lock`。`react-reconciler` 写在 `package.json` 和 `yarn.lock`（0.29.2）里，两份 `package-lock.json` 的依赖列表没有这一项。
- `css-module-test/package-lock.json` 的下载地址是 `registry.npm.release.ctripcorp.com`，和 `yarn.lock` 里的公共源、解析版本都不一样。按下面的 Yarn 命令安装，不依赖那份 lock。

## 目录结构

```text
.
├── cra-demo/                  # Bootstrap + CRA
│   ├── src/index.js           # 引入 bootstrap.min.css
│   └── src/App.js             # 表单和按钮
├── css-module-test/
│   ├── src/App.js             # CSS Modules + styled.button
│   └── src/App.module.scss    # .text { color: red }
├── esmodule-browser/
│   ├── test.html              # type="module" 入口
│   ├── main.js                # import { add } from './math.js'
│   └── math.js                # 改写 #testid，并返回 a + b
├── react-reconciler-test/
│   ├── src/index.js           # 当前使用 ReactDOM.render
│   ├── src/App.js             # 计数器，以及 <view>/<text>
│   └── src/myCustomRenderer.js
├── react-reconciler-native-test/
│   ├── src/index.js           # 调用自定义 render
│   ├── src/View.jsx
│   ├── src/Text.jsx
│   └── src/myReactNativeWebRenderer.js
├── .vscode/launch.json        # Chrome 调试 http://localhost:3000
└── README.md
```

各 CRA 目录里还留着脚手架的 `public/`、`src/logo.svg`、`reportWebVitals.js`、`setupTests.js`。仓库里的图片都是这些默认资源，没有单独的界面截图。

## 环境要求

- Node.js。本次在 **Node v22.23.4**、npm 10.9.9 上跑通安装、开发和生产构建。
- `cra-demo` 需要 **pnpm 8**。本机自带的 pnpm 10.33.4 会拒绝这份 lockfile（`ERR_PNPM_LOCKFILE_BREAKING_CHANGE`）。下面用 Corepack 切到 pnpm 8.15.8。
- 其余三个 CRA 项目用 **Yarn 1.22.22**：`yarn install --frozen-lockfile` 已在本环境成功。
- 浏览器。调试配置见 `.vscode/launch.json`（Chrome，`http://localhost:3000`，`webRoot` 为仓库根目录）。

四个项目的 `src/App.test.js` 仍是脚手架用例，断言页面上有 “learn react”。现有页面都没有这句文案，`npm test` / `yarn test` 会失败。`css-module-test` 已实际跑过，结果为 1 个测试失败。

`react-scripts` 在 `CI=true` 时把 ESLint warning 当成错误。未设置 `CI` 时，四个项目的 `build` 都成功；设置 `CI=true` 后，只有 `css-module-test` 能过，另外三个会停在 warning 上（未使用变量、`==`、匿名默认导出等）。

## 安装与运行

每个示例单独进入目录。开发服务器默认 <http://localhost:3000>，同时开多个时用 `PORT` 错开。

### cra-demo

```bash
cd cra-demo
corepack prepare pnpm@8.15.8 --activate
pnpm install --frozen-lockfile
pnpm start
```

`src/index.js` 引入 `bootstrap/dist/css/bootstrap.min.css`。页面是一个邮箱输入框、一个 textarea 和一个 “Primary” 按钮，JSX 里写的是 `class` / `for`。生产构建渲染结果里，这些属性会落到 DOM 上（`class="form-control"`、`class="btn btn-primary"` 等）。

```bash
pnpm build    # 未设置 CI 时成功，并提示 logo 未使用
```

### css-module-test

```bash
cd css-module-test
yarn install --frozen-lockfile
yarn start
```

页面上有两块内容：

- `<div className={Style.text}>hello css module</div>`，样式来自 `App.module.scss` 的 `.text { color: red }`。生产构建后类名形如 `App_text__KxieM`。
- `styled.button` 生成的按钮，文字是 “按钮”，颜色为红色。

```bash
yarn build    # 本次在 CI=true 下也编译成功
```

### esmodule-browser

不需要安装依赖。用 HTTP 打开，避免 `file://` 拦截 ES Module。

```bash
cd esmodule-browser
python3 -m http.server 8080
```

浏览器打开 <http://127.0.0.1:8080/test.html>。

`test.html` 以 `type="module"` 加载 `main.js`，`main.js` 调用 `add(2, 3)`。`math.js` 把 `#testid` 设成 `Hello World`，并返回两数之和，结果打印到控制台。本次用无头浏览器打开后，`#testid` 的文本是 `Hello World`。

同一份 HTML 的 `<head>` 里还有一段普通脚本，它在 `<body>` 解析前执行 `document.getElementById('textdsad')`。此时元素还不存在，脚本会抛错，所以 `<textdsadas id="textdsad">` 保持初始文字 `213213`。`<view>` 和 `<textdsadas>` 是页面自定义的标签名，样式写在 `test.html` 的元素选择器里。

### react-reconciler-test

```bash
cd react-reconciler-test
yarn install --frozen-lockfile
yarn start
```

当前 `src/index.js` 用的是：

```js
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
```

因此页面由 ReactDOM 渲染：旋转 logo、“Welcome to React”、从 0 开始的 `+` / `-` 计数器，以及未知 HTML 标签 `<view>` / `<text>`（红底、绿字 `213123`）。`MyCustomRenderer.render(...)` 在入口里是注释。

`src/myCustomRenderer.js` 用 `react-reconciler` 0.29 实现了一个最小 host config：按类型 `document.createElement`，处理字符串子节点、`className`、`onClick`，并在 `commitUpdate` 里更新属性。要看到它的效果，需要自己把入口改成调用这个 `render`。

请用 Yarn 安装。`package-lock.json` 没有锁定 `react-reconciler`，`npm ci` 不会装上 `myCustomRenderer.js` 的依赖。

`yarn build` 在未设置 `CI` 时成功。`CI=true` 时会因 ESLint warning 失败，其中包括重复的 `alignItems`、未使用的 `MyCustomRenderer`、`==` 和匿名默认导出。

### react-reconciler-native-test

```bash
cd react-reconciler-native-test
yarn install --frozen-lockfile
yarn start
```

`src/index.js` 直接调用 `myReactNativeWebRenderer.render(<App />, document.getElementById("root"))`。`View` 渲染 `<view>`，并把 `display: flex`、`flexDirection: column` 和传入的 `style` 合并；`Text` 渲染 `<text>`。

渲染器里的 `createInstance` 忽略宿主类型，一律 `document.createElement('div')`。`style` 会从驼峰转成内联样式字符串；`height` 还会多写一份相同数值的 `line-height`。生产构建的 DOM 是两层 `div`，文字为 “Hello React Native Custom Renderer”，外层样式包含 `background-color: #8BBDD9`、`height: 400`、`line-height: 400`（数值没有 `px`）。

`commitUpdate`、`commitTextUpdate`、`removeChild` 是空函数，这个示例也没有后续更新。`traceWrap` 写好了，但没有包到实际使用的 `hostConfig` 上。当宿主类型不是 `text`、子节点里却出现裸字符串时，`createInstance` 会抛出 `Text strings must be rendered within a <Text> component.`

同样用 Yarn 安装。`yarn build` 在未设置 `CI` 时成功；`CI=true` 时会被未使用的 `traceWrap`、`==` 和匿名默认导出拦住。

## 本次验证

环境：Node v22.23.4、npm 10.9.9、Yarn 1.22.22、pnpm 8.15.8（经 Corepack）、Python 3.12.3。

| 步骤 | 结果 |
| --- | --- |
| `cra-demo`：`pnpm install --frozen-lockfile`、`pnpm start`、`pnpm build` | 安装成功。开发服务器编译完成，有 `logo` 未使用的 warning。未设置 `CI` 的生产构建成功；`CI=true pnpm build` 因该 warning 失败。 |
| `css-module-test`：`yarn install --frozen-lockfile`、`yarn start`、`CI=true yarn build`、`CI=true yarn test --watchAll=false` | 开发服务器编译成功。生产构建成功。测试失败，找不到 “learn react”。 |
| `react-reconciler-test`、`react-reconciler-native-test`：`yarn install --frozen-lockfile`、`yarn start`、`yarn build` | 安装成功。开发服务器均编译完成并带有 ESLint warning。未设置 `CI` 的生产构建成功；`CI=true` 的生产构建失败。 |
| 四个生产构建 + `esmodule-browser` 用无头 Chrome 打开 | DOM 与上面各节描述一致。`esmodule-browser` 的 `test.html`、`main.js`、`math.js` 经 `python3 -m http.server` 返回 200。 |
| `css-module-test` 的 `npm install` | 本次未成功，npm 报 `Exit handler never called!`。文档中的安装命令以已跑通的 Yarn 为准。 |
| pnpm 10.33.4 读取 `cra-demo/pnpm-lock.yaml` | 失败，需改用 pnpm 8。 |

## 参考

- `react-reconciler-test` 原说明引用的自定义渲染器文章：<https://agent-hunt.medium.com/hello-world-custom-react-renderer-9a95b7cd04bc>
- Create React App：<https://create-react-app.dev/>
- `react-reconciler`：<https://github.com/facebook/react/tree/main/packages/react-reconciler>
