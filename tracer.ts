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

export function buildTracer(serviceName: string) {
    const provider = new NodeTracerProvider({
        resource: new Resource({
            [SemanticResourceAttributes.SERVICE_NAME]: serviceName,
        })
    });
    let exporter;
    if (EXPORTER.toLowerCase().startsWith("z")) {
        exporter = new ZipkinExporter();
    } else {
        exporter = new JaegerExporter();
    }

    provider.addSpanProcessor(new SimpleSpanProcessor(exporter));

    provider.register();

    registerInstrumentations({
        instrumentations: [
            new HttpInstrumentation(),
        ]
    })
    return opentelemetry.trace.getTracer('http-example');
}
