import React from "react";
import { makeStyles } from '@material-ui/core/styles';
// import { Container, Box, FooterLink, Row, Heading, Column } from "./FooterStyle";
import BottomNavigation from '@mui/material/BottomNavigation';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { experimentalStyled as styled } from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Link from '@mui/material/Link';
const style = {

};
const links_array = [
    {
        link: "/about",
        title: "About",
        key: "aboutus",
    },
    {
        link: "/dashboard",
        title: "Services",
        key: "dashboard",
    },
    {
        link: "https://docs.google.com/forms/d/e/1FAIpQLScM1klqzc3jR_HJELDd5SFyqZNDFuDNLaqZ6h2oUGV6nwhaKw/viewform?embedded=true",
        title: "Send Feedback",
        key: "",
    },
    {
        link: "#",
        title: "Tutorials",
        key: "video",
    },
]

const useStyles = makeStyles({
    root: {
        flexGrow: 1,

    },
    bootom: {
        backgroundColor: "#32a1ce",
        borderTop: "1px solid #E7E7E7",
        textAlign: "left",
        padding: "20px",
        left: "0",
        bottom: "0",
        width: "100%"

    }
});
const mdTheme = createTheme();
export default function BottomNavigationBar() {
    const classes = useStyles();
    return (
        <>
            <Box sx={{ flexGrow: 1 }} className={classes.bootom} key={"bottom"}>
                <Grid container spacing={{ xs: 1, md: 1 }} columns={{ xs: 1, sm: 4, md: 10 }}>
                    {links_array.map(function (item, i) {
                        return (
                            <Grid item xs={2} sm={4} md={4} key={item.key} >
                                <Link href={item.link} color="inherit"> {item.title}</Link>
                            </Grid>
                        )
                    })
                    }

                </Grid>
            </Box>
        </>
    );
}