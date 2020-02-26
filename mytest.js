function sleep() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        },2000)
    })
}

async function fn1(next) {
    console.log(fn1);
    setTimeout(() => {
        console.log("fn1-settimeout");
    })
    await next()
    console.log("end fn1");
}

async function fn2(next) {
    console.log("fn2")
    await sleep()
    await next()
    console.log("end fn2")

}
async function fn3(next) {
    console.log("fn3")
}

function composeAsync(mids) {
    return function () {
        return dispatch(0)
        function dispatch(i) {
            let fn = mids[i]
            if(!fn) {
                return Promise.resolve()
            }
                return Promise.resolve(fn(function next() {
                    return dispatch(i+1)
                }))
          
        }
    }
}

composeAsync([fn1,fn2,fn3])().then(() => console.log("task over"))