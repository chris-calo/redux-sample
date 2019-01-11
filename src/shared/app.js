import fetch from 'isomorphic-fetch';

import React from 'react';
import Loading from './loading';
import Display from './display';
import { initStore } from './store';
import { Provider, connect } from 'react-redux';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import {
  SORT_DESC,
  fetchFeedIfNeeded,
  filterFeed,
  filterClear,
  sortFeed,
  showMore,
  showContinue,
} from './actions';

import './common/base.scss';
import './common/fonts.scss';
import './common/reset.scss';

const store = initStore();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.mounted = false;
  }

  // called on initialization and integration with DOM
  componentDidMount() {
    this.mounted = true;

    const { dispatch, sortMethod } = this.props;
    dispatch(fetchFeedIfNeeded(sortMethod));

    // ensure we bind to window only when global is present
    // check ensures this will not be run server-side
    if (__isBrowser__ && this.mounted) {
      this.scrollCallback = () => this.handleScroll();
      window.addEventListener("scroll", this.scrollCallback);
    }
  }

  // called when App instance falls out of scope
  componentWillUnmount() {
    this.mounted = false;
    if (__isBrowser__) window.removeEventListener(this.scrollCallback);
  }

  // called when state updates
  componentDidUpdate(prevProps) {
    const sortDiff   = this.props.sortMethod !== prevProps.sortMethod;

    if (sortDiff) {
      const { dispatch, sortMethod } = this.props;
      dispatch(fetchFeedIfNeeded(sortMethod));
    }
  }

  // increments display counter, allowing for more digestible row count
  paginate(items, count) {
    return items.slice(0, count);
  }

  handleScroll() {
    if (__isBrowser__ && this.mounted) {
      const { dispatch, infiniteScroll } = this.props;

      // if max reached without manual input, wait
      if (!infiniteScroll) return;

      const scrollHeight = window.innerHeight + window.scrollY;
      const offsetHeight = document.body.offsetHeight;

      // if we've scrolled to the bottom, load more elements
      if (scrollHeight >= offsetHeight) dispatch(showMore());
    }
  }

  // prevents user for scrolling indefinitely (i.e. – allows viewing of footer)
  continueManually() {
    const { dispatch } = this.props;
    dispatch(showContinue());
  }

  // updates state to match desired sort preferences
  sortBy(method) {
    const { dispatch, sortMethod, filterName } = this.props;
    if (filterName.length) return;

    const tempMethod = sortMethod === method ? method | SORT_DESC : method;

    dispatch(sortFeed(tempMethod));
    dispatch(fetchFeedIfNeeded(tempMethod));
  }

  // updates state to match desired filter term
  filterBy(name) {
    const { dispatch, sortMethod } = this.props;
    dispatch(filterFeed(name));
  }

  // removes any existing filters on the data set
  filterClear() {
    const { dispatch } = this.props;
    dispatch(filterClear());
  }

  render() {
    const {
      sortMethod,
      playerStats,
      filteredStats,
      filterName,
      showCount,
      infiniteScroll,
    } = this.props;

    // determine meaningful stats, as defined by state
    const stats = filteredStats.length > 0 ? filteredStats : playerStats;

    // build display components
    return (
      <div id="app">
        {
          this.props.isFetching ?
          (
            <Loading />
          ) :
          (
            <Display
            sortBy={method => this.sortBy(method)}
            filterBy={name => this.filterBy(name)}
            filterClear={() => this.filterClear()}
            continueManually={() => this.continueManually()}
            filterName={filterName}
            sortMethod={sortMethod}
            infiniteScroll={infiniteScroll}
            playerStats={this.paginate(stats, showCount)}
            />
          )
        }
      </div>
    );
  }
}

// redux helper
const mapStateToProps = (state) => {
  const {
    isFetching,
    playerStats,
    filteredStats,
    filterName,
    sortMethod,
    showCount,
    infiniteScroll,
  } = state.feed;

  return {
    isFetching,
    playerStats,
    filteredStats,
    filterName,
    sortMethod,
    showCount,
    infiniteScroll,
  };
};

// setup App as a redux-connected component
const ConnectedApp = connect(mapStateToProps)(App);

// technically the thin, parent component
class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedApp />
      </Provider>
    );
  }
}

export default Root;
