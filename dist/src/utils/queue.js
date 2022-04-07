"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Queue = void 0;
const waitUntil_1 = __importDefault(require("./waitUntil"));
class Queue {
    constructor(worker, options = {}) {
        this.pendingEntries = [];
        this.inFlight = 0;
        this.err = null;
        this.push = (entries) => {
            this.pendingEntries = this.pendingEntries.concat(entries);
            this.process();
        };
        this.process = () => {
            const scheduled = this.pendingEntries.splice(0, this.concurrency - this.inFlight);
            this.inFlight += scheduled.length;
            scheduled.forEach((task) => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield this.worker(task);
                }
                catch (err) {
                    this.err = err;
                }
                finally {
                    this.inFlight -= 1;
                }
                if (this.pendingEntries.length > 0) {
                    this.process();
                }
            }));
        };
        this.wait = (options = {}) => (0, waitUntil_1.default)(() => {
            if (this.err) {
                this.pendingEntries = [];
                throw this.err;
            }
            return {
                predicate: options.empty ? this.inFlight === 0 && this.pendingEntries.length === 0 : this.concurrency > this.pendingEntries.length
            };
        }, {
            delay: 50
        });
        this.worker = worker;
        this.concurrency = options.concurrency || 1;
    }
}
exports.Queue = Queue;
//# sourceMappingURL=queue.js.map