import React, { Component } from 'react'
import Box from '@mui/material/Box'
import './resultList.css'



export default class resultList extends Component {
    



  render() {
    const businessList = this.props
    // console.log('This is', businessList)
    // console.log('Value',Object.values(businessList))


    return (
        <div style={{paddingBottom:'100px'}}>
            {
                Object.values(businessList).map((obj)=>{
                    return (
                        <Box 
                            sx={{
                                paddingTop:'10px',
                                paddingLeft:'10px',
                                paddingRight:'10px',
                                marginBottom:'5px',
                                border:'2px solid grey',
                                borderRadius:'20px',
                                backgroundColor:'lightgrey',
                                '&:hover':{
                                    bgcolor:'primary.main',
                                    color:'white',
                                    p:2
                                }
                            }}
                        >
                            <div key={obj.id} className = 'search-result'>
                                <div className='image-container'>
                                    <a href={obj.url} target='_blank' rel='noreferrer'>
                                    <img src={obj.image_url} className='business-image'/>
                                    </a>
                                </div>
                                <div className='business-info'>
                                    <h3>Name: {obj.name}</h3>
                                    <h4>Rating: {obj.rating} out of 5</h4>
                                    <h4></h4>
                                </div>
                                <div className='contact-info'>
                                    <h6>Contact: {obj.phone}</h6>
                                    <h6>Address: {obj.location.display_address}</h6>
                                </div>
                                {/* <hr/> */}
                            </div>
                        </Box>
                    )
                })
            }
        </div>
    )
    


  }
}
