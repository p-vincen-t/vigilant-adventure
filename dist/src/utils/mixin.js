"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Extends = void 0;
// the helper function
function applyMixins(derivedCtor, constructors) {
    constructors.forEach((baseCtor) => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
            Object.defineProperty(derivedCtor.prototype, name, Object.getOwnPropertyDescriptor(baseCtor.prototype, name) ||
                Object.create(null));
        });
    });
}
class Final {
}
// @ts-ignore
function Extends(class1, class2) {
    applyMixins(Final, [class1, class2]);
    return Final;
}
exports.Extends = Extends;
//# sourceMappingURL=mixin.js.map