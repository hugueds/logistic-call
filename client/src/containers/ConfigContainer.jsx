import React, { Component } from 'react'

export default class ConfigContainer extends Component {

  saveChanges = () => {        
    localStorage.setItem('groupId', 10);
    window.location.href = '/';
  }

  render() {
    return (
      <div>
        <label htmlFor="select-group">GRUPO</label>
        <select id="select-group" >
          <option>1</option>
          <option>2</option>
          <option>3</option>
        </select>
        <button onClick={this.saveChanges} >SALVAR</button>
      </div>
    )
  }
}
