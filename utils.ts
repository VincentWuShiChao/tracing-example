/* eslint-disable @typescript-eslint/no-var-requires */
const http = require("http");
export async function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    })
}
export class RPCServer {
    private opentracing;
    private tracer;
    private prefix;
    constructor(opentracing, prefix) {
        this.opentracing = opentracing;
        this.tracer = this.opentracing.globalTracer();
        this.prefix = prefix;
    }
    startServer(port) {
        const server = http.createServer(async (req, res) => {
            const parentSpan = this.tracer.extract(this.opentracing.FORMAT_HTTP_HEADERS, req.headers);
            const span = this.tracer.startSpan(`${this.prefix}handle_request`, {
                childOf: parentSpan,
            });
            span.setTag("custom", "tag vale");
            span.setTag("alpha", "1000");
            await this.doSomething(span);
            res.writeHead(200, {
                "Content-Type": "application/json"
            });
            res.write(
                JSON.stringify({
                    status: "OK",
                    traceId: span.context().toTraceId(),
    
                })
            )
            res.end();
            span.finish();
        })
        server.listen(port, err => {
            if (err) throw err;
            console.log(`Server listening on ${port}`)
        })
    }
    async doSomething(parentSpan) {
        const span = this.tracer.startSpan(`${this.prefix}do_something`, {
            childOf: parentSpan
        });
        span.setTag("alpha", "200");
        span.setTag("beta", "50");
        span.log({
            message: 'Ok.'
        })
        await sleep(1000);
        span.finish();
    }
}