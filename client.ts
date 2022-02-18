/* eslint-disable @typescript-eslint/no-var-requires */
import * as http from "http";
import * as opentracing from "opentracing";
const shim = require("./shim").shim("http_client_opentracing");
// cross-env EXPORTER=jaeger ts-node server.ts
opentracing.initGlobalTracer(shim);
const tracer = opentracing.globalTracer();
function makeRequest() {
    const span = tracer.startSpan("make_request");

    const headers = {};
    // 传递tracing的上下文信息
    tracer.inject(span, opentracing.FORMAT_HTTP_HEADERS, headers);
    http.get({
        host: "localhost",
        port: 3000,
        path: "/",
        headers,
    }, (response) => {
        const body = [];
        response.on("data", (data) => {
            body.push(data);
        });
        response.on("end", () => {
            console.log(body.toString());
            span.finish();
            console.log('Sleeping 5 seconds before shutdown to ensure all records are flushed.');
            setTimeout(() => { console.log('Completed.'); }, 5000);
        });
    });
}
makeRequest();