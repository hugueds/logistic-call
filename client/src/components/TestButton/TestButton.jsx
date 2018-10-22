import React, { Component } from 'react'
import { Button } from '@material-ui/core';

export default class TestButton extends Component {        
  render() {
    const parameter = getRandomParameter();
    return (      
      <Button id="test-button" color="secondary" variant="contained" onClick={() => this.props.handleTestButton(parameter)} >TESTE!</Button>
    )
  }
}


function getRandomParameter() {
  
    const par = {
        part: Math.floor(Math.random() * (999999-1000 + 1)) + 1000,
        partNumber: Math.floor(Math.random() * (999999-1000 + 1)) + 1000,
        buffer: Math.floor(Math.random() * (99-1 + 1)) + 1,
        module: Math.floor(Math.random()* (99-1 + 1)) + 1,
        date: '30-10-2018'
    };
    return par;
}