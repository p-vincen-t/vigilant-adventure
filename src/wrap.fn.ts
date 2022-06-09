import { fatal as f, info as i, Metric } from './utils';
export async function wrapFn(fn: (metric: Metric) => void) {
    process.on('unhandledRejection', (reason, promise) => {
        f({
            name: 'unhandledRejection',
            msg: { reason, promise },
        });
    });
    process.on('uncaughtException', (error) => {
        f({
            name: 'uncaughtException',
            msg: error,
        });
        if (error.message.includes('Unable to compile TypeScript')) {
            process.exit(0);
        }
    });
    const metric = new Metric('bootsrap');
    metric.start();
    await fn(metric);
    i({
        name: metric.name,
        msg: {
            pid: process.pid,
            boot: metric.end(),
        },
    });
}