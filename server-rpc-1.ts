/* eslint-disable @typescript-eslint/no-var-requires */
import { RPCServer } from "./utils";

const opentracing = require('opentracing');
const prefix = "server_rpc_1_";
const shim = require("./shim").shim(`${prefix}opentracing`);
opentracing.initGlobalTracer(shim);

const rpcServer_1 = new RPCServer(opentracing, prefix);

rpcServer_1.startServer(3001);
