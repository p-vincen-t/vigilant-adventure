// Based on similar script in React
// https://github.com/facebook/react/blob/b87aabdfe1b7461e7331abb3601d9e6bb27544bc/scripts/shared/listChangedFiles.js
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const util = require('util');
//const childProcess = require('child_process');
// const execFileAsync = util.promisify(childProcess.execFile);
function exec(command, args) {
    return __awaiter(this, void 0, void 0, function* () {
        const options = {
            cwd: process.cwd(),
            env: process.env,
            stdio: 'pipe',
            encoding: 'utf-8'
        };
        // const results = await execFileAsync(command, args, options);
        // return results.stdout;
    });
}
function execGitCmd(args) {
    return __awaiter(this, void 0, void 0, function* () {
        const gitResults = yield exec('git', args);
        return gitResults.trim().toString().split('\n');
    });
}
function listChangedFiles() {
    return __awaiter(this, void 0, void 0, function* () {
        const comparedBranch = process.env.CIRCLECI ? 'origin/master' : 'main';
        const mergeBase = yield execGitCmd(['rev-parse', comparedBranch]);
        const gitDiff = yield execGitCmd(['diff', '--name-only', mergeBase]);
        const gitLs = yield execGitCmd(['ls-files', '--others', '--exclude-standard']);
        return new Set([...gitDiff, ...gitLs]);
    });
}
module.exports.listChangedFiles = listChangedFiles;
//# sourceMappingURL=listChangedFiles.js.map