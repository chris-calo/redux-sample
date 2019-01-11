import uuid from 'uuid/v1';
import bcrypt from 'bcrypt';
import { dateFactory } from './data';
import {
  isString,
  serverTimestamp,
  respondError,
  readCheck,
  deepCopyObj,
} from './utils';

const saltRounds = 10;

const expiresTime = (input = null) => {
  const base = input ?  (new Date(input.getTime())) : (new Date());

  // add 2 hours; ensure returned to Date object
  return new Date(base.setTime(base.getTime() + (2 * 60 * 60 * 1000)));
};

const userOps = {
  data: [],

  // a forced parameter is included to ensure deterministic testing
  createSession: (data, forced = null) => {
    const email = data.email;
    const emailIndex = userOps.data.findIndex(data =>
      data.email === email
    );

    if (emailIndex < 0) {
      return respondError(`User with email "${email}" does not exist`);
    }

    const temp = userOps.data[emailIndex]
    const password = data.password;
    if (!userOps.checkPassword(password, temp.hash)) {
      return respondError(`Password invalid`);
    }

    temp.sessionExpires = expiresTime(forced);
    temp.token = uuid();
    userOps.data[emailIndex] = temp;

    const result = deepCopyObj(userOps.data[emailIndex]);
    delete result.hash;

    return {
      data: [
        result,
      ],
      ok: true,
      msg: `OK: extended session of user "${email}"`,
      servertime: serverTimestamp(),
    };
  },

  // a forced parameter is included to ensure deterministic testing
  extendSession: (data, forced = null) => {
    const email = data.email;
    const emailIndex = userOps.data.findIndex(data =>
      data.email === email
    );

    if (emailIndex < 0) {
      return respondError(`User with email "${email}" does not exist`);
    }

    const temp = userOps.data[emailIndex]
    const token = data.token;

    if (
      !token ||
      !isString(token) ||
      token.trim().length < 1 ||
      token != temp.token
    ) {
      // clear existing session, as it expired
      temp.sessionExpires = dateFactory(1);
      temp.token = "";
      userOps.data[emailIndex] = temp;
      return respondError(`Unable to validate user authentication token`);
    }

    temp.sessionExpires = expiresTime(forced);
    userOps.data[emailIndex] = temp;

    const result = deepCopyObj(userOps.data[emailIndex]);
    delete result.hash;

    return {
      data: [
        result,
      ],
      ok: true,
      msg: `OK: extended session of user "${email}"`,
      servertime: serverTimestamp(),
    };
  },

  hashPassword: (password) => {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  },

  checkPassword: (password, hash) => {
    return bcrypt.compareSync(password, hash);
  },

  validate: (data) => {
    if (!data || typeof data === 'undefined') {
      return respondError(`missing data`);
    }

    if (
      !('firstName' in data) ||
      data.firstName === null ||
      !isString(data.firstName)
    ) {
      return respondError(`invalid 'firstName' value "${data.firstName}"`);
    }

    if (
      !('lastName' in data) ||
      data.lastName === null ||
      !isString(data.lastName)
    ) {
      return respondError(`invalid 'lastName' value "${data.lastName}"`);
    }

    if (
      !('email' in data) ||
      data.email === null ||
      !isString(data.email)
    ) {
      return respondError(`invalid 'email' value "${data.email}"`);
    }

    if (
      !('password' in data) ||
      data.password === null ||
      !isString(data.password)
    ) {
      return respondError(`invalid 'password' value "${data.password}"`);
    }

    return { ok: true, msg: "OK: valid" };
  },

  create: (data) => {
    const { ok, msg } = userOps.validate(data);
    if (!ok) { return respondError(msg); }

    // check if email value exists
    const email = data.email;
    const emailIndex = userOps.data.findIndex(data =>
      data.email === email
    );

    if (emailIndex > -1) {
      return respondError(
        `failed to create; row with email value "${data.email}" ` +
        `already exists at index "${emailIndex}"`
      );
    }

    // if non-existent, insert
    const len = userOps.data.push({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      hash: userOps.hashPassword(data.password),
      sessionExpires: expiresTime(),
    });
    const newID = len - 1;

    // respond with new value information and OK status
    return {
      data: [
        userOps.data[newID],
      ],
      ok: true,
      msg: `OK: inserted row with email "${email}"`,
      servertime: serverTimestamp(),
    };
  },
};

export default userOps;
export { expiresTime, userOps };
