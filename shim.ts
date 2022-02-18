/* eslint-disable @typescript-eslint/no-var-requires */
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { Resource } from '@opentelemetry/resources';
import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node';
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { JaegerExporter } from '@opentelemetry/exporter-jaeger';
import { ZipkinExporter } from '@opentelemetry/exporter-zipkin';
import { TracerShim } from '@opentelemetry/shim-opentracing';
export function shim(serviceName: string) {
    const provider = new NodeTracerProvider({
        resource: new Resource({
            [SemanticResourceAttributes.SERVICE_NAME]: serviceName
        })
    });
    provider.addSpanProcessor(new SimpleSpanProcessor(getExporter()));
    provider.register();
    return new TracerShim(provider.getTracer("opentracing-shim"));
}

function getExporter() {
    const type = process.env.EXPORTER.toLowerCase() || "jaeger";
    if (type.startsWith("z")) {
        return new ZipkinExporter();
    }
    return new JaegerExporter();
}