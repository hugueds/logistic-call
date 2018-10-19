import React, { Component } from 'react';
import axios from 'axios';
import { Button, Select, FormControl, MenuItem } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete'


import GroupList from '../components/GroupList';

import '../css/EditGroupContainer.css';

export default class GroupContainer extends Component {

  state = {
    groupId: 0,
    groupList: [],
    stationList: [],
    selectedGroup: null,
    selectedStation: null,
    newStation: 0
  }

  componentDidMount() {
    this.updateLists();
  }

  updateLists = () => {
    getGroups().then((groupList) => {
      const orderedGroupList = groupList.sort((a, b) => a._id > b._id);
      this.setState({ groupList: [...orderedGroupList], selectedGroup: null })
    });
    getStations().then((stationList) => {
      const orderedStationList = stationList.sort((a, b) => a.id > b.id);
      this.setState({ stationList: [...orderedStationList], selectedStation: null })
    })
  }

  addNewGroup = () => {
    axios.get('http://10.8.66.81:8083/api/groups/create').then(this.updateLists);
  };

  removeGroup = () => {
    const q = window.confirm('Deseja mesmo excluir este grupo?');
    if (!q) return;
    axios.delete('http://10.8.66.81:8083/api/groups/' + this.state.selectedGroup).then(this.updateLists);
  }

  addNewStationToGroup = (e) => {
    axios.post('http://10.8.66.81:8083/api/station', {
      _id: this.state.selectedGroup,
      station: +this.state.newStation
    })
      .then(this.updateLists);
  }

  removeStationFromGroup = (e) => {
    axios.delete('')
    axios.delete('http://10.8.66.81:8083/api/station/', {
      data: {
        _id: +this.state.selectedGroup,
        station: this.state.selectedStation
      }
    })
      .then(this.updateLists);
  }

  updateNewStation = (e) => {
    this.setState({ newStation: +e.target.value })
  }

  handleClickedGroup = (selectedGroup) => {
    this.setState(
      {
        selectedGroup,
        selectedStation: null
      }
    )
  }

  handleClickedStation = (selectedStation, selectedGroup) => {
    this.setState(
      { selectedStation, selectedGroup }
    )
  }


  render() {
    const { groupList, selectedGroup, stationList, selectedStation, newStation } = this.state;
    const options = stationList.map((s, k) => <MenuItem key={k} value={s.id} > {s.id} </MenuItem>);
    return (
      <div className="edit-group-container">

        <div className="edit-group-button-container">
          <div className="edit-group-button">
            <div className="edit-group-button-title" > ADICIONAR NOVO GRUPO </div>
            <div className="edit-group-button-element">
              <Button variant="fab" style={{ background: 'limegreen', color: 'white' }} onClick={this.addNewGroup}>
                <AddIcon />
              </Button>
            </div>

          </div>

          <div className="edit-group-button">
            <div className="edit-group-button-title" > REMOVER GRUPO </div>
            <div className="edit-group-button-element">
              <Button disabled={selectedGroup === null} variant="fab" color="secondary" onClick={this.removeGroup}>
                <DeleteIcon />
              </Button>
            </div>
          </div>
        </div>

        <div className="edit-station-container" style={{display : selectedGroup === null ? 'none' : null }}>

          <div className="edit-station-button-title">EDITAR POSTOS</div>

          <FormControl className="edit-station-select">
            <Select
              value={newStation}
              onChange={this.updateNewStation}
              
            >
              {options}
            </Select>
          </FormControl>

          <div className="edit-station-button-container">
            <Button variant="fab" onClick={this.addNewStationToGroup} >
              <AddIcon />
            </Button>
            <Button variant="fab" onClick={this.removeStationFromGroup} >
              <DeleteIcon />
            </Button>
          </div>

        </div>


        <GroupList
          handleClickedGroup={this.handleClickedGroup}
          handleClickedStation={this.handleClickedStation}
          items={groupList}
          stationList={stationList}
          selectedStation={selectedStation}
          selectedGroup={selectedGroup}
        />        

      </div>
      
    )
  }
}

async function getGroups() {
  return await fetch('http://10.8.66.81:8083/api/groups')
    .then((res) => res.json())
}

async function getStations() {
  return await fetch('/assets/data/stations.json')
    .then((res) => res.json())
}

