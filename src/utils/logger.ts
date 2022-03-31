export const prefixes = {
  wait: 'wait' + '  -',
  error: 'error' + ' -',
  warn: 'warn' + '  -',
  ready: 'ready' + ' -',
  info: 'info' + '  -',
  event: 'event' + ' -'
};
/* eslint-disable no-console */
export const LogType = (
  // @ts-ignore
  { name, msg, force = false }
) => ({
  name,
  msg,
  force
});
// https://github.com/trentm/node-bunyan#levels
const logTypes = {
  // Detail on regular operation.
  info: { level: 3, method: 'log' },
  // A note on something that should probably be looked at by an operator eventually.
  warn: { level: 4, method: 'warn' },
  // Fatal for a particular request, but the service/app continues servicing other requests.
  // An operator should look at this soon(ish).
  error: { level: 5, method: 'error' },
  // The service/app is going to stop or become unusable now.
  // An operator should definitely look into this soon.
  fatal: { level: 6, method: 'error' }
};

function serializeErr(msg: { err: { stack: any; message: any; name: any } }) {
  if (!msg.err.stack) {
    return msg.err;
  }

  return {
    ...msg,
    err: {
      message: msg.err.message,
      name: msg.err.name
    }
  };
}

function serializeDuration(msg: { duration: number }) {
  return {
    ...msg,
    duration: `${msg.duration.toFixed(2)}ms`
  };
}

function safeCycles() {
  const seen = new Set();
  return function handleKey(key: any, val: unknown) {
    if (!val || typeof val !== 'object') {
      return val;
    }
    if (seen.has(val)) {
      return '[Circular]';
    }
    seen.add(val);
    return val;
  };
}

/**
 * A fast JSON.stringify that handles cycles and getter exceptions (when
 * safeJsonStringify is installed).
 *
 * This function attempts to use the regular JSON.stringify for speed, but on
 * error (e.g. JSON cycle detection exception) it falls back to safe stringify
 * handlers that can deal with cycles and/or getter exceptions.
 *
 * From: https://github.com/trentm/node-bunyan/blob/c0932196dd6846189ec82623c12d051eee799d4f/lib/bunyan.js#L1208
 */
function fastAndSafeJsonStringify(object: { pid?: any; level: any; msg: any; name: string }) {
  try {
    return JSON.stringify(object);
  } catch (err) {
    try {
      return JSON.stringify(object, safeCycles());
    } catch (err2) {
      console.log('err', err);
      console.log('err2', err2);
      console.log('object', object);
      return 'logger: something is wrong';
    }
  }
}

const logMethod = (type: string) => (object: { name: string; msg: any; force?: false | undefined }) => {
  const { name, msg, force = false } = object;
  let formatedMsg = msg;

  if (process.env.NODE_ENV === 'test' && !force) {
    return;
  }

  if (process.env.NODE_ENV !== 'production' && !name) {
    throw new Error(`Missing name ${JSON.stringify(object)}`);
  }
  // @ts-ignore
  const format = process.env.NODE_ENV === 'production' && process.env.LOG_FORMAT !== 'human' && !process.browser ? 'json' : 'human';

  if (formatedMsg.duration) {
    formatedMsg = serializeDuration(formatedMsg);
  }

  if (format === 'json') {
    if (formatedMsg.err) {
      formatedMsg = serializeErr(formatedMsg);
    }

    const message = fastAndSafeJsonStringify({
      // @ts-ignore
      level: logTypes[type].level,
      msg: formatedMsg,
      name,
      // @ts-ignore
      ...(process.browser ? {} : { pid: process.pid })
    });

    // @ts-ignore
    if (process.browser) {
      // @ts-ignore
      console[logTypes[type].method](message);
      return;
    }
    // Faster than calling console.x.
    process.stdout.write(`${message}\n`);
  } else {
    const messages = [];
    // @ts-ignorev
    if (process.browser) {
      messages.push(`${name}:`);
    } else {
      // @ts-ignore
      messages.push(`${prefixes[type]} ${process.pid} ${name}:`);
    }
    if (formatedMsg.err) {
      messages.push(formatedMsg.err);
      delete formatedMsg.err;
    }
    messages.push(formatedMsg);
    // @ts-ignore
    console[logTypes[type].method](...messages);
  }
};

export const info = logMethod('info');
export const warn = logMethod('warn');
export const error = logMethod('error');
export const fatal = logMethod('fatal');
