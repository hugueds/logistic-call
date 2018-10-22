import axios from 'axios';
import CONFIG from '../config';


async function getGroups() {
    const url = CONFIG.apiServer + '/api/groups';
    const response = await axios.get(url);
    return response.data;
}

async function getStations() {
    const url = '/assets/data/stations.json';
    const result = await axios.get(url);
    return result.data;
}

async function getPartsByGroup(groupId) {
    const url = CONFIG.apiServer + '/api/groups/' + groupId;
    const response = await axios.get(url);
    return response.data;
}

async function getPartsByBuffer(buffer) {
    const url = CONFIG.apiServer;
    const result = await axios.get(url);
    return result.data;
}

async function addNewGroup() {
    const result = await axios.get(CONFIG.apiServer + '/api/groups/create');
    return result.data;
};

async function removeGroup(group) {
    const q = window.confirm('Deseja mesmo excluir este grupo?');
    if (!q) return;
    const result = await axios.delete(CONFIG.apiServer + '/api/groups/' + group)
    return result.data;
}


async function addStationToGroup(group, station) {
    const object = {
        _id: group,
        station: station
    }
    const url = CONFIG.apiServer + '/api/station';
    const result = await axios.post(url, object);
    return result.data;
}

async function removeStationFromGroup(group, station) {
    const url = CONFIG.apiServer + '/api/station';
    const object = {
        data: {
            _id: group,
            station: station
        }
    }
    const result = await axios.delete(url, object);
    return result.data;
}

// const functions = [
//     addNewGroup,
//     getGroups,
//     getStations,
//     getPartsByGroup,
//     getPartsByBuffer,
//     removeGroup,
//     addStationToGroup,
//     removeStationFromGroup
// ]

// // console.log(functions);

export {
    getGroups,
    getStations,
    getPartsByBuffer,
    getPartsByGroup,
    addNewGroup,
    addStationToGroup,
    removeGroup,
    removeStationFromGroup
}
