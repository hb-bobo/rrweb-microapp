import { record } from "rrweb";
import { eventWithTime } from "rrweb/typings/types";


let intervalTimer: number = 0;
let events: eventWithTime[] = [];
let stop: undefined | (() => void) = () => {};

function fomatterNumber(n: number) {
  return n < 10 ? `0${n}` : String(n);
}
function timer(callback: (t: string) => void) {
  if (intervalTimer) {
    clearInterval(intervalTimer);
  }
  let startTime = 0;
  callback('00:00:00');
  intervalTimer = window.setInterval(() => {
    startTime += 1000;
    let h = fomatterNumber(Math.floor(startTime / 60 / 60 / 1000));
    let m = fomatterNumber(Math.floor(startTime / 60 / 1000) % 60);
    let s = fomatterNumber(Math.floor((startTime / 1000) % 60));
    callback(`${h}:${m}:${s}`);
  }, 1000);
}
const originConsole = window.console
export function useRecorder() {

  const data = {
    getEevents: function () {
      return events;
    },
    ontimer: function (text: string) {},
    start: (abort: (msg: string) => void) => {
      events.splice(0, events.length);
      stop = record({
        emit(event) {
          if (events.length > 400) {
            // 当事件数量大于 400 时停止录制
            abort("tooLong");
            return;
          }
          // console.log(event.timestamp, {a: 1}, [{a: 1}], null)
          events.push(event);
        },
      });

      timer(data.ontimer);
    },
    stop: function () {
      if (stop) {
        stop();
      }
      clearInterval(intervalTimer);
    },
    clear: function () {
        events.splice(0, events.length);
    },
  };
  return data;
}
