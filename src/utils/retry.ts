
export function retryPromise<C extends number, Fn extends ((...arg: any[]) => Promise<any>)>(count: C, promiseFn: Fn) {
    return new Promise((resolve, reject) => {
        let retryCount = count;
        const retryCallback = () => {
            promiseFn().then((result) => {
                if (result instanceof Error && retryCount > 0) {
                    retryCallback();
                    return;
                }
                resolve(result);
            }).catch((error) => {
                retryCount--;
                if (retryCount > 0) {
                    retryCallback();
                    return;
                }
                reject(error as Error);
            })
        }
        retryCallback();
    }) as  ReturnType<Fn>
}

