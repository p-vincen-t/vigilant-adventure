import { Metric } from './utils';
export declare function wrapFn(fn: (metric: Metric) => void): Promise<void>;
