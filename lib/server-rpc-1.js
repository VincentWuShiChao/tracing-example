"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-var-requires */
const utils_1 = require("./utils");
const opentracing = require('opentracing');
const prefix = "server_rpc_1_";
const shim = require("./shim").shim(`${prefix}opentracing`);
opentracing.initGlobalTracer(shim);
const rpcServer_1 = new utils_1.RPCServer(opentracing, prefix);
rpcServer_1.startServer(3001);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLXJwYy0xLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc2VydmVyLXJwYy0xLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdURBQXVEO0FBQ3ZELG1DQUFvQztBQUVwQyxNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDM0MsTUFBTSxNQUFNLEdBQUcsZUFBZSxDQUFDO0FBQy9CLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxNQUFNLGFBQWEsQ0FBQyxDQUFDO0FBQzVELFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUVuQyxNQUFNLFdBQVcsR0FBRyxJQUFJLGlCQUFTLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBRXZELFdBQVcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMifQ==