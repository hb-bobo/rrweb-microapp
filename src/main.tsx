// import "preact/debug";
import { render } from "preact";
import { App } from "./app";

class TianshuFeedback extends HTMLElement {
  constructor() {
    super();
  }
}
// 兼容hmr
if (!window.customElements.get("ts-feedback")) {
  window.customElements.define("ts-feedback", TianshuFeedback);
}

// 天枢 预览时使用script id = feedback-sdk-preview
const previewScript = document.head.querySelector("#feedback-sdk-preview");

// 兼容hmr
let container = document.getElementById("tianshu_feedback_container");

if (container == null && previewScript === null) {
  container = document.createElement("ts-feedback");
  container.id = "tianshu_feedback_container";

  document.body.insertBefore(container, document.body.children[0]);
  container.style.zIndex = "9999";
}

render(<App root={container as any}></App>, container as HTMLDivElement);
