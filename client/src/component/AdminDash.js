import { useAuthContext } from '../context/AuthuserContext'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import DashForm from './subcomponent/DashForm';
import AddnewsForm from './subcomponent/AddnewsForm';
import AdminNews from './subcomponent/AdminNews';
import DelAccount from './subcomponent/delAccount';
import '../style/admindashi.css';
import Readlater from './subcomponent/Readlater';
import Addvideo from './subcomponent/Addvideo';
import Adminvideos from './subcomponent/Adminvideos';

const AdminDash = () => {
    const{userDetails , token} = useAuthContext();
    console.log(userDetails , token);
    
    const {pathname} = useLocation();
    console.log(pathname);
    // console.log(pathname);
  return (
    <div className='container-fluid' style={{'minHeight' : "60vh"}}>
      <div className="row">
        <div className="col-md-4 my-3  d-flex flex-column justify-content-center menuhght fntsz"> 
          <ul className="list-group">
            <Link to={'/dashboard'} style={{'textDecoration' : "none"}}><li className={`list-group-item ${pathname === '/dashboard'? "active activeli" : ''}`} aria-current="true">Profile</li></Link>

            <Link to={'/dashboard/add-itm'} style={{'textDecoration' : "none"}} ><li className={`list-group-item ${pathname === '/dashboard/add-itm'? "active activeli" : ''}`}>Add News</li></Link>

            <Link to={'/dashboard/add-video'} style={{'textDecoration' : "none"}} ><li className={`list-group-item ${pathname === '/dashboard/add-video'? "active activeli" : ''}`}>Add video</li></Link>

            <Link to={'/dashboard/allnews'} style={{'textDecoration' : "none"}}><li className={`list-group-item ${pathname === '/dashboard/allnews'? "active activeli" : ''}`}>All News</li></Link>
            <Link to={'/dashboard/allvideos'} style={{'textDecoration' : "none"}}><li className={`list-group-item ${pathname === '/dashboard/allvideos'? "active activeli" : ''}`}>All Videos</li></Link>

            <Link to={'/dashboard/readlater'} style={{'textDecoration' : "none"}}><li className={`list-group-item ${pathname === '/dashboard/readlater'? "active activeli" : ''}`}>Read Later</li></Link>

            <Link to={'/dashboard/delete'} style={{'textDecoration' : "none"}}><li className={`list-group-item ${pathname === '/dashboard/delete'? "active activeli" : ''}`}>Delete Account</li></Link>
          </ul>
        </div>
        <div className={`col-md-8 fntsz ${pathname !== '/dashboard'? "d-none" : ''}`}><DashForm userDetails={userDetails} /></div>
        <div className={`col-md-8 fntsz  ${pathname !== '/dashboard/add-itm' ? "d-none" : ''}`}><AddnewsForm/></div>
        <div className={`col-md-8 fntsz  ${pathname !== '/dashboard/add-video' ? "d-none" : ''}`}> <Addvideo/></div>
        <div className={`col-md-8 border fntsz ${pathname !== '/dashboard/allnews' ? "d-none" : ''}`}><AdminNews/></div>
        <div className={`col-md-8 border fntsz ${pathname !== '/dashboard/allvideos' ? "d-none" : ''}`}><Adminvideos/></div>
        <div className={`col-md-8 border fntsz ${pathname !== '/dashboard/readlater' ? "d-none" : ''}`}> <Readlater type={"admin"}/> </div>
        <div className={`col-md-8 fntsz  ${pathname !== '/dashboard/delete' ? "d-none" : ''}`}><DelAccount/></div>
      </div>
      
    </div>
  )
}

export default AdminDash
