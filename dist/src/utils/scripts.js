"use strict";
/*
 * Copyright (C) 2021 Intlcaht
 *  All rights reserved
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.gitBranch = exports.gitHash = void 0;
const childProcess = require('child_process');
const gitHash = () => escape(childProcess.execSync('git rev-parse HEAD').toString('utf-8'));
exports.gitHash = gitHash;
const gitBranch = () => escape(childProcess.execSync('git branch --show-current').toString('utf-8'));
exports.gitBranch = gitBranch;
//# sourceMappingURL=scripts.js.map