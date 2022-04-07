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
exports.runScripts = void 0;
const util = require('util');
const childProcess = require('child_process');
//const { setUpAdminUser } = require('../setupAdminUser');
const execFileAsync = util.promisify(childProcess.exec);
process.on('unhandledRejection', (reason, promise) => {
    console.error({
        name: 'unhandledRejection',
        msg: { reason, promise }
    });
});
function spawn(command, args) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const spawn = childProcess.spawn(command, args);
            let result;
            spawn.stdout.on('data', (data) => {
                if (result) {
                    reject(Error('Helper function does not work for long lived proccess'));
                }
                result = data.toString();
            });
            spawn.stderr.on('data', (error) => {
                reject(Error(error.toString()));
            });
            spawn.on('exit', (code) => {
                resolve({ code, result });
            });
        });
    });
}
function exec(command, args) {
    return __awaiter(this, void 0, void 0, function* () {
        const results = yield spawn(command, args);
        return results;
    });
}
function execYarnCmd(args) {
    return __awaiter(this, void 0, void 0, function* () {
        const yarnResults = yield exec('yarn', args);
        //yarnResults.trim().toString().split('\n');
        console.dir(yarnResults);
        return yarnResults;
    });
}
function runScripts(...scripts) {
    return __awaiter(this, void 0, void 0, function* () {
        scripts.forEach((script) => __awaiter(this, void 0, void 0, function* () {
            const res = yield execYarnCmd([script]);
            console.log(res);
        }));
    });
}
exports.runScripts = runScripts;
// setFresh(
//     'db:schema:drop',
//     'db:dev:format',
//     'db:dev:update',
//     'db:models:generate',
//     'db:seed:run'
// );
//# sourceMappingURL=refreshSystem.js.map