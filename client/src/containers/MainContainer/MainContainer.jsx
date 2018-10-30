import React, { Component } from 'react';
import MissingPart from '../../components/MissingPart';

import { isSafari } from '../../utils/functions';
import { emit, subscribe } from '../../utils/socketClient';

import './MainContainer.css';

// import TestButton from '../../components/TestButton';

import { getPartsByGroup } from '../../utils/apiCalls';

export default class MainContainer extends Component {

    constructor(props) {

        super(props);

        const groupId = localStorage.getItem('groupId');
        this.dingDong = window.document.querySelector('#ding-dong');
        this.dingDong.load();
        this.beep = window.document.querySelector('#beep');

        if (groupId === null) {
            window.location.href = '/config';
        }

        this.state = {
            groupId: +groupId,
            partList: []
        };

        getPartsByGroup(this.state.groupId).then(p => this.setState({ partList: [...p] }));

        subscribe('list update', this.handlePartEvent);
    }

    handlePartEvent = (err, data) => {
        getPartsByGroup(this.state.groupId).then(p => this.setState({ partList: [...p] }));
        if (data) {
            console.log('Data received from socket:', data);
            if (!data.mute) {
                if (!isSafari()) {        
                    this.dingDong.load();                
                    this.dingDong.play();
                }
                // document.querySelector('#test-button').click()
            }
        }
    }

    handleTestButton = (parameter) => {
        // this.audio.play();
        this.beep.play();

        const pl = [...this.state.partList, parameter];
        this.setState({
            partList: pl
        })
        console.log(parameter);
    }

    handleConfirm = (missingPart) => {
        let part = this.state.partList.find(p => p._id === missingPart._id);
        if (!part) {
            part = {
                _id: 0
            }
        }
        emit('confirm part', part);
    }


    render() {

        return (
            <div className="wrapper">

                <div className="group-id-title" > GRUPO {this.state.groupId}</div>
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
                {/* <TestButton handleTestButton={this.handleTestButton} /> */}
            </div>
        )
    }


}

