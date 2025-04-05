# react native 模版

## 依赖

- openjdk 17
- expo sdk 52
- react native 0.77

> 不支持 expo go <https://expo.dev/changelog/2025/01-21-react-native-0.77>

## vscode remote 打开 devtools

1. 从 `<remote_ip>:8081/json` 找到 `devtoolsFrontendUrl` 末尾 `encode` 后的 `webSocketDebuggerUrl`
2. 用浏览器打开 `http://<remote_ip>:8081/debugger-frontend/rn_fusebox.html?<encode_webSocketDebuggerUrl>`
