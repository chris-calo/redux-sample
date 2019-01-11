import Fuse from 'fuse.js';
import { combineReducers } from 'redux';
import {
  REQUEST_FEED,
  RECEIVE_FEED,
  FILTER_FEED,
  SORT_FEED,
  SHOW_MORE,
  SHOW_CONTINUE,
  SORTERS,
} from './actions';

// configuration for fuzzy searcher; MySportsFeeds' is junk/non-functional
const fuseConfig = {
  shouldSort: false,
  tokenize: true,
  threshold: 0.35,
  location: 0,
  distance: 20,
  maxPatternLength: 20,
  minMatchCharLength: 2,
  keys: [
    "player.FirstName",
    "player.LastName",
    "team.Name",
  ],
}

// reducer, essentially traverses over actions, giving them meaning
const feed = (state = {
  isFetching:      false,
  playerStats:     [],
  filteredStats:   [],
  filterName:      '',
  sortMethod:      SORTERS.LAST_NAME,
  showCount:       40,
  infiniteScroll:  true,
  scrollThreshold: 100,
}, action) => {
  switch (action.type) {
    case REQUEST_FEED:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case RECEIVE_FEED:
      return Object.assign({}, state, {
        isFetching: false,
        playerStats: action.playerStats,
        showCount: 40,
        infiniteScroll: true,
        scrollThreshold: 100,
        lastUpdated: action.receivedAt,
      });
    case FILTER_FEED:
      const fuse = new Fuse(state.playerStats, fuseConfig);
      const searchTerm = (action.filterName || '').trim();
      const results = searchTerm.length > 0 ? fuse.search(searchTerm) : [];

      return Object.assign({}, state, {
        filterName: searchTerm,
        filteredStats: results,
      });
    case SORT_FEED:
      const { sortMethod } = action;
      return Object.assign({}, state, {
        sortMethod: action.sortMethod,
      });
    case SHOW_MORE:
      const showMoreCount =  state.showCount + action.amount;
      return Object.assign({}, state, {
        showCount: showMoreCount,
        infiniteScroll: showMoreCount < state.scrollThreshold,
      });
    case SHOW_CONTINUE:
      const showContCount = state.showCount + action.amount;
      const threshold = state.scrollThreshold + 100;
      return Object.assign({}, state, {
        showCount: showContCount,
        infiniteScroll: true,
        scrollThreshold: threshold,
      });
    default:
      return state;
  }
};

const rootReducer = combineReducers({ feed });

export default rootReducer;
