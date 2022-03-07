//import * as React from 'react';
import React, { Component } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';





export default class medicineResultList extends Component {
  render() {
    
      const medicineResult = this.props
      var i = 0
      var k = Object.keys(medicineResult).length
      console.log(Object.keys(medicineResult).length)
    //const array = Object.values(medicineResult)
    //console.log('result',typeof(array))
    //var arr ={}
    var obje ={}


    

    return (
      <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>RxNorm Name:</TableCell>
            <TableCell align="right">RxCUI Number</TableCell>
            <TableCell align="right">RxNorm Language</TableCell>
            <TableCell align="right">RxNorm suppress</TableCell>
            <TableCell align="right">RxNorm TTY</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
            {
              Object.values(medicineResult).map((obj)=>{
                
                if(!obj.conceptProperties){
                  i++
                  if(i===k){
                    return <TableRow key={i}><TableCell>Sorry, there is no related results.</TableCell></TableRow>
                  }
                }else{
                  console.log(obj.conceptProperties)
                  obje = obj.conceptProperties
                  for(let i in obje){
                    return(
                      <TableRow
                            key={obje[i].rxcui}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >

                        <TableCell component="th" scope="row">
                          {obje[i].name}
                        </TableCell>
                        <TableCell align="right">{obje[i].rxcui}</TableCell>
                        <TableCell align="right">{obje[i].language}</TableCell>
                        <TableCell align="right">{obje[i].suppress}</TableCell>
                        <TableCell align="right">{obje[i].tty}</TableCell>

                      </TableRow>

                      
                      )
                  }
                }
                
              })
            }
          </TableBody>
          </Table>
        </TableContainer>



      {/* <div>
        {
          Object.values(medicineResult).map((obj)=>{
            
            if(!obj.conceptProperties){
              i++
              if(i===k){
                return <h6 key={i}>Sorry! There is no related result!</h6>
              }
            }else{
              console.log(obj.conceptProperties)
              obje = obj.conceptProperties
              for(let i in obje){
                return(
                  <div key = {obje[i].rxcui}> 
                    <h6>RxCUI: {obje[i].rxcui}</h6>
                    <h6>RxNorm Name: {obje[i].name}</h6>
                    <h6>RxNorm Language: {obje[i].language}</h6>
                    <h6>RxNorm Suppress: {obje[i].suppress}</h6>
                    <h6>RxNorm tty: {obje[i].tty}</h6>

                    
                
                    <hr/>
                  </div>
                  )
              }
            }
            
          })
        }
      </div> */}
      </>
      





      //NDC Code version:
      // <div>
        
      //     {
              
      //         Object.values(medicineResult).map((obj)=>{
      //           if(!obj.propertyConceptList){
      //             // console.log('None')
      //             // var name = 'Sorry! Not shown in system yet'
      //             // var label = 'None'
      //             // var marketStatus = 'None'
      //             // var marketCate = 'None'

      //             var name = {propValue:' Not shown in System yet!'}
      //             var label ={propValue:' Not shown in System yet!'}
      //             var marketStatus = {propValue:' Not shown in System yet!'}
      //             var marketCate ={propValue:' Not shown in System yet!'}
      //           }else{
      //           // console.log(obj.propertyConceptList.propertyConcept)
                
      //            arr = Object.values(obj.propertyConceptList.propertyConcept)
      //            var name = arr.find(e=>{
      //             if(e.propName==='IMPRINT_CODE'){
      //               return e.propValue
      //             }
      //           })
      //             if(!name){
      //               name = {propValue:' Not shown in System yet!'}
      //             }


      //             var label = arr.find(e=>{
      //               if(e.propName==='LABELER'){
      //                 return e.propValue
      //               }
      //             })
      //             if(!label){
      //               label = {propValue:' Not shown in System yet!'}
      //             }


      //             var marketStatus = arr.find(e=>{
      //               if(e.propName==='MARKETING_STATUS'){
      //                 return e.propValue
      //               }
      //             })
      //             if(!marketStatus){
      //               marketStatus = {propValue:' Not shown in System yet!'}
      //             }


      //             var marketCate = arr.find(e=>{
      //               if(e.propName==='MARKETING_CATEGORY'){
      //                 return e.propValue
      //               }
      //             })
      //             if(!marketCate){
      //               marketCate = {propValue:' Not shown in System yet!'}
      //             }

      //           }

      //           return (
      //               <div key={obj.ndcItem} >
      //                   <hr/>
      //                   <h4>Here are some related info:</h4>
      //                   <h3>Name:{!name.propValue ? name.propValue:name.propValue}</h3>
      //                   <h3>RXCUI is: {obj.rxcui}</h3>
      //                   <h3>NDC_9 is: {obj.ndc9}</h3>
      //                   <h3>NDC_10 is: {obj.ndc10}</h3>
      //                   <h5>Related label: {label.propValue}</h5> 
      //                   <h5>Market Status: {marketStatus.propValue}</h5>
      //                   <h5>Market Category: {marketCate.propValue}</h5>
      //                   {
      //                     obj.packagingList!=null ? <h5>Packaging: {Object.values(obj.packagingList)}</h5> : <h6>Sorry! There is no related info about packaging.</h6>
      //                   }
      //                 <hr/>
                        
                        
      //               </div>
      //           )
      //       })
      //     }
      // </div>
    )
  }
}