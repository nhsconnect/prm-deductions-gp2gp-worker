import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { context, getSpan, propagation } from '@opentelemetry/api';
import { HttpTraceContext } from '@opentelemetry/core';
import { NodeTracerProvider } from '@opentelemetry/node';
import { SimpleSpanProcessor, ConsoleSpanExporter } from '@opentelemetry/tracing';

const tracerProvider = new NodeTracerProvider({});

tracerProvider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
propagation.setGlobalPropagator(new HttpTraceContext());

tracerProvider.register();
registerInstrumentations({
  tracerProvider: tracerProvider,
  instrumentations: [new HttpInstrumentation()]
});

console.log('tracing initialised');

export const tracer = tracerProvider.getTracer('gp2gp-worker-tracer');

export const getTraceParentFromCurrentSpan = () => {
  const currentSpan = getSpan(context.active());

  if (currentSpan) {
    const { traceId, spanId, traceFlags } = currentSpan.context();
    const traceFlagsConverted = Number(traceFlags || 0x0).toString(16);

    return `00-${traceId}-${spanId}-0${traceFlagsConverted}`;
  }
};
