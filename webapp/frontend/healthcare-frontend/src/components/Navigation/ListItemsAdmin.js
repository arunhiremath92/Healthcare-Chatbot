import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import Divider from '@mui/material/Divider';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import FeedbackIcon from '@mui/icons-material/Feedback';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SmartToyIcon from '@mui/icons-material/SmartToy';

export default function ListItemsAdmin() {

    let navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/');
    }

    return(
        <>
            <ListItemButton onClick={() => { navigate('/admin-dashboard')}}>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItemButton>
            <ListItemButton onClick={() => { navigate('/statistics')}}>
                <ListItemIcon>
                    <AutoGraphIcon />
                </ListItemIcon>
                <ListItemText primary="Statistics" />
            </ListItemButton>
            <ListItemButton onClick={() => { navigate('/admin-chathistory')}}>
                <ListItemIcon>
                    <SmartToyIcon />
                </ListItemIcon>
                <ListItemText primary="Chat History" />
            </ListItemButton>
            <ListItemButton onClick={() => { navigate('/feedback')}}>
                <ListItemIcon>
                    <FeedbackIcon />
                </ListItemIcon>
                <ListItemText primary="Feedbacks" />
            </ListItemButton>
            <ListItemButton onClick={() => { navigate('/management')}}>
                <ListItemIcon>
                    <ManageAccountsIcon />
                </ListItemIcon>
                <ListItemText primary="User Management" />
            </ListItemButton>
            <Divider sx={{ my: 1 }} />
            <ListItemButton onClick={logout}>
                <ListItemIcon>
                    <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Log out" />
            </ListItemButton>
        </>
    )
}