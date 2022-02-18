"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shim = void 0;
/* eslint-disable @typescript-eslint/no-var-requires */
const semantic_conventions_1 = require("@opentelemetry/semantic-conventions");
const resources_1 = require("@opentelemetry/resources");
const sdk_trace_node_1 = require("@opentelemetry/sdk-trace-node");
const sdk_trace_base_1 = require("@opentelemetry/sdk-trace-base");
const exporter_jaeger_1 = require("@opentelemetry/exporter-jaeger");
const exporter_zipkin_1 = require("@opentelemetry/exporter-zipkin");
const shim_opentracing_1 = require("@opentelemetry/shim-opentracing");
function shim(serviceName) {
    const provider = new sdk_trace_node_1.NodeTracerProvider({
        resource: new resources_1.Resource({
            [semantic_conventions_1.SemanticResourceAttributes.SERVICE_NAME]: serviceName
        })
    });
    provider.addSpanProcessor(new sdk_trace_base_1.SimpleSpanProcessor(getExporter()));
    provider.register();
    return new shim_opentracing_1.TracerShim(provider.getTracer("opentracing-shim"));
}
exports.shim = shim;
function getExporter() {
    const type = process.env.EXPORTER.toLowerCase() || "jaeger";
    if (type.startsWith("z")) {
        return new exporter_zipkin_1.ZipkinExporter();
    }
    return new exporter_jaeger_1.JaegerExporter();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hpbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NoaW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsdURBQXVEO0FBQ3ZELDhFQUFpRjtBQUNqRix3REFBb0Q7QUFDcEQsa0VBQW1FO0FBQ25FLGtFQUFvRTtBQUNwRSxvRUFBZ0U7QUFDaEUsb0VBQWdFO0FBQ2hFLHNFQUE2RDtBQUM3RCxTQUFnQixJQUFJLENBQUMsV0FBbUI7SUFDcEMsTUFBTSxRQUFRLEdBQUcsSUFBSSxtQ0FBa0IsQ0FBQztRQUNwQyxRQUFRLEVBQUUsSUFBSSxvQkFBUSxDQUFDO1lBQ25CLENBQUMsaURBQTBCLENBQUMsWUFBWSxDQUFDLEVBQUUsV0FBVztTQUN6RCxDQUFDO0tBQ0wsQ0FBQyxDQUFDO0lBQ0gsUUFBUSxDQUFDLGdCQUFnQixDQUFDLElBQUksb0NBQW1CLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2xFLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNwQixPQUFPLElBQUksNkJBQVUsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztBQUNsRSxDQUFDO0FBVEQsb0JBU0M7QUFFRCxTQUFTLFdBQVc7SUFDaEIsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLElBQUksUUFBUSxDQUFDO0lBQzVELElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUN0QixPQUFPLElBQUksZ0NBQWMsRUFBRSxDQUFDO0tBQy9CO0lBQ0QsT0FBTyxJQUFJLGdDQUFjLEVBQUUsQ0FBQztBQUNoQyxDQUFDIn0=