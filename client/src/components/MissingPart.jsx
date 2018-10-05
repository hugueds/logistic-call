import React, { Component } from 'react'

export default class MissingPart extends Component {
  render() {
    const { partNumber, buffer, module, date } = this.props.missingPart;
    return (
      <div>
        <div>{partNumber}</div>
        <div>{buffer}</div>
        <div>{module}</div>
        <div>{date}</div>
        <div>
          <button>CONFIRMAR</button>
        </div>
      </div>
    )
  }
}
