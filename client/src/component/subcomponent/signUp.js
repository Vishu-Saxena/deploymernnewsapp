import React, { useState } from 'react'
import axios from 'axios';
import '../../style/reglog.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useNewsContex } from '../../context/AllnewsContex';

const SignUp = () => {
     // uselocation hook to check the url
    const location = useLocation();
    console.log(location.pathname);
    // state to handle registration details
    const[regUser , setReg] = useState({});
    const navigate = useNavigate();
    // function to handle onchange
    const handleOnchange = (e)=>{
        let {name , value} = e.target;
        setReg({...regUser , [name] : value});
        // console.log(regUser);
    }

    // getting show toast funcion
    const {toastfn , errortoastfn} = useNewsContex();
    
    // funtion to handle onclick event
    const handleOnclick = async(e)=>{
        e.preventDefault();
        if(regUser.country === "Select Your countary"){
            return errortoastfn("select the country name");
        }
        try {
            let res = '';
            if(location.pathname !== '/admin-sign-up'){
                console.log("in user fntion");
                 res = await axios.post('http://localhost:8080/api/v1/auth/register' , {...regUser});
            }else{
                console.log("in admin funtion");
                 res = await axios.post('http://localhost:8080/api/v1/auth/admin-register' , {...regUser});
            }
            console.log(res);
            if(res?.data?.success){
                console.log(res.data);
                toastfn(res.data.message);
                navigate( location.pathname ==='/admin-sign-up' ? "/admin-sign-in" : "/sign-in");
            }else if(res?.data?.message){
                errortoastfn( res.data.message)
            }else{
                errortoastfn(  location.pathname ==='/admin-sign-up' ? "Admin not registered" :"user not registered");
            }
            
        } catch (error) {
            console.log(error);
            errortoastfn("Some internal error has occured. Please again later .")
        }
    }
  return (
    <div className="container-fluid blckbg" >
    <div className='row d-flex justify-content-center align-items-center' style={{'height' : "80vh"}}>
      <div className="col-sm-9 col-md-6 p-4 rounded-5 border-sn">
        <h3 className='text-center mb-3'>Register here </h3>
      <form onSubmit={handleOnclick}>
        <div className="mb-3">
            <input name='email' type="email" className="form-control" placeholder='Enter your email' onChange={handleOnchange}/>
        </div>
        <div className="mb-3">
            <input type="text" name='name' className="form-control" placeholder='Enter your name' onChange={handleOnchange}/>
        </div>
        <div className="mb-3">
            <input type="password" name='password' placeholder='enter strong password' className="form-control" onChange={handleOnchange}/>
        </div> 
        <div className="mb-3">
            <select name='country' className="form-select" onChange={handleOnchange} >
                <option selected value={null}>Select Your countary</option>
                <option name='country' value="india">India</option>
                <option name='country' value="us">US</option>
                <option name='country' value="new zealand">New zealand</option>
                <option name='country' value="srilanka">Srilanka</option>
                <option name='country' value="nepal">Nepal</option>
                <option name='country' value="china">China</option>
                <option name='country' value="ukrain">Ukrain</option>
                <option name='country' value="iceland">Iceland</option>
            </select>
        </div> 
         <div className='d-flex d-flex justify-content-center'><button type="submit" className="btn btn-primary m-auto btn-clr" style={{'width' : "90%"}}>Submit</button></div>
         
        </form>
        <p className='text-center pcolr mt-2'> <Link className='pcolr' to={location.pathname ==='/admin-sign-up' ? "/sign-up" :"/admin-sign-up"}>{ location.pathname === "/admin-sign-up"? "sign-up as user" :'sign up as admin' }</Link> </p>
        {/* <p className='text-center pcolr mt-2'> <Link className='pcolr' to={'/sign-in'}>sign-up as user</Link> </p> */}
      </div>
      
    </div>
    </div>
  )
}

export default SignUp
