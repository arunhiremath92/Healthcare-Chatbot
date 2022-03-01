import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ScheduleIcon from '@mui/icons-material/Schedule';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import Divider from '@mui/material/Divider';

export default function ListItemsDoctor() {

    let navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/');
    }

    return(
        <>
            <ListItemButton onClick={() => { navigate('/doctor-dashboard')}}>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItemButton>
            <ListItemButton onClick={() => { navigate('/doctor-consultation')}}>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Chat Room" />
            </ListItemButton>
            <ListItemButton onClick={() => { navigate('/doctor-appointment')}}>
                <ListItemIcon>
                    <ScheduleIcon />
                </ListItemIcon>
                <ListItemText primary="My Schedule" />
            </ListItemButton>
            <ListItemButton onClick={() => { navigate('/records')}}>
                <ListItemIcon>
                    <FilePresentIcon />
                </ListItemIcon>
                <ListItemText primary="Records" />
            </ListItemButton>

            <Divider sx={{ my: 1 }} />

            <ListSubheader component="div" inset>
                Settings
            </ListSubheader>
            <ListItemButton onClick={() => { navigate('/doctor-profile')}}>
                <ListItemIcon>
                    <ManageAccountsIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" />
            </ListItemButton>
            <ListItemButton onClick={logout}>
                <ListItemIcon>
                    <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Log out" />
            </ListItemButton>
        </>
    )
}