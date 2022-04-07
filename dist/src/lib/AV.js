"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcceptorImpl = void 0;
/**
 *
 *
 * @export
 * @class AcceptorImpl
 * @implements {Acceptor<T, R>}
 * @template T
 * @template R
 */
class AcceptorImpl {
    /**
     *
     *
     * @param {Visitor<T, R>} t
     * @param {...any[]} args
     * @return {*}  {R}
     * @memberof AcceptorImpl
     */
    accept(t, args = {}) {
        // @ts-ignore
        return t.visit(this, args);
    }
}
exports.AcceptorImpl = AcceptorImpl;
//# sourceMappingURL=AV.js.map