import React, { Component } from 'react';
import '../css/ConfigContainer.css';

export default class GroupList extends Component {
  render() {
    const { items } = this.props;
    return (
      <div className="available-groups-container">
        <div className="group-title"> GRUPOS </div>
        <div className="groups-container-body">
        {
          items.map((g, k) => {
            return (
              <div className="group-wrapper">
                <div className="group-header" key={k}> GRUPO {g._id} </div>
                {
                  g.station.map((s,k2) => {
                    return (
                      <div className="group-station" key={k2}> {s} </div>
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
