/* eslint-disable @typescript-eslint/no-var-requires */
const http = require("http");

const opentracing = require('opentracing');

const shim = require("./shim").shim("http_server_opentracing");
opentracing.initGlobalTracer(shim);
const tracer = opentracing.globalTracer();

import * as utils from "./utils";

// cross-env EXPORTER=jaeger node ./server.js

function startServer(port) {
    const server = http.createServer(async (req, res) => {
        const parentSpan = tracer.extract(opentracing.FORMAT_HTTP_HEADERS, req.headers);
        const span = tracer.startSpan("handle_request", {
            childOf: parentSpan,
        });
        // span.setTag("custom", "tag vale");
        // span.setTag("alpha", "1000");
        await doSomething(req, span);
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
async function doSomething(req, parentSpan) {
    const span = tracer.startSpan("do_something", {
        childOf: parentSpan
    });
    span.setTag("alpha", "200");
    span.setTag("beta", "50");
    span.setTag("error", true);
    span.log({
        state: 'waiting'
    })
    await utils.sleep(1000);
    console.log("request rpc 1");
    const headers = {};
    tracer.inject(span, opentracing.FORMAT_HTTP_HEADERS, headers);
    http.get({
        host: "localhost",
        port: 3001,
        path: "/",
        headers,
    }, (response) => {
        const body = [];
        response.on("data", (data) => {
            body.push(data);
        });
        response.on("end", () => {
            console.log(body.toString());
            console.log('rpc-1 finished');

            console.log("request rpc 2");
            http.get({
                host: "localhost",
                port: 3002,
                path: "/",
                headers
            }, (response) => {
                const body = [];
                response.on("data", (data) => {
                    body.push(data);
                });
                response.on("end", () => {
                    console.log(body.toString());
                    span.finish();
                    console.log('rpc-2 finished');
                });
            })
        });
    })
}
startServer(3000);