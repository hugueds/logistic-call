import React, { Component } from 'react';
import axios from 'axios';
import CONFIG from '../config';

import MissingPart from '../components/MissingPart';
import { emit, subscribe } from '../socketClient';

import '../css/MainContainer.css';

import TestButton from '../components/TestButton';



export default class MainContainer extends Component {

    constructor(props) {

        super(props);

        const groupId = localStorage.getItem('groupId');
        this.audio = window.document.querySelector('audio');

        if (groupId === null) {
            window.location.href = '/config';
        }

        this.state = {
            groupId: +groupId,
            partList: [...partList]
        };

        this.getPartsByGroup(this.state.groupId);

        subscribe('list update', this.handlePartEvent);
    }

    getPartsByGroup = (groupId) => {
        const url = CONFIG.apiServer + '/api/groups/' + groupId;
        axios.get(url).then(partList => this.setState({ partList: [...partList.data] }))
        // axios.get(url).then(partList => console.log(partList))
    }


    handlePartEvent = (err, data) => {
        // faz uma requisição baseada no ID do grupo
        // atualiza todas as peças               
        // this.audio.load();

        this.getPartsByGroup(this.state.groupId);
        if (data) {
            console.log('Data received from socket:',data);      
            if (!data.mute)  {                
                document.querySelector('#test-button').click()
            }
        } 
    }

    handleTestButton = (parameter) => {        
        this.audio.play();        
        const pl = [...this.state.partList, parameter];
        this.setState({
            partList: pl
        })
        console.log(parameter);
    }

    handleConfirm = (missingPart) => {
        let part = this.state.partList.find(p => p._id == missingPart._id);
        if (!part) {
            part =  {
                _id : 0
            }
        }
        console.log(part)
        emit('confirm part', part);
    }


    render() {

        return (
            <div className="wrapper">
                
                <div className="" > GROUP ID: {this.state.groupId}</div>
                <div className="header" >
                    <div> PEÇA </div>
                    <div> BUFFER </div>
                    <div> MODULO </div>
                    <div> DATA </div>
                    <div>  </div>
                </div>
                <div className="missing-part-container">
                    {
                        this.state.partList.map((p, key) => <MissingPart id={key} key={key} missingPart={p} handleConfirm={this.handleConfirm} />)
                    }
                </div>
                <TestButton handleTestButton={this.handleTestButton} />
            </div>
        )
    }


}

const partList = [
    { _id: 0, part: 0, module: 0, buffer: 0, date: 0 }
];

