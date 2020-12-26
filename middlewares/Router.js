
class Router {
    constructor() {
        this.stack = []
    }
    register(path,method,middleware) {
        let route = {path,method,middleware}
        this.stack.push(route)
    }
    get(path,middleware) {
        this.register(path,"get",middleware)
    }
    post(path,middleware) {
        this.register(path,"post",middleware)
    }
    routes() {
        let stock = this.stack
        let route 
        return async function(ctx,next) {
            for(let i = 0 ; i < stock.length ; i++) {
                if(ctx.url === stock[i].path && ctx.methods.indexOf(stock[i].method) >=0) {
                  route  = stock[i].middleware
                  break  
                }
            }
            if(typeof route === 'function') {
                route(ctx,next)
            }
           await next()
        }
    }
}
module.exports = Router