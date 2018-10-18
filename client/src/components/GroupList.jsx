import React, { Component } from 'react';
// import { Button } from '@material-ui/core';
import '../css/ConfigContainer.css';

export default class GroupList extends Component {

  render() {
    const { items } = this.props;
    const { selectedStation, selectedGroup } = this.props;
    return (
      <div className="available-groups-container">
        <div className="group-title"> GRUPOS </div>
        <div className="groups-container-body">
          {
            items.map((g, k) => {
              return (
                <div key={k} className="group-wrapper">
                  <div                    
                    className={selectedGroup === g._id ? 'group-header group-header-selected' : 'group-header'}
                    onClick={() => this.props.handleClickedGroup(g._id)}
                  >
                    GRUPO {g._id}                    
                  </div>
                  {
                    g.station.map((s, k2) => {
                      return (
                        <div
                          key={k2}
                          className={selectedStation === s && selectedGroup === g._id ? 'group-station group-station-selected' : 'group-station'}
                          onClick={() => this.props.handleClickedStation(s, g._id)}
                        >
                          {s}
                        </div>
                      )
                    })
                  }
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}
