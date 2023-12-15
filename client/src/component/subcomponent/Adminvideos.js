import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../context/AuthuserContext'
import { useNewsContex } from '../../context/AllnewsContex';
import axios from 'axios';
import VideoCard from './VideoCard';
import VideoCard2 from './VideoCard2';

const Adminvideos = () => {

    const {userDetails} = useAuthContext();
    const {_id} = userDetails;
    // state to hold teh videos;
    const [vdSet , setVd] = useState([]);
    // getting show toast funcion
    const {toastfn , errortoastfn , vds} = useNewsContex();
  
    // function to get the videos
    const getvideobyauthor= async()=>{
        try {
            const res = await axios.get(`https://deploymernnewsapp.vercel.app/api/v1/video/getvideo/${_id}`);
            if(res?.data?.success){
                setVd(res.data.videos);
                return ;
            }
        } catch (error) {
            console.log(error);
            // errortoastfn("Internal error in adding news . Please try again later.")
        }
    }
    useEffect(()=>{
        getvideobyauthor();
    },[vds])
  return (
    <div className="row mt-3">
      <div className="col-12 d-flex justify-content-between">
      <h5  className='texthead' style={{"color" : '#ee6c02'}}> <span className='text-dark'>Videos Post</span>By You</h5>
      <h5 className='texthead' style={{"color" : '#ee6c02'}}> <span className='text-dark'>count : </span>  {vdSet.length} </h5>
      </div>
      { vdSet.map((vd , indx)=>{
        return <VideoCard2 key={indx} vdo = {vd} type={'big'}/>
      }) }
    </div>
  )
}

export default Adminvideos
