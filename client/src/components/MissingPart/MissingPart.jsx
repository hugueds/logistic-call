import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import Moment from 'moment';
import './MissingPart.css';

export default class MissingPart extends Component {
  render() {
    const { _id, part, buffer, module, date } = this.props.missingPart;   
    return (
      <div className="missing-part-row">
        <div className="missing-part-column mpc-part"> {part} </div>
        <div className="missing-part-column mpc-buffer"> {buffer} </div>
        <div className="missing-part-column mpc-module"> {module} </div>
        <div className="missing-part-column mpc-date"> {Moment(date).format('DD/MM - hh:mm')} </div>
        <div className="missing-part-column">
          <Button color="primary" variant="contained" id={_id} onClick={() => this.props.handleConfirm(this.props.missingPart)} > CONFIRMAR </Button>
        </div>
      </div>
    )
  }
}
