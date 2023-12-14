import React, { useState } from 'react'
// import AddnewsForm from './subcomponent/AddnewsForm'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useNewsContex } from '../context/AllnewsContex';

const NewsUpdate = () => {
    // state to store news
    const [newsdata , setNews] = useState({}); 
    const [image , setImage] = useState('')
    const {pathname} = useLocation();
    const id = pathname.split('/')[4];
    console.log(newsdata);
    const navigate = useNavigate();

    // getting show toast funcion
    const {toastfn , errortoastfn} = useNewsContex();

    // function to get the to be update news/
    const getNews = async()=>{
        try {
            
            console.log(id);
            const res = await axios.get(`https://deploymernnewsapp.vercel.app/api/v1/news/get-single-news/${id}`);
            console.log(res);
            if(res?.data?.success){
                setNews(res.data.news);
            }else{
                errortoastfn(res.data.message);
            }
        } catch (error) {
            console.log(error);
            errortoastfn("internal error occured . please try later.");
        }
    }

    const handleOnsubmit = async(e)=>{
      e.preventDefault();
      console.log(newsdata  , image);
      console.log(id);
      try {
        const newsData2 = new FormData();
        newsData2.append("title", newsdata.title);
        newsData2.append("discription", newsdata.discription);
        newsData2.append("category", newsdata.category);
        newsData2.append("content", newsdata.content);
        if(image){newsData2.append("image", image)};
        console.log("newsData",newsData2);
        const res = await axios.post(`https://deploymernnewsapp.vercel.app/api/v1/news/update-news/${id}` , newsData2 );

        if(res?.status === 200 && res?.data?.success ){
          toastfn("News updated successfully.");
          navigate('/dashboard/allnews');
        }else if(res?.status === 202 && !(res?.data?.success)){
          errortoastfn("Image size is too big. please select an image smaller than 1MB");
        }else if(res?.status === 203 && !(res?.data?.success)){
          errortoastfn(res.data.message);
        }else{
          errortoastfn("some internal error has occured. please try again later.");
        }
      } catch (error) {
        console.log(error);
        errortoastfn("Some internal error has occured .")
      }
    }
    const handleOnchange =(e)=>{
      
      let {name , value} = e.target;
      setNews({...newsdata , [name] : value});
    }

    useState(()=>{
        getNews();
        // eslint-disable-next-line
    },[])
  return (
    <div className="container">
    <div className='row mt-3'>
      <h2 className='text-center ms-1'>Update <span style={{'color' : "#ee6c02"}}> News </span></h2>
      {newsdata ? <>
        <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Tittle</label>
            <input name='title' type="text" value={newsdata.title}  className="form-control" onChange={handleOnchange} placeholder='Title of your news post...' required/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label"> Discription</label>
            <input type="text" name='discription' value={newsdata.discription} className="form-control" placeholder='not more than 50 words...' onChange={handleOnchange} required />
        </div> 
        <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Category</label>
            <select name='category' className="form-select" required onChange={handleOnchange} >
                <option selected name="category" > {newsdata.category} </option>
                <option name='category' value="sports">Sports</option>
                <option name='category' value="international">International</option>
                <option name='category' value="science">Science</option>
                <option name='category' value="health">Health</option>
                <option name='category' value="entertainment">Entertainment</option>
                <option name='category' value="business">Business</option>
            </select>
        </div> 
        <div className="mb-3">
            <label  className="form-label">News Content</label>
            <textarea required className="form-control" value={newsdata.content} name='content' placeholder="Describe yourself here..."  rows="6" onChange={handleOnchange}> </textarea>
        </div>

        <div className="mb-3">
      <label className="text-center form-control border" style={{'width' : "100%" , 'cursor' : "pointer"}}>
        {image.name ? image.name : 'change image'}
        <input type="file" name="image"  accept="image/*" hidden onChange={(e)=>setImage(e.target.files[0])}/>
      </label>
      <div className="m-3 d-flex justify-content-center">
        {image?.name &&<img src={ URL.createObjectURL(image)} alt="product_photo" width={"200px"} height={"100px"}  className="img img-responsive "/>}
            { newsdata._id ? !image  && <img src={newsdata ? `https://deploymernnewsapp.vercel.app/api/v1/news/get-image/${newsdata._id}` : ""} style={{'width' : "200px" , 'height' : "100px"}}/> : null}
      </div>
    </div>
        <div className='d-flex d-flex justify-content-center mb-3'><button type="submit" className="btn btn-primary m-auto btn-clr" style={{'width' : "90%"}} onClick={handleOnsubmit}>Update News</button></div>
      </> : "loading..."}
        
    </div>
    </div>
  )
}

export default NewsUpdate
