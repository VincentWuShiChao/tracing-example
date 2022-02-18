"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RPCServer = exports.sleep = void 0;
/* eslint-disable @typescript-eslint/no-var-requires */
const http = require("http");
async function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}
exports.sleep = sleep;
class RPCServer {
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
            res.write(JSON.stringify({
                status: "OK",
                traceId: span.context().toTraceId(),
            }));
            res.end();
            span.finish();
        });
        server.listen(port, err => {
            if (err)
                throw err;
            console.log(`Server listening on ${port}`);
        });
    }
    async doSomething(parentSpan) {
        const span = this.tracer.startSpan(`${this.prefix}do_something`, {
            childOf: parentSpan
        });
        span.setTag("alpha", "200");
        span.setTag("beta", "50");
        span.log({
            state: 'waiting'
        });
        await sleep(1000);
        span.finish();
    }
}
exports.RPCServer = RPCServer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi91dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx1REFBdUQ7QUFDdkQsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3RCLEtBQUssVUFBVSxLQUFLLENBQUMsRUFBRTtJQUMxQixPQUFPLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ3pCLFVBQVUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDNUIsQ0FBQyxDQUFDLENBQUE7QUFDTixDQUFDO0FBSkQsc0JBSUM7QUFDRCxNQUFhLFNBQVM7SUFJbEIsWUFBWSxXQUFXLEVBQUUsTUFBTTtRQUMzQixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDOUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDekIsQ0FBQztJQUNELFdBQVcsQ0FBQyxJQUFJO1FBQ1osTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO1lBQ2hELE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsbUJBQW1CLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzFGLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sZ0JBQWdCLEVBQUU7Z0JBQy9ELE9BQU8sRUFBRSxVQUFVO2FBQ3RCLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQzdCLE1BQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM3QixHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtnQkFDZixjQUFjLEVBQUUsa0JBQWtCO2FBQ3JDLENBQUMsQ0FBQztZQUNILEdBQUcsQ0FBQyxLQUFLLENBQ0wsSUFBSSxDQUFDLFNBQVMsQ0FBQztnQkFDWCxNQUFNLEVBQUUsSUFBSTtnQkFDWixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLFNBQVMsRUFBRTthQUV0QyxDQUFDLENBQ0wsQ0FBQTtZQUNELEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUNWLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNsQixDQUFDLENBQUMsQ0FBQTtRQUNGLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxFQUFFO1lBQ3RCLElBQUksR0FBRztnQkFBRSxNQUFNLEdBQUcsQ0FBQztZQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixJQUFJLEVBQUUsQ0FBQyxDQUFBO1FBQzlDLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUNELEtBQUssQ0FBQyxXQUFXLENBQUMsVUFBVTtRQUN4QixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLGNBQWMsRUFBRTtZQUM3RCxPQUFPLEVBQUUsVUFBVTtTQUN0QixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM1QixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMxQixJQUFJLENBQUMsR0FBRyxDQUFDO1lBQ0wsS0FBSyxFQUFFLFNBQVM7U0FDbkIsQ0FBQyxDQUFBO1FBQ0YsTUFBTSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2xCLENBQUM7Q0FDSjtBQWhERCw4QkFnREMifQ==