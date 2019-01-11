import { dateFactory, watchData } from './data';
import {
  isString,
  serverTimestamp,
  respondError,
  readCheck,
  deepCopyObj,
} from './utils';

// Watch-related Create-Read-Update-Delete operations
// input ex: { location: "Boston, MA, USA", usageMS: 1000, ttfbMS: 30 }
const watchCRUD = {
  validate: (data) => {
    if (!data || typeof data === 'undefined') {
      return respondError(`missing data`);
    }

    if (
      !('location' in data) ||
      data.location === null ||
      !isString(data.location)
    ) {
      return respondError(`invalid 'location' value "${data.location}"`);
    }

    if (
      !('usageMS' in data) ||
      data.usageMS === null ||
      isNaN(data.usageMS)
    ) {
      return respondError(`invalid 'usageMS' value "${data.usageMS}"`);
    }

    if (
      !('ttfbMS' in data) ||
      data.ttfbMS === null ||
      isNaN(data.ttfbMS)
    ) {
      return respondError(`invalid 'ttfbMS' value "${data.ttfbMS}"`);
    }

    return { ok: true, msg: "OK: valid" };
  },

  create: (data) => {
    const { ok, msg } = watchCRUD.validate(data);
    if (!ok) { return respondError(msg); }

    // check if location value exists
    const location = data.location;
    const locationIndex = watchData.data.findIndex(data =>
      data[0] === location
    );

    if (locationIndex > -1) {
      return respondError(
        `failed to create; row with location value "${data.location}" ` +
        `already exists at index "${locationIndex}"`
      );
    }

    // if non-existent, insert
    const len = watchData.data.push([
      data.location,
      data.usageMS,
      data.ttfbMS,
    ]);
    const newID = len - 1;

    // respond with new value information and OK status
    return {
      title: watchData.title,
      data: [
        watchData.data[newID],
      ],
      ok: true,
      msg: `OK: inserted row with ID ${newID}`,
      servertime: serverTimestamp(),
    };
  },

  read: (id = -1, all = false) => {
    if (all) {
      const response = deepCopyObj(watchData);
      response.ok = true;
      response.msg = "OK: all rows requested";
      response.servertime = serverTimestamp();

      return response;
    }

    const { ok, msg } = readCheck(watchData, id);
    if (!ok) { return respondError(msg); }

    return {
      title: watchData.title,
      data: [
        watchData.data[id],
      ],
      ok: true,
      msg: `OK: row "${id}" requested`,
      servertime: serverTimestamp(),
    };
  },

  update: (id = -1, data) => {
    const { ok, msg } = watchCRUD.validate(data);
    if (!ok) { return respondError(msg); }

    const read = readCheck(watchData, id);
    if (!read.ok) { return respondError(read.msg); }

    watchData.data[id] = [
      data.location,
      data.usageMS,
      data.ttfbMS,
    ];

    return {
      title: watchData.title,
      data: [
        watchData.data[id],
      ],
      ok: true,
      msg: `OK: row "${id}" updated`,
      servertime: serverTimestamp(),
    };
  },

  destroy: (id = -1) => {
    const { ok, msg } = readCheck(watchData, id);
    if (!ok) { return respondError(msg); }

    // deletes row, capturing deleted data in array
    const deleted = watchData.data.splice(id, 1);

    // status update, returning deleted date our of courtesy
    return {
      title: watchData.title,
      data: deleted,
      ok: true,
      msg: `OK: row "${id}" deleted`,
      servertime: serverTimestamp(),
    };
  },
};

export default watchCRUD;
export { watchCRUD };
