import React, { useEffect, useState } from 'react'
// import { useAuthContext } from '../../context/AuthuserContext'
import axios from 'axios'
import Newcard from './Newcard';
import { useNewsContex } from '../../context/AllnewsContex';

const AdminNews = () => {
  // getting show toast funcion
  const {toastfn , errortoastfn} = useNewsContex();

  const [admnNews , setAmNews] = useState([]);
  // console.log(admnNews);
    // funtion to get all news of admin
    const adminNews = async()=>{
      try {
          const res = await axios.get('http://localhost:8080/api/v1/news/get-news/65490a0f2189dc711cdea7b9')
          if(res?.data?.success){
            setAmNews(res.data.findNews);
          }else{
            toastfn("no news is created yet .")
          }
      } catch (error) {
          console.log(error);
          errortoastfn("some internal error occured . please try again latter")
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
