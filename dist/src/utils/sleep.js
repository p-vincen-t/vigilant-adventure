"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}
exports.sleep = sleep;
//# sourceMappingURL=sleep.js.map