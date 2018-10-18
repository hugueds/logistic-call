import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import { ListItemIcon, ListItemText } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

export default class Navbar extends Component {

    state = {
        anchorEl: null
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    handleReload = () => {
        window.location.reload();
    }

    render() {
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            <div className="app-bar">
                <AppBar style={{ backgroundColor: '#393840' }} position="sticky">
                    <Toolbar>
                        <IconButton
                            aria-label="Menu"
                            aria-owns={open ? 'main-menu' : null}
                            color="inherit" onClick={this.handleClick} aria-haspopup="true">
                            <MenuIcon />
                        </IconButton>

                        <Menu id="main-menu" anchorEl={anchorEl} open={open} onClose={this.handleClose} >
                        
                            <MenuItem onClick={this.handleClose}>
                                <ListItemIcon>
                                    <SendIcon />
                                </ListItemIcon>

                                <NavLink className="not-selected" activeClassName="selected" to="/home">
                                    <ListItemText  primary="INICIO" />
                                </NavLink>
                            </MenuItem>

                            <MenuItem onClick={this.handleClose} >
                                <NavLink className="not-selected" activeClassName="selected" to="/config" >
                                DISPOSITIVO
                                </NavLink>
                            </MenuItem>
                            <MenuItem onClick={this.handleClose} >
                                <NavLink className="not-selected" activeClassName="selected" to="/groups" >GRUPOS</NavLink>
                            </MenuItem>
                            <MenuItem onClick={this.handleClose}>
                                SOBRE
                            </MenuItem>
                            <MenuItem onClick={this.handleReload}>
                                RECARREGAR
                            </MenuItem>
                        </Menu>

                        <Typography variant="h6" color="inherit" >
                            LOGISTICS CALL
                        </Typography>

                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}
