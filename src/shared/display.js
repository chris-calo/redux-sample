import React from 'react';
import { hyphenate } from './utils';
import { SORTERS, SORT_DESC, SORT_MASK } from './actions';

class Display extends React.Component {
  // loads project-local SVG team logo image, as a link
  teamImageSrc(name) {
    const slug = hyphenate(name);
    return require(`./common/images/team-logos/${slug}.svg`);
  }

  // ensures jersey number is at least 2 digits
  normalizeInt(number, mindigits = 2, minval = 1) {
    const temp = `${number || ''}`;

    if (temp.length < 1 || parseInt(temp) < minval) {
      return '?'.repeat(mindigits);
    } else if (temp.length < mindigits) {
      const delta = mindigits - temp.length;
      return `${'0'.repeat(delta)}${temp}`;
    }

    return temp;
  }

  // generates a sort direction (if applicable)
  sortDirection(target, sortMethod) {
    if (target !== (sortMethod & SORT_MASK)) return null;
    return sortMethod & SORT_DESC ? (
      <span className="sort-direction">&#9650;</span>
    ) : (
      <span className="sort-direction">&#9660;</span>
    );
  }

  // handles submission of the filter form
  filterSubmit(e) {
    e.preventDefault();

    const form = e.target || e.srcElement;
    const input = form.querySelector('input[name="filter"]');
    this.props.filterBy(input.value);
  }

  render() {
    const {
      sortBy,
      continueManually,
      playerStats,
      sortMethod,
      filterName,
      infiniteScroll,
    } = this.props;

    // create table rows and data cells
    const stats = playerStats.map((stats, index) => {
      const { player, team } = stats;

      return (
        <tr key={`${player.id}-${index}`}>
          <td className="team-name">
            <img
            className="team-logo"
            src={this.teamImageSrc(team.Name)}
            height="20" />
            <span className="player-team">{team.City} {team.Name}</span>
          </td>
          <td className="player-number right-align">
            #{this.normalizeInt(player.JerseyNumber, 2)}
          </td>
          <td className="player-name">
            {player.LastName}, {player.FirstName}
          </td>
          <td className="player-position">
            {player.Position}
          </td>
          <td className="player-age right-align">
            {this.normalizeInt(player.Age, 2)}
          </td>
          <td className="player-height right-align">
            {this.normalizeInt(player.Height, 3)}
          </td>
          <td className="player-weight right-align">
            {this.normalizeInt(player.Weight, 3)} lbs.
          </td>
        </tr>
      );
    });

    // create table and controls
    return (
      <div className="display">
        <div className="filter">
          <form onSubmit={(e) => this.filterSubmit(e)}>
            <input type="text" name="filter"
            placeholder="Search by Player or Team Name"
            defaultValue={filterName.length ? filterName : ""} />
            <input type="submit" value="Search" />
          </form>
        </div>
        <table>
          <tbody>
            <tr>
              <th onClick={() => sortBy(SORTERS.TEAM)}>
                <span className="label">Team Name</span>
                {this.sortDirection(SORTERS.TEAM, sortMethod)}
              </th>
              <th className="right-align"
              onClick={() => sortBy(SORTERS.NUMBER)}>
                <span className="label">Number</span>
                {this.sortDirection(SORTERS.NUMBER, sortMethod)}
              </th>
              <th onClick={() => sortBy(SORTERS.LAST_NAME)}>
                <span className="label">Name (Last, First)</span>
                {this.sortDirection(SORTERS.LAST_NAME, sortMethod)}
              </th>
              <th onClick={() => sortBy(SORTERS.POSITION)}>
                <span className="label">Position</span>
                {this.sortDirection(SORTERS.POSITION, sortMethod)}
              </th>
              <th className="right-align"
              onClick={() => sortBy(SORTERS.AGE)}>
                <span className="label">Age</span>
                {this.sortDirection(SORTERS.AGE, sortMethod)}
              </th>
              <th className="right-align"
              onClick={() => sortBy(SORTERS.HEIGHT)}>
                <span className="label">Height</span>
                {this.sortDirection(SORTERS.HEIGHT, sortMethod)}
              </th>
              <th className="right-align"
              onClick={() => sortBy(SORTERS.WEIGHT)}>
                <span className="label">Weight</span>
                {this.sortDirection(SORTERS.WEIGHT, sortMethod)}
              </th>
            </tr>
            {stats}
          </tbody>
        </table>
        {
          !infiniteScroll ?
          (
            <button onClick={() => continueManually()}>Show More</button>
          ) : null
        }
      </div>
    );
  }
}

export default Display;
