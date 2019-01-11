import React from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

class Feed extends React.Component {
  componentDidMount() {
    var xhr = new XMLHttpRequest();

    xhr.open(
      "GET",
      "https://api.mysportsfeeds.com/v1.2/pull/nhl/2017-2018-regular/" +
      "cumulative_player_stats.json"
    );

    xhr.setRequestHeader(
      "Authorization",
      "Basic " + btoa(`${process.env.MSF_KEY}:${process.env.MSF_PASS}`)
    );

    xhr.send();
  }

  render() {
    return (
      <div className="feed-view">
        <div>{process.env.MSF_KEY}:{process.env.MSF_PASS}</div>
      </div>
    );
  }
}

export default withRouter(props => <Feed {...props} />);
