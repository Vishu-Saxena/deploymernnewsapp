import React from 'react'
import "../../style/headcard.css"
import { Link } from 'react-router-dom';
const Headcard = (props) => {
    const {classval ,headlines} = props;
    console.log(headlines);
    
  return (
    <Link to={`/news/${headlines.category}/${headlines._id}`} target="_blank" style={{'color' : "none" , 'textDecoration' : "none"}}>
    <div className={`card text-bg-dark ${classval ? 'lgBox' : 'smlBox'}`} >
    <img src={`https://deploymernnewsapp.vercel.app/api/v1/news/get-image/${headlines._id}`} className="card-img" alt="..."/>
    <div className="card-img-overlay" >
        <h5 className={`card-title ${classval ? 'lgHeadText' : 'smlHeadText'}`}>{headlines.title}</h5>
        <p className={`card-text ${classval ? 'lgText' : 'smlText'}`}> { classval ?  headlines.discription : headlines.discription.substring(0, 70)+'...'} </p>
        <p className={`card-text ${classval ? 'lgText' : 'smlText'}`}><small>{new Date(headlines.createdAt).toGMTString().split('GMT')[0]}</small></p>
    </div>
    </div>
    </Link>
  )
}

export default Headcard
