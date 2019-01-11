import { dateFactory, distanceData } from './data';
import {
  isString,
  serverTimestamp,
  respondError,
  readCheck,
  deepCopyObj,
} from './utils';

// Distance-related Create-Read-Update-Delete operations
// input ex: { daysAgo: 0, location: "Boston, MA, USA", meters: 512 }
const distanceCRUD = {
  validate: (data) => {
    if (!data || typeof data === 'undefined') {
      return respondError(`missing data`);
    }

    if (
      !('daysAgo' in data) ||
      data.daysAgo === null ||
      isNaN(data.daysAgo)
    ) {
      return respondError(`invalid 'daysAgo' value "${data.daysAgo}"`);
    }

    if (
      !('location' in data) ||
      data.location === null ||
      !isString(data.location)
    ) {
      return respondError(`invalid 'location' value "${data.location}"`);
    }

    if (
      !('meters' in data) ||
      data.meters === null ||
      isNaN(data.meters)
    ) {
      return respondError(`invalid 'meters' value "${data.meters}"`);
    }

    return { ok: true, msg: "OK: valid" };
  },

  create: (data) => {
    const { ok, msg } = distanceCRUD.validate(data);
    if (!ok) { return respondError(msg); }

    // check if daysAgo value exists
    const daysAgo = dateFactory(data.daysAgo);
    const daysAgoIndex = distanceData.data.findIndex(data =>
      data[0].toString() === daysAgo.toString()
    );

    if (daysAgoIndex > -1) {
      return respondError(
        `failed to create; row with daysAgo value "${data.daysAgo}" ` +
        `already exists at index "${daysAgoIndex}"`
      );
    }

    // if non-existent, insert
    const len = distanceData.data.push([
      dateFactory(data.daysAgo),
      data.location,
      data.meters,
    ]);
    const newID = len - 1;

    // respond with new value information and OK status
    return {
      title: distanceData.title,
      data: [
        distanceData.data[newID],
      ],
      ok: true,
      msg: `OK: inserted row with ID ${newID}`,
      servertime: serverTimestamp(),
    };
  },

  read: (id = -1, all = false) => {
    if (all) {
      const response = deepCopyObj(distanceData);
      response.ok = true;
      response.msg = "OK: all rows requested";
      response.servertime = serverTimestamp();

      return response;
    }

    const { ok, msg } = readCheck(distanceData, id);
    if (!ok) { return respondError(msg); }

    return {
      title: distanceData.title,
      data: [
        distanceData.data[id],
      ],
      ok: true,
      msg: `OK: row "${id}" requested`,
      servertime: serverTimestamp(),
    };
  },

  update: (id = -1, data) => {
    const { ok, msg } = distanceCRUD.validate(data);
    if (!ok) { return respondError(msg); }

    const read = readCheck(distanceData, id);
    if (!read.ok) { return respondError(read.msg); }

    distanceData.data[id] = [
      dateFactory(data.daysAgo),
      data.location,
      data.meters,
    ];

    return {
      title: distanceData.title,
      data: [
        distanceData.data[id],
      ],
      ok: true,
      msg: `OK: row "${id}" updated`,
      servertime: serverTimestamp(),
    };
  },

  destroy: (id = -1) => {
    const { ok, msg } = readCheck(distanceData, id);
    if (!ok) { return respondError(msg); }

    // deletes row, capturing deleted data in array
    const deleted = distanceData.data.splice(id, 1);

    // status update, returning deleted date our of courtesy
    return {
      title: distanceData.title,
      data: deleted,
      ok: true,
      msg: `OK: row "${id}" deleted`,
      servertime: serverTimestamp(),
    };
  },
}

export default distanceCRUD;
export { distanceCRUD };
