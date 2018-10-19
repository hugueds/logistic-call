import React, { Component } from 'react';
import { Button, FormControl, Select} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';


export default class EditStation extends Component {

    state = {
        newStation: 0        
    }

    getStations() {

    }

    render() {
        const { selectedGroup, stationList } = this.props;
        const { newStation } = this.state;
        return (
            <div className="edit-station-container" style={{ display: selectedGroup === null ? 'none' : null }}>

                <div className="edit-station-button-title">EDITAR POSTOS</div>

                <FormControl className="edit-station-select">
                    <Select
                        value={newStation}
                        onChange={this.updateNewStation}

                    >
                        {/* {options} */}
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
        );
    }
}

