export declare function sleep(ms: any): Promise<unknown>;
export declare class RPCServer {
    private opentracing;
    private tracer;
    private prefix;
    constructor(opentracing: any, prefix: any);
    startServer(port: any): void;
    doSomething(parentSpan: any): Promise<void>;
}
