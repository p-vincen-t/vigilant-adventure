/**
 *
 *
 * @class Metric
 */
export declare class Metric {
    name: string;
    /**
     * Creates an instance of Metric.
     * @param {*} name A name for the metric.
     * @memberof Metric
     */
    constructor(name: string);
    /**
     * Call to begin a measurement.
     *
     * @static
     * @param {*} name
     * @memberof Metric
     */
    static start(name: string): void;
    /**
     * Returns the duration of the timing metric. The unit is milliseconds.
     * @type {number}
     */
    static end(name: string): number;
    /**
     * Call to begin a measurement.
     */
    start(): void;
    /**
     * Returns the duration of the timing metric. The unit is milliseconds.
     * @type {number}
     */
    end(): number;
}
