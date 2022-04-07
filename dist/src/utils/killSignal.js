var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// @ts-nocheck
const log = require('./logger');
const { asyncPipe } = require('./utils');
const SHUTDOWN_TIMEOUT = 10e3;
let shuttingDown = false;
const teardowns = [];
function isShuttingDown() {
    return shuttingDown;
}
/**
 * shutdown === the termination handler
 * Terminate server on receipt of the specified signal.
 * @param {string} signal  Signal to terminate on.
 */
function shutdown(signal, origin) {
    return __awaiter(this, void 0, void 0, function* () {
        if (typeof signal === 'string') {
            log.info({
                name: 'kill signal',
                msg: `Handling signal: ${signal} from ${origin}.`
            });
        }
        // ASC
        const teardownsSorted = teardowns.slice().sort((a, b) => a.order - b.order);
        //await asyncPipe(teardownsSorted);
        // // Serial resolution of the teardowns
        for (let i = 0; i < teardownsSorted.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            yield teardownsSorted[i].callback();
        }
        //clearTimeout(timer);
        process.exit(0);
        // // At the first soft kill signal, we try to shutdown the service gracefully.
        // if ((signal === 'SIGTERM' || signal === 'SIGINT') && !shuttingDown) {
        //   shuttingDown = true;
        //   log.info({
        //     name: 'kill signal',
        //     msg: `Shutdown server gracefully. ${SHUTDOWN_TIMEOUT}ms before killing it.`,
        //   });
        //   const timer = setTimeout(() => {
        //     log.fatal({
        //       name: 'kill signal',
        //       msg: 'Force shutdown',
        //     });
        //     shutdown();
        //   }, SHUTDOWN_TIMEOUT);
        //   // ASC
        //   const teardownsSorted = teardowns.slice().sort((a, b) => a.order - b.order);
        //   // Serial resolution of the teardowns
        //   for (let i = 0; i < teardownsSorted.length; i += 1) {
        //     // eslint-disable-next-line no-await-in-loop
        //     await teardownsSorted[i].callback();
        //   }
        //   clearTimeout(timer);
        //   process.exit(0);
        // }
        // process.exit(1);
    });
}
function addTeardown(teardown) {
    teardowns.push(teardown);
}
function removeTeardown(teardown) {
    const index = teardowns.indexOf(teardown);
    teardowns.splice(index, 1);
}
function handleKillSignals() {
    //  Process on exit and signals.
    //  https://nodejs.org/api/process.html#process_event_exit
    process.on('exit', (code) => {
        const msg = `💀  Node stopped with code ${code}`;
        if (code === 0) {
            log.info({
                name: 'kill signal',
                msg
            });
        }
        else {
            log.fatal({
                name: 'kill signal',
                msg
            });
        }
    });
    // Removed 'SIGPIPE' from the list - bugz 852598.
    ['SIGINT', 'SIGHUP', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT', 'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'].forEach((signal) => {
        process.on(signal, () => {
            shutdown(signal, 'signal');
        });
    });
}
exports.addTeardown = addTeardown;
exports.handleKillSignals = handleKillSignals;
exports.shutdown = shutdown;
exports.removeTeardown = removeTeardown;
exports.isShuttingDown = isShuttingDown;
//# sourceMappingURL=killSignal.js.map