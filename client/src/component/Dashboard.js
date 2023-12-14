import React, { useEffect } from 'react'
import { useAuthContext } from '../context/AuthuserContext'
import UserDash from './UserDash';
import AdminDash from './AdminDash';
import { useNavigate } from 'react-router-dom';
import { useNewsContex } from '../context/AllnewsContex';

const Dashboard = () => {
    const{userDetails , token} = useAuthContext();
    const navigate = useNavigate();
    // getting show toast funcion
  const { errortoastfn} = useNewsContex();
    console.log(userDetails , token);
    useEffect(()=>{
        // checking whether user is logged in or not
        if(!token){
           errortoastfn('Your are not authorised user . please first sign-in/sign-up');
            navigate('/sign-in');
        }
    })
  return (
    <>
    { userDetails && userDetails.admin ? <AdminDash/> : <UserDash/>}
    </>
  )
}

export default Dashboard
