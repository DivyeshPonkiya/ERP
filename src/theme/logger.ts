// Logger.js
const loggingEnabled = true; // Set to false to disable all logs

const log = (...args: any) => {
  if (loggingEnabled) {
    console.log(...args);
  }
};

const warn = (...args: any) => {
  if (loggingEnabled) {
    console.warn(...args);
  }
};

const error = (...args: any) => {
  if (loggingEnabled) {
    console.error(...args);
  }
};

export const Logger = {
  log,
  warn,
  error,
};
