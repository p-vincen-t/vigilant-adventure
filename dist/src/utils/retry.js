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
// Inspired by https://github.com/zeit/async-retry
// Without the retry dependency (1 kB gzipped +)
function retry(tryFunction, options = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        const { retries = 3 } = options;
        let tries = 0;
        let output = null;
        let exitErr = null;
        const bail = (err) => {
            exitErr = err;
        };
        while (tries < retries) {
            tries += 1;
            try {
                // eslint-disable-next-line no-await-in-loop
                output = yield tryFunction({ tries, bail });
                break;
            }
            catch (err) {
                if (tries >= retries) {
                    throw err;
                }
            }
        }
        if (exitErr) {
            throw exitErr;
        }
        return output;
    });
}
exports.retry = retry;
//# sourceMappingURL=retry.js.map