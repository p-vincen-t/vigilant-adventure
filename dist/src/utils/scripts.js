"use strict";
/*
 * Copyright (C) 2021 Intlcaht
 *  All rights reserved
 */
Object.defineProperty(exports, "__esModule", { value: true });
const childProcess = require('child_process');
exports.gitHash = () => escape(childProcess.execSync('git rev-parse HEAD').toString('utf-8'));
exports.gitBranch = () => escape(childProcess.execSync('git branch --show-current').toString('utf-8'));
//# sourceMappingURL=scripts.js.map