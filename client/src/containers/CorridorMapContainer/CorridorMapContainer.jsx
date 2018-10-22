import React, { Component } from 'react'

import './CorridorMapContainer.css';

export default class CorridorMapContainer extends Component {
  render() {
    return (
      <div className="corridor-map-container">
        <div className="corridor">
            <img src="/assets/images/P27.png" alt="P27"/>
        </div>
        <div className="corridor">
            <img src="/assets/images/P30.png" alt="P30"/>
        </div>
      </div>
    )
  }
}
