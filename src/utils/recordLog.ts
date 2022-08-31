export interface LogData {
    type: string;
    data: any;
    time: number;
}
const originConsole = window.console;
const logList: LogData[] = []
// window.addEventListener('error', handleError)
// window.addEventListener('unhandledrejection', unhandledrejection)
export function createLogRecorder () {
    function startHook() {
        const hookConsole: typeof window.console = {
            Console: originConsole.Console,
            assert: function (condition?: boolean, ...data: any[]) {
                logList.push({
                    type: 'assert',
                    data: [condition, ...data],
                    time: Date.now(),
                })
                return originConsole.assert(condition, ...data)
            },
            clear: originConsole.clear,
            count: originConsole.count,
            countReset: originConsole.countReset,
            debug: function (...data: any[]) {
                logList.push({
                    type: 'debug',
                    data: data,
                    time: Date.now(),
                })
                return originConsole.debug(...data)
            },
            dir: originConsole.dir,
            dirxml: originConsole.dirxml,
            error: function (...data: any[]) {
                logList.push({
                    type: 'error',
                    data: data,
                    time: Date.now(),
                })
                return originConsole.error(...data)
            },
            group: originConsole.group,
            groupCollapsed: originConsole.groupCollapsed,
            groupEnd: originConsole.groupEnd,
            info: function (...data: any[]) {
                logList.push({
                    type: 'info',
                    data: data,
                    time: Date.now(),
                })
                return originConsole.info(...data)
            },
            log: function (...data: any[]) {
                logList.push({
                    type: 'log',
                    data: data,
                    time: Date.now(),
                })
                return originConsole.log(...data)
            },
            profile: originConsole.profile,
            profileEnd: originConsole.profileEnd,
            table: originConsole.table,
            time: originConsole.time,
            timeEnd: originConsole.timeEnd,
            timeLog: originConsole.timeLog,
            timeStamp: originConsole.timeStamp,
            trace: originConsole.trace,
            warn: function (...data: any[]) {
                logList.push({
                    type: 'log',
                    data: data,
                    time: Date.now(),
                })
                return originConsole.warn(...data)
            }
        }
        window.console = hookConsole
        window.addEventListener('error', handleError)
        window.addEventListener('unhandledrejection', unhandledrejection)
    }

    return {
        start: startHook,
        end: () => {
            window.removeEventListener('error', handleError)
            window.removeEventListener('unhandledrejection', unhandledrejection)
            window.console = originConsole
            logList.slice(0, logList.length)
        },
        getLogs: () => {
            return logList
        }
    }
}
function handleError(ev: ErrorEvent) {
    const target = ev.target as  null | HTMLScriptElement | HTMLAnchorElement
    if (target && ((target as HTMLScriptElement).src || (target as HTMLAnchorElement).href)) {
        logList.push({
            type: 'error',
            data: {
                type: "error", //resource
                filename: (target as HTMLScriptElement).src || (target as HTMLAnchorElement).href, //加载失败的资源
                tagName: target.tagName, //标签名
                timeStamp: ev.timeStamp, //时间
            },
            time: Date.now(),
        })
    } else {
        logList.push({
            type: 'error',
            data: {
                type: "error", //resource
                message: ev.message, //报错信息
                filename: ev.filename, //报错链接
                position: (ev.lineno || 0) + ":" + (ev.colno || 0), //行列号
                stack: ev.error ? ev.error.stack : '', //错误堆栈
            },
            time: Date.now(),
        })
    }
}
function unhandledrejection(event: PromiseRejectionEvent) {
    let message = "";
    let line = 0;
    let column = 0;
    let file = "";
    let stack = "";
    if (typeof event.reason === "string") {
      message = event.reason;
    } else if (typeof event.reason === "object") {
      message = event.reason.message;
    }
    let reason = event.reason;
    if (typeof reason === "object") {
      if (reason.stack) {
        var matchResult = reason.stack.match(/at\s+(.+):(\d+):(\d+)/);
        if (matchResult) {
          file = matchResult[1];
          line = matchResult[2];
          column = matchResult[3];
        }
        stack = reason.stack;
      }
    }
    logList.push({
        type: 'error',
        data: {
            type: "error", //resource
            message: message,
            filename: file,
            position: line + ":" + column, //行列
            stack: stack //错误堆栈
        },
        time: Date.now(),
    })
}
export {}