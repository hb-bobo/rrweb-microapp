
import { useState, useEffect, useLayoutEffect, useRef, useCallback } from "preact/hooks";

import antdStyle from "./style/index.css";
// import triggerStyle from "rc-trigger/assets/index.css";

import appStyle from "./app.less";
import { useRecorder } from "./hooks/useRecorder";
import rrwebPlayer from 'rrweb-player'
import 'rrweb-player/dist/style.css'
interface Props {

}

export function App(props: Props) {

  const [recording, setRecording] = useState(false);

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

    setRecording(true);
  }

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

      <div className="box1">var(--red)   -- bug</div>
      <div className="box2">var(--color)</div>

      <button onClick={handleStart}>{recording ? 'stop' : 'start'}</button>

    </>
  );
}
