import React from 'react'
// import { useNewsContex } from '../../context/AllnewsContex'
import Headcard from './Headcard';

import '../../style/NewsCard.css'
import { useAuthContext } from '../../context/AuthuserContext';
import { useNewsContex } from '../../context/AllnewsContex';

const Headline = () => {
    const {userDetails}= useAuthContext();

    const {headlines} = useNewsContex();

    
    let date = Date(Date.now()).substring(0,15);
    console.log(date);

  return (
    <div className='container-fluid'>
        <div className="row text-secondary greeting"> 
            <div className="col-4"> <h3 className='text-start ms-1 textprop'>Welcome to <span style={{'color' : "#ee6c02"}}> Samachar Bazar </span></h3> </div>
            <div className="col-4 text-white"> <h3 className='text-center textprop text-capitalize'> {userDetails ? userDetails.name : null } </h3> </div>
            <div className="col-4"> <h3 className='text-end me-1 textprop'> {date} </h3></div>
        </div>
        <div className="row mt-3">
            <h2 style={{"color" : '#ee6c02'}}> <span className='text-dark'>Top</span>  Headlines</h2>
            {headlines.length ? <><div className="col-md-6"> 
                <Headcard headlines = {headlines[0]} classval={"big"}/>
            </div>
            <div className="col-md-6  d-flex flex-column justify-content-between">
                <div className="row ">
                    <div className="col-6"> <Headcard headlines = {headlines[1]} /> </div>
                    <div className="col-6"> <Headcard headlines = {headlines[2]}  /> </div>
                   
                </div>
                <div className="row">
                    <div className="col-6"> <Headcard headlines = {headlines[3]}  /> </div>
                    <div className="col-6"> <Headcard headlines = {headlines[4]}  /> </div>
                    
                </div>
            </div></>  : "loading..."}
            
        </div>
    </div>
  )
}

export default Headline
