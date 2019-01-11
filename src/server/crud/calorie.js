import { dateFactory, calorieData } from './data';
import {
  isString,
  serverTimestamp,
  respondError,
  readCheck,
  deepCopyObj,
} from './utils';

// Calorie-related Create-Read-Update-Delete operations
// input ex: { daysAgo: 0, calories: 444 }
const calorieCRUD = {
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
      !('calories' in data) ||
      data.calories === null ||
      isNaN(data.calories)
    ) {
      return respondError(`invalid 'calories' value "${data.calories}"`);
    }

    return { ok: true, msg: "OK: valid" };
  },

  create: (data) => {
    const { ok, msg } = calorieCRUD.validate(data);
    if (!ok) { return respondError(msg); }

    // check if daysAgo value exists
    const daysAgo = dateFactory(data.daysAgo);
    const daysAgoIndex = calorieData.data.findIndex(data =>
      data[0].toString() === daysAgo.toString()
    );

    if (daysAgoIndex > -1) {
      return respondError(
        `failed to create; row with daysAgo value "${data.daysAgo}" ` +
        `already exists at index "${daysAgoIndex}"`
      );
    }

    // if non-existent, insert
    const len = calorieData.data.push([
      dateFactory(data.daysAgo),
      data.calories,
    ]);
    const newID = len - 1;

    // respond with new value information and OK status
    return {
      title: calorieData.title,
      data: [
        calorieData.data[newID],
      ],
      ok: true,
      msg: `OK: inserted row with ID ${newID}`,
      servertime: serverTimestamp(),
    };
  },

  read: (id = -1, all = false) => {
    // return all, if requested
    if (all) {
      const response = deepCopyObj(calorieData);
      response.ok = true;
      response.msg = "OK: all rows requested";
      response.servertime = serverTimestamp();

      return response;
    }

    const { ok, msg } = readCheck(calorieData, id);
    if (!ok) { return respondError(msg); }

    // otherwise, return row
    return {
      title: calorieData.title,
      data: [
        calorieData.data[id],
      ],
      ok: true,
      msg: `OK: row "${id}" requested`,
      servertime: serverTimestamp(),
    };
  },

  // ignores daysAgo on update
  update: (id = -1, data) => {
    const { ok, msg } = calorieCRUD.validate(data);
    if (!ok) { return respondError(msg); }

    const read = readCheck(calorieData, id);
    if (!read.ok) { return respondError(read.msg); }

    calorieData.data[id] = [
      dateFactory(data.daysAgo),
      data.calories,
    ];

    return {
      title: calorieData.title,
      data: [
        calorieData.data[id],
      ],
      ok: true,
      msg: `OK: row "${id}" updated`,
      servertime: serverTimestamp(),
    };
  },

  destroy: (id = -1) => {
    const { ok, msg } = readCheck(calorieData, id);
    if (!ok) { return respondError(msg); }

    // deletes row, capturing deleted data in array
    const deleted = calorieData.data.splice(id, 1);

    // status update, returning deleted date our of courtesy
    return {
      title: calorieData.title,
      data: deleted,
      ok: true,
      msg: `OK: row "${id}" deleted`,
      servertime: serverTimestamp(),
    };
  },
};

export default calorieCRUD;
export { calorieCRUD };
