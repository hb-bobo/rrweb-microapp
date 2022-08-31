
import { useState, useEffect, useLayoutEffect, useRef, useCallback } from "preact/hooks";

import antdStyle from "./style/index.css";
// import triggerStyle from "rc-trigger/assets/index.css";

import appStyle from "./app.less";
import { useRecorder } from "./hooks/useRecorder";
import rrwebPlayer from 'rrweb-player'
import 'rrweb-player/dist/style.css'
interface Props {

  root: ShadowRoot | HTMLElement;

}

export function App(props: Props) {

  const [recording, setRecording] = useState(false);
  const [reportURL, setReportURL] = useState("");
  const elementRef = useRef<HTMLDivElement>(null);
  const recorder = useRecorder();

  useEffect(() => {
    const config = { attributes: true, childList: true, subtree: true };
    const callback = function(mutationsList: any[], observer: any) {
        // Use traditional 'for loops' for IE 11
        for(let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                console.log('A child node has been added or removed.');
            }
        }
    };
    const observer = new MutationObserver(callback);
    observer.observe(document.body, config);

  }, [])

  const handleStart = (e: MouseEvent) => {
    if (recording) {
      handleStopRecord();
      return;
    }
    recorder.start(() => {});
    setTimeout(() => {
      const link = document.createElement('link');
      link.rel = 'stylesheet'
      link.type = "text/css"
      link.href = '//activity.hdslb.com/blackboard/static/1d5c9c63ddd602617ed9a6ec73bebe8f/test.css'
      props.root.appendChild(link);
    }, 200);
    setRecording(true);
  }
  const styleStr = `
    p {
      color: red;
    }
  `
  const handleStopRecord = async () => {
    recorder.stop();
    setRecording(false);
    const c = document.getElementById('rr-web')
    if (c) {
      new rrwebPlayer({
        target: c, // customizable root element
        props: {
          events: recorder.getEevents() as any[],
        },
      })
    }

  };
  return (
    <>
      <style>{antdStyle}</style>
      <style>{appStyle}</style>
      <style> {styleStr}</style>
      <p>Test text, from red to blue color</p>
      <button onClick={handleStart}>{recording ? 'stop' : 'start'}</button>

    </>
  );
}
