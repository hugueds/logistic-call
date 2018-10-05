import React, { Component } from 'react';
import MissingPart from '../components/MissingPart';
import { emit, subscribe } from '../socketClient';

export default class MainContainer extends Component {

    constructor(props) {

        super(props);

        const groupId = localStorage.getItem('groupId');

        if (groupId === null) {
            window.location.href = '/config';
        }

        this.state = {
            groupId: +groupId,
            partList: []
        }

        subscribe('dec-part', this.handlePartEvent);
        emit('ping', 'pong');

    }


    handlePartEvent = (err, data) => {
        console.log(data);
    }


    render() {

        return (
            <div>
                <div>GROUP ID: {this.state.groupId}</div>
                {
                    partList.map((p, key) => <MissingPart key={key} missingPart={p} />)
                }
            </div>
        )
    }


}

const partList =
    [
        { partNumber: '123', buffer: '123', module: '123', date: 123 },
        { partNumber: '111', buffer: '111', module: '111', date: 111 },
        { partNumber: '222', buffer: '222', module: '222', date: 222 },
        { partNumber: '333', buffer: '333', module: '333', date: 333 },
    ]
