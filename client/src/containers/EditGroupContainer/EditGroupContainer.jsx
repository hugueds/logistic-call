import React, { Component } from 'react';
import { Button, Select, FormControl, MenuItem } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

import { 
  getGroups, 
  getStations, 
  addNewGroup, 
  addStationToGroup, 
  removeStationFromGroup, 
  removeGroup } from '../../utils/apiCalls';

import GroupList from '../../components/GroupList';

import './EditGroupContainer.css';

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

  addNewStationToGroup = () => {
    addStationToGroup(this.state.selectedGroup, this.state.newStation).then(this.updateLists);
  }

  removeStationFromGroup = () => {
    removeStationFromGroup(this.state.selectedGroup, this.state.selectedStation).then(this.updateLists);
  }

  handleNewGroup = () => {
    addNewGroup().then(this.updateLists);
  }

  handleRemoveGroup = () => {
    const group = this.state.selectedGroup;
    removeGroup(group).then(this.updateLists);
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
              <Button variant="fab" style={{ background: 'limegreen', color: 'white' }} onClick={this.handleNewGroup}>
                <AddIcon />
              </Button>
            </div>

          </div>

          <div className="edit-group-button">
            <div className="edit-group-button-title" > REMOVER GRUPO </div>
            <div className="edit-group-button-element">
              <Button disabled={selectedGroup === null} variant="fab" color="secondary" onClick={this.handleRemoveGroup}>
                <DeleteIcon />
              </Button>
            </div>
          </div>
        </div>

        <div className="edit-station-container" style={{ display: selectedGroup === null ? '' : null }}>

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
            <Button variant="fab" mini color="primary" onClick={this.addNewStationToGroup} disabled={this.state.selectedGroup === null}>
              <AddIcon />
            </Button>
            <Button variant="fab" mini color="secondary" onClick={this.removeStationFromGroup} disabled={this.state.selectedStation === null}>
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


// async function getStations() {
//   return await fetch('/assets/data/stations.json')
//     .then((res) => res.json())
// }

