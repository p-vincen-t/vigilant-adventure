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
exports.waitUntil = void 0;
const sleep_1 = __importDefault(require("./sleep"));
function waitUntil(test, options = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        const { delay = 5e3, tries = -1 } = options;
        const { predicate, result } = yield test();
        if (predicate) {
            return result;
        }
        if (tries - 1 === 0) {
            throw new Error('tries limit reached');
        }
        yield (0, sleep_1.default)(delay);
        return waitUntil(test, Object.assign(Object.assign({}, options), { tries: tries > 0 ? tries - 1 : tries }));
    });
}
exports.waitUntil = waitUntil;
//# sourceMappingURL=waitUntil.js.map