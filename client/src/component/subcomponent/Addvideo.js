import React, { useState } from 'react'
import { useNewsContex } from '../../context/AllnewsContex';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthuserContext';
import axios from 'axios';


const Addvideo = () => {
    const {userDetails} = useAuthContext();
    const {_id} = userDetails;
    // state to maintain the state of inputes
  const[news , setNews] = useState({});

  // getting show toast funcion
  const {toastfn , errortoastfn,setNwst , setVds} = useNewsContex();

  const navigate = useNavigate();

    const handleOnchange = (e)=>{
        let {name , value} = e.target;
        setNews({...news , [name] : value});
    }
    const handleOnsubmit= async(e)=>{
        e.preventDefault();
        console.log("hadle submit");
        try {
          const res = await axios.post('https://deploymernnewsapp.vercel.app/api/v1/video/addvideo' ,{ ...news ,adminId: _id} );
          if(res.status === 203){
             errortoastfn("required fields are not filled properly");
             return;
            };
          if(res?.data?.success){
            toastfn("Video added successfully");
            setNews({});
            setVds("changed");//this state is important because this state is working as dependency of useEffect hook to get the vidoes in newscontext
            navigate('/videos');
            // window.location.reload();
          }else{
            if(res.status === 202){
              errortoastfn("Video already exist.");
              return;
            }
            errortoastfn("Video not added successfully");
            return;
          }
        } catch (error) {
          console.log(error);
          errortoastfn('internal error in adding news . please try again later.');
        }
      }

  return (
    <div className='row my-3'>
      <h2 className='text-center ms-1'>Add <span style={{'color' : "#ee6c02"}}> Video </span></h2>
        <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Tittle</label>
            <input name='title' value={news.title}  type="text"  className="form-control" onChange={handleOnchange} placeholder='Title of your news post...' required/>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Category</label>
            <select name='category'  className="form-select" required onChange={handleOnchange} >
                <option selected name="category" > Select Category </option>
                <option name='category' value="sports">Sports</option>
                <option name='category' value="international">International</option>
                <option name='category' value="science">Science</option>
                <option name='category' value="health">Health</option>
                <option name='category' value="entertainment">Entertainment</option>
                <option name='category' value="business">Business</option>
                <option name='category' value="current affairs">Current Affairs</option>
            </select>
        </div> 

        <div className="mb-3">
        <label htmlFor="exampleFormControlInput1"  className="form-label">Video Link</label>
            <input name='video' type="text" value={news.video}  className="form-control" onChange={handleOnchange} placeholder='Provide the link of video.' required/>
        </div>
        <div className='d-flex d-flex justify-content-center'><button type="submit" className="btn btn-primary m-auto btn-clr" style={{'width' : "90%"}} onClick={handleOnsubmit}>Add News</button></div>
    </div>
  )
}

export default Addvideo
