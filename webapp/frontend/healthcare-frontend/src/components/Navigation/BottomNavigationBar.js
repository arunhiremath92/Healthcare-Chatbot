import React from "react";
import { Box, Container, Row, Column, FooterLink, Heading } from "./FooterStyle";

export default function BottomNavigationBar() {

    return (
        <div key="bottombar">
            <Box >
                <Container >
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
                </Container>
            </Box>

        </div>
    );
}