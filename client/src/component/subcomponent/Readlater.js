import React, { useEffect, useState } from 'react'
import { useNewsContex } from '../../context/AllnewsContex';
import axios from 'axios';
import NewsCard2 from './NewsCard2';
import { useAuthContext } from '../../context/AuthuserContext';

const Readlater = ({type}) => {
    // state to store newses
    const [newses ,setnews]= useState();
      // getting show toast funcion
      const {errortoastfn} = useNewsContex();
      const {userDetails} = useAuthContext();

    // function to get all readlater news
    const getnews = async()=>{
        try {
          let res = '';
          if(type === "user"){
             res = await axios.get(`http://localhost:8080/api/v1/auth/getallreadlater/${userDetails._id}`);
          }else{
             res = await axios.get(`http://localhost:8080/api/v1/auth/getallreadlater-admin/${userDetails._id}`);
          }
          console.log(res);
          if(res?.data?.success){
              setnews(res.data.newses);
          }else{
            setnews([]);
          }
        } catch (error) {
            errortoastfn("Internal error occured . please try later.")
        }
    }

    useEffect(()=>{
        getnews();
    },[])


  return (
    <div className='row d-flex justify-content-around'>
      {!newses ? <h5 className='text-center'> Loading... </h5>  : !newses.length ? <h3 className='text-center mt-4'>No news is saved for later read .</h3> : newses.map((ele)=>  <NewsCard2 className="my-2" news={ele} type={"big"}/> )}
    </div>
  )
}

export default Readlater
