import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { Navigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

import TopNavigationBarLoggedIn from '../../components/Navigation/TopNavigationBarLoggedIn';
import CanvasJSReact from '../../components/CanvasChart/canvasjs.react';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const useStyles = (theme) => ({
    root: {
        flexGrow: 1,
        margin: 40
    }
});

const mdTheme = createTheme();

class Feedbacks extends Component {

    constructor(props){
        super(props);
        this.state = {  
            googleSheetData : [],
            amount : 0,
            rating1 : 0,
            rating2 : 0,
            rating3 : 0,
            rating4 : 0,
            rating5 : 0,
            feedbackType1 : 0,//comments
            feedbackType2 : 0,//questions
            feedbackType3 : 0,//bug reports
            feedbackType4 : 0,//feature request
        }
    }  
    
    componentDidMount(){
        axios.get('https://cors-anywhere.herokuapp.com/https://sheetdb.io/api/v1/j4wedxfdmaw27')
        .then(response => {
            let tableData = response.data;
            var amount=0; var rating1=0; var rating2=0; var rating3=0; var rating4=0; var rating5=0;
            var feedbackType1=0; var feedbackType2=0; var feedbackType3=0; var feedbackType4 = 0;
            tableData.forEach((item, i) => {
                item.id = i + 1;
                amount ++;
                if (item['Feedback Type']==='Comments') feedbackType1++;
                else if (item['Feedback Type']==='Questions') feedbackType2++;
                else if (item['Feedback Type']==='Bug Reports') feedbackType3++;
                else feedbackType4++;
                if (item['Do you have a good experience using the website?']==='1') rating1++;
                else if (item['Do you have a good experience using the website?']==='2') rating2++;
                else if (item['Do you have a good experience using the website?']==='3') rating3++;
                else if (item['Do you have a good experience using the website?']==='4') rating4++;
                else rating5++;
            });
            //console.log(tableData)
            this.setState({
                googleSheetData : tableData,
                amount : amount,
                rating1 : rating1,
                rating2 : rating2,
                rating3 : rating3,
                rating4 : rating4,
                rating5 : rating5,
                feedbackType1 : feedbackType1,
                feedbackType2 : feedbackType2,
                feedbackType3 : feedbackType3,
                feedbackType4 : feedbackType4
            });
        }).catch(error => {
            console.log('Data not returned', error)
        })
    }
    
    render(){
        const { classes } = this.props;
        const columns = [
            { field: 'id', headerName: 'ID', width: 70 },
            { field: 'Timestamp', headerName: 'Time', width: 150 },
            { field: 'Name', headerName: 'Name', width: 100 },
            { field: 'Email', headerName: 'Email', width: 150 },
            { field: 'Do you have a good experience using the website?', headerName: 'Rating', width: 100 },
            { field: 'Feedback Type', headerName: 'Feedback Type', width: 150 },
            { field: 'Feedback', headerName: 'Feedback', width: 150 },
            { field: 'Suggestions for improvement', headerName: 'Suggestions', width: 180 }
        ];
        //console.log(this.state)
        var options_column = {
            animationEnabled: true,
			exportFileName: "User Satisfaction Column Chart",
			exportEnabled: true,
            title: {
                text: ""
            },
            data: [
            {
                type: "column",
                dataPoints: [
                    { label: "1",  y: this.state.rating1 },
                    { label: "2",  y: this.state.rating2 },
                    { label: "3",  y: this.state.rating3 },
                    { label: "4",  y: this.state.rating4 },
                    { label: "5",  y: this.state.rating5 }
                ]
            }
            ]
        }

        var options_pie = {
			animationEnabled: true,
			exportFileName: "Feedback Type Pie Chart",
			exportEnabled: true,
			title:{
				text: ""
			},
			data: [{
				type: "pie",
				showInLegend: true,
				legendText: "{label}",
				toolTipContent: "{label}: <strong>{y}%</strong>",
				indexLabel: "{y}%",
				indexLabelPlacement: "inside",
				dataPoints: [
					{ y: this.state.feedbackType1, label: "Comments" },
					{ y: this.state.feedbackType2, label: "Questions" },
					{ y: this.state.feedbackType3, label: "Bug Reports" },
                    { y: this.state.feedbackType4, label: "Feature Request" }
				]
			}]
		}

        let redirectVar = null;
        if(!localStorage.getItem("user")){
            redirectVar = <Navigate to= "/"/>
        }
        return (
            <>
            {redirectVar}
            <ThemeProvider theme={mdTheme}>
            <Box>
                <Container maxWidth="full" sx={{ mt: 3, mb: 4 }}>
                    <Grid container spacing={3}>
                        <TopNavigationBarLoggedIn />
                        {/* Feedbacks Main */}
                        <Container maxWidth="lg" className={classes.root}>
                            <Container maxWidth="lg" className={classes.root}>
                                <Typography component="h1" variant="h4" color="primary" gutterBottom>
                                    Feedbacks
                                </Typography> 
                                <DataGrid style={{height: '100%', width: '100%'}} autoHeight
                                    getRowId={(row) => row.id}
                                    rows={this.state.googleSheetData}
                                    columns={columns}
                                    pageSize={5}
                                    rowsPerPageOptions={[5]}
                                />
                                <br/>
                                <Grid container spacing={3}>
                                    {/* column chart */}
                                    <Grid item xs={12} md={4} lg={6}>
                                        <Paper
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                height: 420,
                                            }}
                                        >
                                        <Typography component="h1" variant="h6" color="primary" gutterBottom>
                                            Do you have a good experience using the website?
                                        </Typography> 
                                        <p>{this.state.amount} Responses:</p>
                                        <CanvasJSChart options = {options_column}/>
                                        </Paper>
                                    </Grid>
                                    {/* pie chart */}
                                    <Grid item xs={12} md={4} lg={6}>
                                        <Paper
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                height: 420,
                                            }}
                                        >
                                        <Typography component="h1" variant="h6" color="primary" gutterBottom>
                                            Feedback Type
                                        </Typography> 
                                        <p>{this.state.amount} Responses:</p>
                                        <CanvasJSChart options = {options_pie}/>
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </Container>
                        </Container> 
                    </Grid>
                </Container>
            </Box>
            </ThemeProvider>
            </>
        )
    }
}

export default withStyles(useStyles)(Feedbacks);