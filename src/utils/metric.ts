// The API is inspired by console.time
// The implementation is isomorphic.

/**
 *
 */
const times = new Map();
/**
 *
/** @type {*} */
const implementations = {
  mark: {
    start: (name: any) => {
      times.set(name, performance.now());
      performance.mark(`metric_${name}_start`);
    },
    end: (name: string) => {
      const endMark = `metric_${name}_end`;
      performance.mark(endMark);
      const startMark = `metric_${name}_start`;
      performance.measure(name, startMark, endMark);
      const duration = performance.getEntriesByName(name)[0].duration;
      return duration;
    }
  },

  now: {
    start: (name: any) => {
      times.set(name, performance.now());
    },
    end: (name: any) => {
      const time = times.get(name);
      const duration = performance.now() - time;
      return duration;
    }
  },
  hrtime: {
    start: (name: any) => {
      // https://nodejs.org/api/process.html#process_process_hrtime_time
      times.set(name, process.hrtime());
    },
    end: (name: any) => {
      const time = times.get(name);
      const durations = process.hrtime(time);
      const duration = durations[0] / 1e3 + durations[1] / 1e6;
      return duration;
    }
  }
};

let getImplementationCache: { start: ((name: any) => void) | ((name: any) => void) | ((name: any) => void); end: ((name: any) => number) | ((name: any) => number) | ((name: any) => number) };
/**
 *
 *
 * @return {*}
 */
function getImplementation() {
  if (getImplementationCache) {
    return getImplementationCache;
  }

  if (typeof performance !== 'undefined' && performance.mark) {
    getImplementationCache = implementations.mark;
  } else if (typeof performance !== 'undefined' && performance.now) {
    getImplementationCache = implementations.now;
  } else if (process.hrtime()) {
    getImplementationCache = implementations.hrtime;
  } else {
    throw new Error('No performance API available');
  }

  return getImplementationCache;
}
/**
 *
 *
 * @class Metric
 */
export class Metric {
  name = '';

  /**
   * Creates an instance of Metric.
   * @param {*} name A name for the metric.
   * @memberof Metric
   */
  constructor(name: string) {
    if (!name) {
      throw new Error('Please provide a metric name');
    }

    this.name = name;
  }
  /**
   * Call to begin a measurement.
   *
   * @static
   * @param {*} name
   * @memberof Metric
   */
  static start(name: string) {
    if (process.env.NODE_ENV !== 'production') {
      if (times.get(name)) {
        console.error('Recording already started');
      }
    }
    getImplementation().start(name);
  }

  /**
   * Returns the duration of the timing metric. The unit is milliseconds.
   * @type {number}
   */
  static end(name: string) {
    if (!times.get(name)) {
      throw new Error(`No such name '${name}' for metric`);
    }

    const duration = getImplementation().end(name);
    times.delete(name);
    return duration;
  }

  /**
   * Call to begin a measurement.
   */
  start() {
    Metric.start(this.name);
  }

  /**
   * Returns the duration of the timing metric. The unit is milliseconds.
   * @type {number}
   */
  end() {
    return Metric.end(this.name);
  }
}
