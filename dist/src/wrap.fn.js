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
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapFn = void 0;
const utils_1 = require("./utils");
function wrapFn(fn) {
    return __awaiter(this, void 0, void 0, function* () {
        process.on('unhandledRejection', (reason, promise) => {
            (0, utils_1.fatal)({
                name: 'unhandledRejection',
                msg: { reason, promise },
            });
        });
        process.on('uncaughtException', (error) => {
            (0, utils_1.fatal)({
                name: 'uncaughtException',
                msg: error,
            });
            if (error.message.includes('Unable to compile TypeScript')) {
                process.exit(0);
            }
        });
        const metric = new utils_1.Metric('bootsrap');
        metric.start();
        yield fn(metric);
        (0, utils_1.info)({
            name: metric.name,
            msg: {
                pid: process.pid,
                boot: metric.end(),
            },
        });
    });
}
exports.wrapFn = wrapFn;
//# sourceMappingURL=wrap.fn.js.map