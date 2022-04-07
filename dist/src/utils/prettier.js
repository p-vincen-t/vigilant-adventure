/* eslint-disable no-console */
// Based on similar script in React
// https://github.com/facebook/react/blob/b87aabdfe1b7461e7331abb3601d9e6bb27544bc/scripts/prettier/index.js
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
// supported modes = check, check-changed, write, write-changed
var glob = require('glob-gitignore');
var prettier = require('prettier');
var fs = require('fs');
var path = require('path');
var yargs = require('yargs');
var listChangedFiles = require('./listChangedFiles');
var _a = require('./logger'), info = _a.info, error = _a.error, warn = _a.warn;
function runPrettier(options) {
    var changedFiles = options.changedFiles, shouldWrite = options.shouldWrite;
    var didWarn = false;
    var didError = false;
    var warnedFiles = [];
    var ignoredFiles = fs
        .readFileSync('.prettierignore', 'utf-8')
        .split(/\r*\n/)
        .filter(function (notEmpty) { return notEmpty; });
    var files = glob.sync('**/*.{js,tsx,ts, scss, html, pug}', { ignore: __spreadArrays(['**/node_modules/**'], ignoredFiles) }).filter(function (f) { return !changedFiles || changedFiles.has(f); });
    if (!files.length) {
        return;
    }
    // eslint-disable-next-line no-undef
    var prettierConfigPath = path.join(__dirname, '../prettier.config.js');
    files.forEach(function (file) {
        var prettierOptions = prettier.resolveConfig.sync(file, {
            config: prettierConfigPath
        });
        try {
            var input = fs.readFileSync(file, 'utf8');
            if (shouldWrite) {
                info({
                    name: 'Formatting',
                    msg: file
                });
                var output = prettier.format(input, __assign(__assign({}, prettierOptions), { filepath: file }));
                if (output !== input) {
                    fs.writeFileSync(file, output, 'utf8');
                }
            }
            else {
                info({
                    name: 'Checking',
                    msg: file
                });
                if (!prettier.check(input, __assign(__assign({}, prettierOptions), { filepath: file }))) {
                    warnedFiles.push(file);
                    didWarn = true;
                }
            }
        }
        catch (error) {
            didError = true;
            error({
                name: file.toString(),
                msg: error
            });
        }
    });
    if (didWarn) {
        warn({
            name: 'Commit files',
            msg: ['\n\nThis project uses prettier to format all JavaScript code.\n' + ("Please run '" + (!changedFiles ? 'yarn prettier:all' : 'yarn prettier') + "'") + ' and commit the changes to the files listed below:\n\n', warnedFiles.join('\n')]
        });
    }
    if (didWarn || didError) {
        throw new Error('Triggered at least one error or warning');
    }
}
function run(argv) {
    return __awaiter(this, void 0, void 0, function () {
        var mode, shouldWrite, onlyChanged, changedFiles;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mode = argv.mode;
                    shouldWrite = mode === 'write' || mode === 'write-changed';
                    onlyChanged = mode === 'check-changed' || mode === 'write-changed';
                    if (!onlyChanged) return [3 /*break*/, 2];
                    return [4 /*yield*/, listChangedFiles()];
                case 1:
                    changedFiles = _a.sent();
                    _a.label = 2;
                case 2:
                    runPrettier({ changedFiles: changedFiles, shouldWrite: shouldWrite });
                    return [2 /*return*/];
            }
        });
    });
}
yargs
    .command({
    command: '$0 [mode]',
    description: 'formats codebase',
    builder: function (command) {
        return command.positional('mode', {
            description: '"write" | "check-changed" | "write-changed"',
            type: 'string',
            "default": 'write-changed'
        });
    },
    handler: run
})
    .help()
    .strict(true)
    .version(false)
    .parse();
