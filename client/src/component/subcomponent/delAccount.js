import axios from 'axios';
import React, { useState } from 'react'
import { useAuthContext } from '../../context/AuthuserContext';
import { useNavigate } from 'react-router-dom';
import { useNewsContex } from '../../context/AllnewsContex';

const DelAccount = ({userType}) => {
  // const [del , setDel] = useState(false);
  const navigate = useNavigate();
  const {userDetails , setUser ,setToken} = useAuthContext();
  // getting show toast funcion
  const {toastfn , errortoastfn} = useNewsContex();
  // function to call the delete route
  const delaccount = async()=>{
    console.log("inside delete rotue");
    try {
      let res ='';
      if(userType==='admin'){
        res = await axios.delete(`https://deploymernnewsapp.vercel.app/api/v1/auth/delAdmin/${userDetails._id}`);
      }else{
        res = await axios.delete(`https://deploymernnewsapp.vercel.app/api/v1/auth//deluser/${userDetails._id}`);
      }
      if(res?.data?.success){
       toastfn("your account is deleted successfully.");
        localStorage.removeItem('user');
        setUser({});
        setToken('');
        navigate('/');
      }else{
        
        errortoastfn(res?.data ? res.data.message : "something is wrong.")
      }
    } catch (error) {
      console.log(error);
      errortoastfn("some internal error has occured. please try again later.");
    }
  }
  return (
    <div>
      <h3 className='text-center mt-5 mb-3'>Are you sure you sure you want to delete your account.</h3>
      <form onSubmit={(e)=>e.preventDefault()} >
      <div className='d-flex justify-content-center'>
        <button className='btn btn-primary me-2' style={{'backgroundColor' : "#ee6c02" , 'border' : 'none'}} onClick={()=> navigate('/dashboard/allnews')} >No</button>
        <button className='btn btn-dark ms-2' onClick={delaccount}>Yes</button>
      </div>
      </form>
    </div>
  )
}

export default DelAccount
