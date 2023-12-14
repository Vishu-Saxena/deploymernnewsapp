import axios from 'axios';
import React, { useState } from 'react'
import { useAuthContext } from '../../context/AuthuserContext';
import { useNavigate } from 'react-router-dom';
import { useNewsContex } from '../../context/AllnewsContex';

const AddnewsForm = () => {
  const {userDetails} = useAuthContext();
  // state to maintain the state of inputes
  const[news , setNews] = useState({});
  // state to handle image input
  const[image , setImage] = useState('');
  // console.log(image);

  // getting show toast funcion
  const {toastfn , errortoastfn} = useNewsContex();

  const navigate = useNavigate();
    const handleOnchange = (e)=>{
      let {name , value} = e.target;
      setNews({...news , [name] : value});
      console.log(news);
    }
    const handleOnsubmit= async(e)=>{
      e.preventDefault();
      console.log("hadle submit");
      try {
        console.log(news , image);
        const newsData = new FormData()
        newsData.append("title", news.title);
        newsData.append("discription",news.discription);
        newsData.append("category", news.category);
        newsData.append("image", image);
        newsData.append("content", news.content);
        newsData.append("adminId" , userDetails._id);
        console.log("newsData",newsData);
        const res = await axios.post('https://deploymernnewsapp.vercel.app/api/v1/news/add-news' , newsData );
        if(res?.data?.success){
          toastfn("news added successfully");
          setNews({});
          setImage('');
          navigate('/dashboard/allnews');
          window.location.reload();
        }else{
          errortoastfn("news not added successfully");
        }
      } catch (error) {
        console.log(error);
        errortoastfn('internal error in adding news . please try again later.');
      }
      console.log(news , image);
    }
  return (
    <div className='row my-3'>
      <h2 className='text-center ms-1'>Add <span style={{'color' : "#ee6c02"}}> News </span></h2>
        <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Tittle</label>
            <input name='title' type="text"  className="form-control" onChange={handleOnchange} placeholder='Title of your news post...' required/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label"> Discription</label>
            <input type="text" name='discription' className="form-control" placeholder='not more than 50 words...' onChange={handleOnchange} required />
        </div> 
        <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Category</label>
            <select name='category' className="form-select" required onChange={handleOnchange} >
                <option selected name="category" > Select Category </option>
                <option name='category' value="sports">Sports</option>
                <option name='category' value="international">International</option>
                <option name='category' value="science">Science</option>
                <option name='category' value="health">Health</option>
                <option name='category' value="entertainment">Entertainment</option>
                <option name='category' value="business">Business</option>
                <option name='category' value="others">Others</option>
            </select>
        </div> 
        <div className="mb-3">
            <label  className="form-label">News Content</label>
            <textarea required className="form-control" name='content' placeholder="Describe yourself here..."  rows="6" onChange={handleOnchange}> </textarea>
        </div>

        <div className="mb-3">
      <label className="text-center form-control border" style={{'width' : "100%" , 'cursor' : "pointer"}}>
        {/* {image.name ? image.name : 'upload image'} */}{image?.name ? image.name : "upload image"}
      <input type="file" name="image"  accept="image/*" hidden onChange={(e)=>setImage(e.target.files[0])}/>
      </label>
      <div className="m-3 d-flex justify-content-center">
        {image?.name &&<img src={ URL.createObjectURL(image)} alt="product_photo" width={"200px"} height={"100px"} className="img img-responsive "/>}
      </div>
    </div>
        <div className='d-flex d-flex justify-content-center'><button type="submit" className="btn btn-primary m-auto btn-clr" style={{'width' : "90%"}} onClick={handleOnsubmit}>Add News</button></div>
    </div>
  )
}

export default AddnewsForm
