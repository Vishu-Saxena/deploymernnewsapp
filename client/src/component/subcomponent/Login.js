import { useState } from 'react';
import '../../style/reglog.css';
import axios from 'axios';

import 'react-toastify/dist/ReactToastify.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthuserContext';
import { useNewsContex } from '../../context/AllnewsContex';

const Login = () => {
    // uselocation hook to check the url
    const {pathname} = useLocation();
    console.log(pathname);

    // state to handle registration details
    const[regUser , setReg] = useState({});
    const navigate = useNavigate();

    // function to handle onchange
    const handleOnchange = (e)=>{
        let {name , value} = e.target;
        setReg({...regUser , [name] : value});
        // console.log(regUser);
    }

    // getting setToken function
    const {setToken ,setUser} = useAuthContext();

    // getting show toast funcion
    const {toastfn , errortoastfn} = useNewsContex();
    

    // funtion to handle onclick event
    const handleOnclick = async(e)=>{
        e.preventDefault();
        try {
            let res = '';
      
            if(pathname === "/sign-in"){
                res = await axios.post('https://deploymernnewsapp.vercel.app/api/v1/auth/login' , {...regUser});
               console.log(res);
            }else{
                res = await axios.post('https://deploymernnewsapp.vercel.app/api/v1/auth//admin-login' , {...regUser});
               console.log(res);
      
            }
            
            if(res?.data?.success){
                console.log(res.data);
                // window.alert(res.data.message);
                toastfn(res.data.message);
                // storing data to localstorage and Authcontext
                localStorage.setItem('user' , JSON.stringify( {userDetails : res.data.userDetails , token : res.data.token}));
                setToken(res.data.token);
                setUser({...res.data.userDetails});
                navigate('/');
            }else if(res?.data?.message){
                // window.alert(res.data.message)
                errortoastfn(res.data.message)
            }else{
                // window.alert(pathname ==='/sign-in' ? "user not logged in" : "admin not logged in");
                errortoastfn(pathname ==='/sign-in' ? "user not logged in" : "admin not logged in");
            }
            
        } catch (error) {
            console.log(error);
            errortoastfn("Some internal error has occured. Please again later .")
        }
    }
  return (
    <div className="container-fluid blckbg" >
    <div className='row d-flex justify-content-center align-items-center' style={{'height' : "80vh"}}>
      <div className="col-sm-7 col-md-5 p-4 rounded-5 border-sn">
        <h3 className='text-center mb-3'>Sign-in  here </h3>
      <form onSubmit={handleOnclick}>
        <div className="mb-3">
            <input name='email' type="email" className="form-control" placeholder='Enter your email' onChange={handleOnchange}/>
        </div>
        <div className="mb-3">
            <input type="password" name='password' placeholder='enter strong password' className="form-control" onChange={handleOnchange}/>
        </div> 
        
         <div className='d-flex d-flex justify-content-center'><button type="submit" className="btn btn-primary m-auto btn-clr" style={{'width' : "90%"}}>Submit</button></div>
        </form>
        <p className='text-center pcolr mt-2'> <Link className='pcolr' to={pathname ==='/sign-in' ? "/admin-sign-in" :"/sign-in"}>{ pathname === "/sign-in"? "sign-in as admin" :'sign up as user' }</Link> </p>
      </div>
    </div>
    </div>
  )
}

export default Login
