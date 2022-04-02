import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Container, Box, FooterLink, Row, Heading, Column } from "./FooterStyle";

import { createTheme, ThemeProvider } from '@mui/material/styles';
const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        
    },
    textbox: {
        margin: 10,
        
    }
});
const mdTheme = createTheme();
export default function BottomNavigationBar() {
    const classes = useStyles();
    return (
        <ThemeProvider theme={mdTheme}>
            <Box >
                <Container maxWidth="lg" className={classes.root}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Row>
                            <Column>
                                <Heading>About Us</Heading>
                                <FooterLink href="/about">Team</FooterLink>
                            </Column>
                            <Column>
                                <Heading>Services</Heading>
                                <FooterLink href="/dashboard">Online Website</FooterLink>
                                <FooterLink href="https://salesiq.zoho.com/signaturesupport.ls?widgetcode=fb692d75e56b9ef8a602b9140461303ab23262f3fa05af9f10890001872063a8"
                                    target="_blank"
                                    rel="noopener noreferrer">AI Assisted Chatbot
                                </FooterLink>
                            </Column>
                            <Column>
                                <Heading>Contact Us</Heading>
                                <FooterLink href="/contact">Send Feedbacks</FooterLink>
                            </Column>
                            <Column>
                                <Heading>Media</Heading>
                                <FooterLink href="#">Video Link</FooterLink>
                                <FooterLink href="#">Board</FooterLink>
                            </Column>
                        </Row>
                    </Box>
                </Container>
            </Box>
        </ThemeProvider>
    );
}