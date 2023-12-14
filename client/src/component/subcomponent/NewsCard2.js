import React, { useState } from 'react'
import { Link } from "react-router-dom";
import "../../style/NewsCard.css"
import { MdOutlineBookmarkAdd ,MdBookmarkAdded } from "react-icons/md";
import { useNewsContex } from '../../context/AllnewsContex';
import axios from 'axios';
import { useAuthContext } from '../../context/AuthuserContext';
const NewsCard2 = ({news , type}) => {
    const {title , discription , _id , category } = news;

    // getting userdetails
    const {userDetails} = useAuthContext();
    const userID = userDetails._id;
    const isadmin = userDetails.admin;
    // state to change the icon
    const[icon , setIcon]= useState( type ? false : true);
    // getting show toast funcion
  const {toastfn, errortoastfn} = useNewsContex();
    // funtion to add to readlist
    const addtolist = async(newsid)=>{
        // toastfn("news added to readlatter list.");
        try {
            const res = await axios.put(`http://localhost:8080/api/v1/auth/readlist`, {newsid , userID , isadmin } );
            if(res?.data?.success){
               toastfn("news added to read latter list.")
               setIcon(false);
            }else{errortoastfn("Cannot add this news to read latter list right now . please try again latter.")}
        } catch (error) {
            errortoastfn("Some internal error has occured please try again later.")
        }
    }
    // funtion to to remove from readlist
    const removefromlist=async(newsid)=>{
        try {
            const res = await axios.put(`http://localhost:8080/api/v1/auth/removefromreadlist`, {newsid , userID ,isadmin } );
            if(res?.data?.success){
                toastfn("news removed to read latter list.");
                setIcon(true);
                if(type){window.location.reload()}
            }else{errortoastfn("Cannot remove this news from read latter list right now . please try again latter.")}
        } catch (error) {
            errortoastfn("Some internal error has occured please try again later.")
        }
    }

    return (
    
        <div className= {!type ? 'col-lg-3 col-md-4 col-sm-6 col-12 mt-2' : "col-md-6 col-12 mt-2"}>
            <div className="card nwscrd">
            <Link to={`/news/${category}/${_id}`} target="_blank" style={{'color' : "black" , 'textDecoration' : "none"}}>
                <img src={ `http://localhost:8080/api/v1/news/get-image/${_id}` } className="card-img-top" alt="..." />
                <div className="card-body ">
                    <h5 className="card-title titletext">{title ? title.substring(0,70)+'...' : "Click to read more"}</h5>
                    <p className="card-text descrip text-secondary">{discription ? discription.substring(0,70)+'...' : ""}</p>
                </div>
                </Link>
                <div className='icnadd me-3 d-flex justify-content-end align-items-end pb-2'>
                <MdOutlineBookmarkAdd style={icon ? {'display' : 'block'} : {'display' : 'none'}} onClick={()=>addtolist(_id)} /> 
                <MdBookmarkAdded style={!icon ? {'display' : 'block'} : {'display' : 'none'}} onClick={()=>removefromlist(_id)} />
                </div>
            </div>
        </div>
    )
}

export default NewsCard2
