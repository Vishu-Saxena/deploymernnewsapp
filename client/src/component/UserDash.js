import React from 'react'
import { useAuthContext } from '../context/AuthuserContext';
import DashForm from './subcomponent/DashForm';
import { Link, useLocation } from 'react-router-dom';
import DelAccount from './subcomponent/delAccount';
import Readlater from './subcomponent/Readlater';

const UserDash = () => {
    const{userDetails , token} = useAuthContext();
    console.log(userDetails , token);
    const {pathname} = useLocation();
    return (
        <div className='container-fluid' style={{'minHeight' : "60vh"}}>
      <div className="row">
        <div className="col-md-4 my-3 d-flex flex-column justify-content-center menuhght fntsz"> 
          <ul className="list-group">
            <Link to={'/dashboard'} style={{'textDecoration' : "none"}}><li className={`list-group-item ${pathname === '/dashboard'? "active activeli" : ''}`} aria-current="true">Profile</li></Link>
            <Link to={'/dashboard/readlater'} style={{'textDecoration' : "none"}}><li className={`list-group-item ${pathname === '/dashboard/readlater'? "active activeli" : ''}`}>Read Latter</li></Link>
            <Link to={'/dashboard/delete'} style={{'textDecoration' : "none"}}><li className={`list-group-item ${pathname === '/dashboard/delete'? "active activeli" : ''}`}>Delete Account</li></Link>
          </ul>
        </div>
        <div className={`col-md-8 border fntsz ${pathname !== '/dashboard'? "d-none" : ''}`}><DashForm userDetails={userDetails} type={"user"} /></div>
        <div className={`col-md-8 border fntsz  ${pathname !== '/dashboard/readlater' ? "d-none" : ''}`}><Readlater type={"user"}/></div>
        <div className={`col-md-8 border fntsz  ${pathname !== '/dashboard/delete' ? "d-none" : ''}`}><DelAccount userType={"user"}/></div>
      </div>
      
    </div>
    )
}

export default UserDash
