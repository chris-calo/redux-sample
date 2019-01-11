import fetch from 'isomorphic-fetch';

// public API
export const REQUEST_FEED  = 'REQUEST_FEED';
export const RECEIVE_FEED  = 'RECEIVE_FEED';
export const FILTER_FEED   = 'FILTER_FEED';
export const SORT_FEED     = 'SORT_FEED';
export const SHOW_MORE     = 'SHOW_MORE';
export const SHOW_CONTINUE = 'SHOW_CONTINUE';

// uses flags and bitmasks for sorting
// if bit 0x400 is set, sorts in descending order
export const SORT_DESC     = 0x400;
export const SORT_MASK     = 0x3FF;
export const SORTERS       = {
  LAST_NAME:  0x001,
  AGE:        0x002,
  BIRTHPLACE: 0x004,
  BIRTHDATE:  0x008,
  HEIGHT:     0x010,
  WEIGHT:     0x020,
  POSITION:   0x040,
  INJURY:     0x080,
  TEAM:       0x100,
  NUMBER:     0x200,
};


// action to filter feed by a requested athlete name
export const filterFeed   = name => {
  return {
    type: FILTER_FEED,
    filterName: name,
  };
};

// action to sort feed by a particular method
export const sortFeed     = method => {
  return {
    type: SORT_FEED,
    sortMethod: method,
  };
};

// enables automatic "loading" while scrolling
export const showMore     = (amount = 20) => {
  return {
    type: SHOW_MORE,
    amount: amount,
  };
};

// enables ability to manually continue load-scrolling (see above)
export const showContinue   = (amount = 20) => {
  return {
    type: SHOW_CONTINUE,
    amount: amount,
  };
};

// private API
const requestFeed  = url => {
  return {
    type: REQUEST_FEED,
    url: url,
  };
};

const receiveFeed  = (url, json, descending) => {
  const stats = json.cumulativeplayerstats.playerstatsentry || [];
  return {
    type: RECEIVE_FEED,
    url: url,
    playerStats: descending ? stats.reverse() : stats,
    receivedAt: Date.now(),
  };
};

// tries its best to load data from mysportsfeeds.com
// however, non-commercial accounts are extremely limited
// so, if it can't, we can use saved data
const fetchFeed  = (filterName = '', sortMethod) => {
  return dispatch => {
    const baseURL  = 'https://api.mysportsfeeds.com/v1.2/pull';
    const path     = '/nhl/2017-2018-regular/cumulative_player_stats.json';

    let sortBy   = '';
    switch (sortMethod & SORT_MASK) {
      case SORTERS.LAST_NAME:
        sortBy = 'player.lastname';
        break;
      case SORTERS.AGE:
        sortBy = 'player.age';
        break;
      case SORTERS.BIRTHPLACE:
        sortBy = 'player.birthplace';
        break;
      case SORTERS.BIRTHDATE:
        sortBy = 'player.age';
        break;
      case SORTERS.HEIGHT:
        sortBy = 'player.height';
        break;
      case SORTERS.WEIGHT:
        sortBy = 'player.weight';
        break;
      case SORTERS.POSITION:
        sortBy = 'player.position';
        break;
      case SORTERS.INJURY:
        sortBy = 'player.injury';
        break;
      case SORTERS.TEAM:
        sortBy = 'player.team';
        break;
      case SORTERS.NUMBER:
        sortBy = 'player.number';
        break;
      default:
        sortBy = '';
        break;
    }

    let params     = '';
    if (filterName.length || sortBy.length) {
      params = '?';

      if (filterName.length) params += `player=${filterName}`;
      if (sortBy.length) params += `sort=${sortBy}`;
    }

    const url      = `${baseURL}${path}${params}`;
    const auth     = `${process.env.MSF_KEY}:${process.env.MSF_PASS}`;

    dispatch(requestFeed(url));

    return fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + btoa(auth),
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      // load actual data if possible
      if (response.ok) return response.json();

      // if not, try to load fallback data
      const savedData = require('./mysportsfeedsdata.js').default;
      return savedData;
    })
    .then(json => {
      return dispatch(receiveFeed(url, json, !!+(sortMethod & SORT_DESC)));
    });
  };
};

const shouldFetchFeed = (state) => {
  const playerStats = state.playerStats;
  if (state.isFetching) return false;

  if (!playerStats || !playerStats.length || playerStats.length < 1) {
    return true;
  }

  return false;
}

export const fetchFeedIfNeeded = (filterName, sortMethod) => {
  return (dispatch, getState) => {
    if (shouldFetchFeed(getState())) {
      return dispatch(fetchFeed(filterName, sortMethod));
    }
  };
};
