// helper routine to check if a dynamically-typed variable is a string
const isString = (s) => {
  return typeof s === 'string' || s instanceof String;
};

// cheaply returns server time in ms for client-side logging
const serverTimestamp = () => {
  return Math.floor(Date.now() / 1000);
};

// generic error handler
const respondError = (msg = "invalid request") => {
  return {
    ok: false, 
    msg: `ERROR: ${msg.replace("ERROR: ", "")}`, // prevent label duplicate
    servertime: serverTimestamp(),
  }
};

// checks if requested value exists, prior to further operations
const readCheck = (store, id) => {
  if (id === null || isNaN(id) ||  id < 0 || id > store.data.length - 1) {
    return respondError(`item with ID "${id}" does not exist`);
  }

  return { ok: true };
};

// deeply copies an object, circumventing referencing (WARN: not optimized)
const deepCopyObj = (obj) => JSON.parse(JSON.stringify(obj));

export {
  isString,
  serverTimestamp,
  respondError,
  readCheck,
  deepCopyObj,
};
