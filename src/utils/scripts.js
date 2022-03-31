/*
 * Copyright (C) 2021 Intlcaht
 *  All rights reserved
 */

const childProcess = require('child_process');

export const gitHash = () => escape(childProcess.execSync('git rev-parse HEAD').toString('utf-8'));

export const gitBranch = () => escape(childProcess.execSync('git branch --show-current').toString('utf-8'));
