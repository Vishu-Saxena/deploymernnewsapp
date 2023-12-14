import { createContext, useContext, useEffect, useReducer, useState } from "react";
import reducer from '../reducer/AllnewsReducer'
import axios from "axios";
import {toast } from 'react-toastify';

const NewsContext = createContext();

const NewsContxtVal = (props)=>{
    // fucntion to show success toast
    const toastfn = (data)=>toast.success(data ,{
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"})
    // fucntion to show success toast
    const errortoastfn = (data)=>toast.error(data ,{
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"})
      
    const initialState = {
        headlines : [],
        sports : [],
        science : [],
        health : [],
        global : [],
        entertainment : [],
        videos : []
    }
    // state to run the useeffect
    const [vds , setVds] = useState();
    const [nwst , setNwst] = useState();
    const [state , dispatch] = useReducer(reducer , initialState);
    
    // fucntion to fetch all the newses
    const newsFunc =async()=>{
        try {
            const res = await axios.get('https://deploymernnewsapp.vercel.app/api/v1/news/get-all');
            if(res.data.success){
                dispatch({type :'ALL' , payload : res.data.getNews});
            }else{
                toast("No news has been uploaded.")
            }
        } catch (error) {
            console.log(error);
            errortoastfn("Some internal error has occured . Please try again latter")
        }
    }
    // function to fetch all videos news
    const videoNews = async()=>{
        try {
            const res = await axios.get('https://deploymernnewsapp.vercel.app/api/v1/video/getvideo');
            console.log(res.data.getvideo);
            if(res.data.success){
                dispatch({type :'ALLVIDEO' , payload : res.data.videos});
            }else{
                toast("No video has been uploaded.")
            }
        } catch (error) {
            console.log(error);
            errortoastfn("Some internal error has occured . Please try again latter")
        }
    }

    // funtion to make headline list;
    const headlinefunc =async()=>{
        try {
            const res = await axios.get('https://deploymernnewsapp.vercel.app/api/v1/news/get-headlines');
            if(res.data.success){
                dispatch({type :'HEADLINE' , payload : res.data.headline});
            }else{
                toastfn("No news found.")
            }
        } catch (error) {
            console.log(error);
            errortoastfn("Some internal error has occured . Please try again latter")
        }
    }
    
    useEffect(()=>{

        videoNews();
        // eslint-disable-next-line
    },[vds]);
    useEffect(()=>{
        newsFunc();
        headlinefunc();
        
        // eslint-disable-next-line
    },[nwst]);

    return<NewsContext.Provider value={{...state , toastfn , errortoastfn , setNwst , setVds ,vds}} > {props.children} </NewsContext.Provider>
}

// creating custom context
const useNewsContex=()=>{
    return useContext(NewsContext);
}

export default NewsContxtVal;
export {useNewsContex , NewsContext}