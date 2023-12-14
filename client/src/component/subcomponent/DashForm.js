import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthuserContext';
import { useNewsContex } from '../../context/AllnewsContex';

const DashForm = ({userDetails}) => {
    // state to handle registration details
    const[updateUser , setUpdateuser] = useState(userDetails);
    const {token} = useAuthContext();
    const navigate = useNavigate();
    // getting show toast funcion
  const {toastfn , errortoastfn} = useNewsContex();
     // function to handle onchange
     const handleOnchange = (e)=>{
        let {name , value} = e.target;
        setUpdateuser({...updateUser , [name] : value});
        console.log(updateUser);
    }

    // function to handle onSubmit 
    const handleOnsubmit = async(e)=>{
      e.preventDefault();
      try {
        const res = await axios.put('https://deploymernnewsapp.vercel.app/api/v1/auth/update-user' ,  {...updateUser} );
        if(res?.data?.success){

          const prevData = localStorage.getItem("user")
          localStorage.setItem('user' , JSON.stringify({ token :token  , userDetails : updateUser}));
          toastfn("Details updated successfully");
          window.location.reload();
          // navigate('/dashboard');
        }
      } catch (error) {
        console.log(error);
        errortoastfn("Detais cannot be updated due to some internal errors")
      }
    }


  return (
    <div>
      <div className="row d-flex justify-content-center">
        <div className="col-md-8">
            <h3 className='text-center my-3'> Personal <span style={{'color' : "#ee6c02"}}> Details </span>  </h3>
            <form className='pb-3' onSubmit={handleOnsubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" class="form-label">Email address</label>
                    <input name='email' type="email" value={updateUser.email} className="form-control" onChange={handleOnchange} placeholder='Enter your email'/>
                </div>
                <div className="mb-3">
                 <label htmlFor="exampleFormControlInput1" class="form-label"> Your Name</label>
                    <input type="text" name='name' value={updateUser.name} className="form-control" placeholder='Enter your name' onChange={handleOnchange} />
                </div> 
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" class="form-label">Your Countary</label>
                    <select name='country' className="form-select" onChange={handleOnchange} >
                        <option selected value={updateUser.country}>{updateUser.country}</option>
                        <option name='country' value="India">India</option>
                        <option name='country' value="US">US</option>
                        <option name='country' value="New Zealand">New zealand</option>
                        <option name='country' value="Srilanka">Srilanka</option>
                        <option name='country' value="Nepal">Nepal</option>
                        <option name='country' value="China">China</option>
                        <option name='country' value="Ukrain">Ukrain</option>
                        <option name='country' value="Iceland">Iceland</option>
                    </select>
                </div> 
                <div className='d-flex d-flex justify-content-center'><button type="submit" className="btn btn-primary m-auto btn-clr" style={{'width' : "90%"}}>Update</button></div>
                
            </form>
        </div>
      </div>
    </div>
  )
}

export default DashForm
