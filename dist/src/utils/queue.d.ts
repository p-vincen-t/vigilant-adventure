export class Queue {
    constructor(worker: any, options?: {});
    pendingEntries: any[];
    inFlight: number;
    err: null;
    worker: any;
    concurrency: any;
    push: (entries: any) => void;
    process: () => void;
    wait: (options?: {}) => any;
}
