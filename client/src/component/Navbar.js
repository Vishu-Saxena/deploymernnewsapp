import { Link, useLocation } from 'react-router-dom'
import '../style/NewsCard.css';
import { useSearchContext } from '../context/SearchContext';
import { useAuthContext } from '../context/AuthuserContext';
import { FaRegAddressCard } from "react-icons/fa";

const Navbar = () => {
  const pathname = useLocation().pathname;
  console.log(pathname);

  const{setSearch} = useSearchContext();

  const {token , setUser ,setToken} = useAuthContext();
  console.log(token);

  const logout = ()=>{
    localStorage.removeItem("user");
    setUser({});
    setToken('')
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid" style={{'color' : "#fd7e14"}}>
                <Link className={`navbar-brand ${pathname === "/" ? 'active' : null}`} to={'/'} style={{'color' : "#fd7e14"}} > <img src="./images/logo.png" alt="" className='logo'/> </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <Link className={`nav-link ${pathname === "/" ? 'active' : null}`} aria-current="page" to={'/'}>Home</Link>
                    </li>
                    <li className="nav-item">
                    <Link className={`nav-link ${pathname === "/headlines" ? 'active' : null}`} to={'/headlines'} >Headlines</Link>
                    </li>
                    <li className="nav-item">
                    <Link className={`nav-link ${pathname === "/videos" ? 'active' : null}`} aria-current="page" to={'/videos'}>Video</Link>
                    </li>
                    <li class="nav-item dropdown"><a className={`nav-link dropdown-toggle  ${["/sports" , "/science" , "/Usa", "/health" , "/entertainment"].includes(pathname) ? "active" : null}`} href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">  Categories </a>
                      <ul class="dropdown-menu bg-dark">
                      <li className="nav-item">
                    <Link className={`nav-link ${pathname === "/sports" ? 'active' : null}`}to={'/sports'} >Sports</Link>
                    </li>
                    <li className="nav-item">
                    <Link className={`nav-link ${pathname === "/science" ? 'active' : null}`} to={'/science'} >Science</Link>
                    </li>
                    <li className="nav-item">
                    <Link className={`nav-link ${pathname === "/Usa" ? 'active' : null}`} to={'/Usa'} > USA </Link>
                    </li>
                    <li className="nav-item">
                    <Link className={`nav-link ${pathname === "/health" ? 'active' : null}`} to={'/health'} >Health</Link>
                    </li>
                    <li className="nav-item">
                    <Link className={`nav-link ${pathname === "/entertainment" ? 'active' : null}`} to={'/entertainment'} >Entertainment</Link>
                    </li>
                    <li className="nav-item">
                    <Link className={`nav-link ${pathname === "/others" ? 'active' : null}`} to={'/others'} >Others</Link>
                    </li>
                      </ul>
                    </li>
                    
                    {!token ? <> <li className="nav-item">
                    <Link className={`nav-link ${pathname === "/sign-up" ? 'active' : null}`} to={'/sign-up'} >sign-up</Link>
                    </li>
                    <li className="nav-item">
                    <Link className={`nav-link ${pathname === "/sign-in" ? 'active' : null}`} to={'/sign-in'} >sign-in</Link>
                    </li></> : <><li class="nav-item dropdown"><a className={`nav-link dropdown-toggle ${pathname === "/dashboard" ? 'active' : null}`} href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"> <FaRegAddressCard className='dashicn' /> </a>
                      <ul class="dropdown-menu bg-dark">
                        <li className="dropdown-item nav-item"><Link className={`nav-link`} to={'/dashboard'} > Dashboard </Link></li> 
                        <li className="dropdown-item nav-item" onClick={logout}><Link className={`nav-link`} to={'/sign-in'} >Log-out</Link></li> 
                      </ul>
                    </li> </>}
                    
                </ul>
                <form className="d-flex" role="search" onSubmit={(e)=>e.preventDefault()}>
                    <input className="form-control me-2"  name='search' type="search" placeholder="Search" aria-label="Search" onChange={ (e)=> setSearch(e.target.value)} />
                    <Link to={'/search'} className="btn outline" type="submit">Search</Link>
                </form>
                </div>
            </div>
        </nav>
    </div>
  )
}

export default Navbar
