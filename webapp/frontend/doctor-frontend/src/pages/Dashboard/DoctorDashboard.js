import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import TopNavigationBar from '../../components/Navigation/TopNavigationBar';
import ConsultationDoctorView from '../Consultation/ConsultationDoctorView';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
const mdTheme = createTheme();
const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        margin: 1
    },
    paper: {
        alignItems: "center",
    },
    paper2: {



    },

    messagesBody: {
        margin: 10,
    }
});
export default function DoctorDashboard() {

    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };
    const classes = useStyles();
    return (
        <ThemeProvider theme={mdTheme}>
            <TopNavigationBar />
            <Box>

                <Container maxWidth="lg"
                    spacing={2}
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        '& > :not(style)': {
                            m: 2,
                            mt: 5,

                        },
                    }}>
                    <Grid container>
                        <Grid item xs={12} className={classes.root}>
                            <Typography variant="h3" gutterBottom component="div">
                                Welcome Doctor
                            </Typography>

                        </Grid >
                        <Grid item xs={12} className={classes.root} sx={{
                            '& > :not(style)': {
                                mb: 5,
                            },
                        }}>
                            <Divider light flexItem variant="middle" />
                        </Grid>
                        <Grid item xs={3} className={classes.root}>
                            <List sx={{ width: '100%', }}>
                                {[1, 2, 3].map((value) => (
                                    <ListItem alignItems="flex-start">

                                        <ListItemButton>
                                            <ListItemAvatar>
                                                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                                            </ListItemAvatar>
                                            <ListItemText primary={`Line item ${value}`} />
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                        </Grid>
                        <Divider orientation="vertical" variant="middle" flexItem />
                        <Grid item xs={8}>
                            <ConsultationDoctorView></ConsultationDoctorView>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

        </ThemeProvider >
    )
}
