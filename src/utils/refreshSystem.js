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

async function spawn(command, args) {
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
}

async function exec(command, args) {
  const results = await spawn(command, args);
  return results;
}

async function execYarnCmd(args) {
  const yarnResults = await exec('yarn', args);
  //yarnResults.trim().toString().split('\n');
  console.dir(yarnResults);
  return yarnResults;
}

export async function runScripts(...scripts) {
  scripts.forEach(async (script) => {
    const res = await execYarnCmd([script]);
    console.log(res);
  });
}

// setFresh(
//     'db:schema:drop',
//     'db:dev:format',
//     'db:dev:update',
//     'db:models:generate',
//     'db:seed:run'
// );
