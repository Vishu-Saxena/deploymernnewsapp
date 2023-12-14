import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNewsContex } from '../../context/AllnewsContex';

const Newcard = (props) => {

    const{news} = props;
    // console.log(props.news);

    // getting show toast funcion
  const {toastfn , errortoastfn} = useNewsContex();

    // funtion to delete news 
    const deleteNews = async(id)=>{
      // e.preventDefault();
      try {
        const res = await axios.delete(`https://deploymernnewsapp.vercel.app/api/v1/news/delete-news/${id}`);
        if(res?.data?.success){
          toastfn("news deleted successfuly");
          window.location.reload(false);
        }else{
          errortoastfn(res.data.message);
        }
      } catch (error) {
        console.log(error);
        errortoastfn("Some internal error has occured.")
      }
    }
  return (
    <div className="col-md-6 col-12 mt-2">
        <Link to={'/'} target="_blank" style={{'color' : "black" , 'textDecoration' : "none"}}>
          <div className="card nwscrd" style={{'height' : '20rem'}}>
              <img src={`https://deploymernnewsapp.vercel.app/api/v1/news/get-image/${news._id}`} className="card-img-top" alt="..." />

              <div className="card-body ">
                  <h5 className="card-title titletext">{news?.title ? news.title : ""}</h5>
                  <p className="card-text descrip text-secondary">{news?.discription ? news.discription.substring(0,70)+'...' : ""}</p>
              </div>
              <div className='d-flex justify-content-between p-2'>
                <Link to={`/dashboard/allnews/updatenews/${news._id}`}><button type="button" className="btn btn-dark crdbtn" style={{'backgroundColor' : "#ee6c02"}}>Update</button></Link>
                <Link> <button type="button" className="btn btn-dark crdbtn" onClick={()=>deleteNews(news._id )}>Delete</button></Link>
              </div>
          </div>
          </Link>
      </div>
  )
}

export default Newcard
