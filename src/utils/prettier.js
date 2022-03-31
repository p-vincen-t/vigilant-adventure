/* eslint-disable no-console */
// Based on similar script in React
// https://github.com/facebook/react/blob/b87aabdfe1b7461e7331abb3601d9e6bb27544bc/scripts/prettier/index.js

// supported modes = check, check-changed, write, write-changed

const glob = require('glob-gitignore');
const prettier = require('prettier');
const fs = require('fs');
const path = require('path');
const yargs = require('yargs');
const listChangedFiles = require('./listChangedFiles');
const { info, error, warn } = require('./logger');

function runPrettier(options) {
  const { changedFiles, shouldWrite } = options;

  let didWarn = false;
  let didError = false;

  const warnedFiles = [];
  const ignoredFiles = fs
    .readFileSync('.prettierignore', 'utf-8')
    .split(/\r*\n/)
    .filter((notEmpty) => notEmpty);

  const files = glob.sync('**/*.{js,tsx,ts, scss, html, pug}', { ignore: ['**/node_modules/**', ...ignoredFiles] }).filter((f) => !changedFiles || changedFiles.has(f));

  if (!files.length) {
    return;
  }

  // eslint-disable-next-line no-undef
  const prettierConfigPath = path.join(__dirname, '../prettier.config.js');

  files.forEach((file) => {
    const prettierOptions = prettier.resolveConfig.sync(file, {
      config: prettierConfigPath
    });

    try {
      const input = fs.readFileSync(file, 'utf8');
      if (shouldWrite) {
        info({
          name: 'Formatting',
          msg: file
        });
        const output = prettier.format(input, { ...prettierOptions, filepath: file });
        if (output !== input) {
          fs.writeFileSync(file, output, 'utf8');
        }
      } else {
        info({
          name: 'Checking',
          msg: file
        });
        if (!prettier.check(input, { ...prettierOptions, filepath: file })) {
          warnedFiles.push(file);
          didWarn = true;
        }
      }
    } catch (error) {
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
      msg: ['\n\nThis project uses prettier to format all JavaScript code.\n' + `Please run '${!changedFiles ? 'yarn prettier:all' : 'yarn prettier'}'` + ' and commit the changes to the files listed below:\n\n', warnedFiles.join('\n')]
    });
  }

  if (didWarn || didError) {
    throw new Error('Triggered at least one error or warning');
  }
}

async function run(argv) {
  const { mode } = argv;
  const shouldWrite = mode === 'write' || mode === 'write-changed';
  const onlyChanged = mode === 'check-changed' || mode === 'write-changed';

  let changedFiles;
  if (onlyChanged) {
    changedFiles = await listChangedFiles();
  }

  runPrettier({ changedFiles, shouldWrite });
}

yargs
  .command({
    command: '$0 [mode]',
    description: 'formats codebase',
    builder: (command) => {
      return command.positional('mode', {
        description: '"write" | "check-changed" | "write-changed"',
        type: 'string',
        default: 'write-changed'
      });
    },
    handler: run
  })
  .help()
  .strict(true)
  .version(false)
  .parse();
