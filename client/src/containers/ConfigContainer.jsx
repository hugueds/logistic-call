import React, { Component } from 'react';
import { Button, Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';


import GroupList from '../components/GroupList';

export default class ConfigContainer extends Component {

  constructor(props) {
    super(props);
    localStorage.removeItem('groupId');
  }

  state = {
    groupId: 0,
    groupList: []
  }


  componentDidMount() {
    getGroups().then((groupList) => {
      const orderedGroupList = groupList.sort((a, b) => a._id > b._id);
      this.setState({ groupList: [...orderedGroupList] })
    });
  }

  updateGroupId = (e) => {
    this.setState({
      groupId: e.target.value
    });
  }

  handle = () => {
    
  }

  saveChanges = () => {
    localStorage.setItem('groupId', this.state.groupId);
    window.location.href = '/';
  }

  render() {
    const { groupList } = this.state;
    // const options = groupList.map((g, key) => <option key={key}> {g._id} </option>);
    const options = groupList.map((g, key) => <MenuItem key={key} value={+g._id}>{g._id.toString()}</MenuItem>);
    return (

      <div className="config-container" >
        <div className="group-selection">
          <FormControl className="group-select">
            <InputLabel htmlFor="group-select"> SELECIONE UM GRUPO</InputLabel>
            <Select
              value={this.state.groupId}
              onChange={this.updateGroupId}
              inputProps={{ name: 'group', id: 'group-select' }} >
              {options}
            </Select>
          </FormControl>

          <Button color="primary" variant="contained" onClick={this.saveChanges} >SALVAR </Button>

        </div>

        <GroupList
          items={groupList}
          handleClickedGroup={this.handle}
          handleClickedStation={this.handle}
        />

      </div>
    )
  }
}

async function getGroups() {
  return await fetch('http://10.8.66.81:8083/api/groups')
    .then((res) => res.json())
}
