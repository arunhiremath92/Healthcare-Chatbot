import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import MedicationIcon from '@mui/icons-material/Medication';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import ScheduleIcon from '@mui/icons-material/Schedule';
import Divider from '@mui/material/Divider';

export default function ListItemsUser() {

    let navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/');
    }

    return(
        <>
            <ListItemButton onClick={() => { navigate('/user-dashboard')}}>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItemButton>
            <ListItemButton onClick={() => { navigate('/chathistory')}}>
                <ListItemIcon>
                    <SmartToyIcon />
                </ListItemIcon>
                <ListItemText primary="Chat History" />
            </ListItemButton>
            <ListItemButton onClick={() => { navigate('/user-consultation')}}>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Consultation" />
            </ListItemButton>
            <ListItemButton onClick={() => { navigate('/prescription-refill')}}>
                <ListItemIcon>
                    <MedicationIcon />
                </ListItemIcon>
                <ListItemText primary="Prescription" />
            </ListItemButton>
            <ListItemButton onClick={() => { navigate('/provider-search')}}>
                <ListItemIcon>
                    <HealthAndSafetyIcon />
                </ListItemIcon>
                <ListItemText primary="Search Providers" />
            </ListItemButton>

            <Divider sx={{ my: 1 }} />

            <ListSubheader component="div" inset>
                User & Settings
            </ListSubheader>
            <ListItemButton onClick={() => { navigate('/user-appointment')}}>
                <ListItemIcon>
                    <ScheduleIcon />
                </ListItemIcon>
                <ListItemText primary="Appointment" />
            </ListItemButton>
            <ListItemButton onClick={() => { navigate('/myhealth')}}>
                <ListItemIcon>
                    <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="My Health" />
            </ListItemButton>
            <ListItemButton onClick={() => { navigate('/mycart')}}>
                <ListItemIcon>
                    <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="My Cart" />
            </ListItemButton>
            <ListItemButton onClick={() => { navigate('/user-profile')}}>
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