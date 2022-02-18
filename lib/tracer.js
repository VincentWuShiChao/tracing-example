"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildTracer = void 0;
/* eslint-disable @typescript-eslint/no-var-requires */
const opentelemetry = require("@opentelemetry/api");
const { registerInstrumentations } = require("@opentelemetry/instrumentation");
const { NodeTracerProvider } = require("@opentelemetry/sdk-trace-node");
const { Resource } = require("@opentelemetry/resources");
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');
const { SimpleSpanProcessor } = require('@opentelemetry/sdk-trace-base');
const { JaegerExporter } = require('@opentelemetry/exporter-jaeger');
const { ZipkinExporter } = require('@opentelemetry/exporter-zipkin');
const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http');
const EXPORTER = process.env.EXPORTER || '';
function buildTracer(serviceName) {
    const provider = new NodeTracerProvider({
        resource: new Resource({
            [SemanticResourceAttributes.SERVICE_NAME]: serviceName,
        })
    });
    let exporter;
    if (EXPORTER.toLowerCase().startsWith("z")) {
        exporter = new ZipkinExporter();
    }
    else {
        exporter = new JaegerExporter();
    }
    provider.addSpanProcessor(new SimpleSpanProcessor(exporter));
    provider.register();
    registerInstrumentations({
        instrumentations: [
            new HttpInstrumentation(),
        ]
    });
    return opentelemetry.trace.getTracer('http-example');
}
exports.buildTracer = buildTracer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHJhY2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHVEQUF1RDtBQUN2RCxNQUFNLGFBQWEsR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUNwRCxNQUFNLEVBQUUsd0JBQXdCLEVBQUUsR0FBRyxPQUFPLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztBQUMvRSxNQUFNLEVBQUUsa0JBQWtCLEVBQUUsR0FBRyxPQUFPLENBQUMsK0JBQStCLENBQUMsQ0FBQztBQUN4RSxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsT0FBTyxDQUFDLDBCQUEwQixDQUFDLENBQUM7QUFDekQsTUFBTSxFQUFFLDBCQUEwQixFQUFFLEdBQUcsT0FBTyxDQUFDLHFDQUFxQyxDQUFDLENBQUM7QUFDdEYsTUFBTSxFQUFFLG1CQUFtQixFQUFFLEdBQUcsT0FBTyxDQUFDLCtCQUErQixDQUFDLENBQUM7QUFDekUsTUFBTSxFQUFFLGNBQWMsRUFBRSxHQUFHLE9BQU8sQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO0FBQ3JFLE1BQU0sRUFBRSxjQUFjLEVBQUUsR0FBRyxPQUFPLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztBQUNyRSxNQUFNLEVBQUUsbUJBQW1CLEVBQUUsR0FBRyxPQUFPLENBQUMscUNBQXFDLENBQUMsQ0FBQztBQUcvRSxNQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUM7QUFFNUMsU0FBZ0IsV0FBVyxDQUFDLFdBQW1CO0lBQzNDLE1BQU0sUUFBUSxHQUFHLElBQUksa0JBQWtCLENBQUM7UUFDcEMsUUFBUSxFQUFFLElBQUksUUFBUSxDQUFDO1lBQ25CLENBQUMsMEJBQTBCLENBQUMsWUFBWSxDQUFDLEVBQUUsV0FBVztTQUN6RCxDQUFDO0tBQ0wsQ0FBQyxDQUFDO0lBQ0gsSUFBSSxRQUFRLENBQUM7SUFDYixJQUFJLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDeEMsUUFBUSxHQUFHLElBQUksY0FBYyxFQUFFLENBQUM7S0FDbkM7U0FBTTtRQUNILFFBQVEsR0FBRyxJQUFJLGNBQWMsRUFBRSxDQUFDO0tBQ25DO0lBRUQsUUFBUSxDQUFDLGdCQUFnQixDQUFDLElBQUksbUJBQW1CLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUU3RCxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7SUFFcEIsd0JBQXdCLENBQUM7UUFDckIsZ0JBQWdCLEVBQUU7WUFDZCxJQUFJLG1CQUFtQixFQUFFO1NBQzVCO0tBQ0osQ0FBQyxDQUFBO0lBQ0YsT0FBTyxhQUFhLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUN6RCxDQUFDO0FBdkJELGtDQXVCQyJ9