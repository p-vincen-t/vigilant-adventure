export function addTeardown(teardown: any): void;
export function handleKillSignals(): void;
/**
 * shutdown === the termination handler
 * Terminate server on receipt of the specified signal.
 * @param {string} signal  Signal to terminate on.
 */
export function shutdown(signal: string, origin: any): Promise<void>;
export function removeTeardown(teardown: any): void;
export function isShuttingDown(): boolean;
