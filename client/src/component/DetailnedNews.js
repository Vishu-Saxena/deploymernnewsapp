import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import '../style/detailNews.css';
import { useNewsContex } from '../context/AllnewsContex';

const DetailnedNews = () => {
    const {id} = useParams();
    // state to store news
    const [news , setNews] = useState({});
    // getting show toast funcion
    const { errortoastfn} = useNewsContex();
    // fucntion to fetch the news details
    const newsInfo = async(id)=>{
        try {
            const res = await axios.get(`deploymernnewsapp.vercel.app/api/v1/news/get-single-news/${id}`);
            setNews(res.data.news);
        } catch (error) {
            console.log(error);
            errortoastfn("something went wrong , please try again later.")
        }
    }
    useEffect(()=>{
        newsInfo(id);
    },[]);
  return (
    <div className='container'>
        {!news.title ? <h4 className='text-center'> loading... </h4> : 
            <>
            <div className="row justify-content-center my-2"><h2 className="text-center txtstyle mb-4"> {news.title} </h2>
                <div className="col-md-8 col-sm-10 col-12 d-flex justify-content-center"> <img className='detailimg' src={`http://localhost:8080/api/v1/news/get-image/${id}`} alt="" /> </div>
            </div>
            
            <div className="row justify-content-center">
                <div className="col-sm-10">
                    <p className='desc'> {news.discription} </p>
                    <p className='cnt'> {news.content} </p>
                </div>
            </div>
            </>

        }
      
    </div>
  )
}

export default DetailnedNews
