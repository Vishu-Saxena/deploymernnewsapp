import React, { useEffect, useState } from 'react'
// import { useAuthContext } from '../../context/AuthuserContext'
import axios from 'axios'
import Newcard from './Newcard';
import { useNewsContex } from '../../context/AllnewsContex';
import { useAuthContext } from '../../context/AuthuserContext';

const AdminNews = () => {
  // getting show toast funcion
  const {toastfn , errortoastfn} = useNewsContex();

  const {userDetails} = useAuthContext();
    const {_id} = userDetails;

  const [admnNews , setAmNews] = useState([]);
  // console.log(admnNews);
    // funtion to get all news of admin
    const adminNews = async()=>{
      try {
          const res = await axios.get(`https://deploymernnewsapp.vercel.app/api/v1/news/get-news/${_id}`);
          if(res?.data?.success){
            setAmNews(res.data.findNews);
            return;
          }else{
            // toastfn("no news is created yet .");
            return;
          }
      } catch (error) {
          console.log(error);
          // errortoastfn("some internal error occured . please try again latter")
      }
  }

  useEffect(()=>{
      adminNews();
      // eslint-disable-next-line
  },[])

  return (
    <div className="row mt-3">
      <div className="col-12 d-flex justify-content-between">
      <h5  className='texthead' style={{"color" : '#ee6c02'}}> <span className='text-dark'>News Published</span>By You</h5>
      <h5 className='texthead' style={{"color" : '#ee6c02'}}> <span className='text-dark'>count : </span>  {admnNews.length} </h5>
      </div>
      { admnNews.map((news , indx)=>{
        return <Newcard key={indx} news = {news}/>
      }) }
    </div>
  )
}

export default AdminNews
