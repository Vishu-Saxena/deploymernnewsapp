import { Link } from "react-router-dom"
import { useNewsContex } from "../../context/AllnewsContex";
import axios from "axios";

const VideoCard2 = (props) => {
    const { video , _id} = props.vdo;
    const type = props.type;
     // getting show toast funcion
     const {toastfn , errortoastfn, setVds} = useNewsContex();
    const deleteNews = async()=>{
        try {
            const res = await axios.delete(`http://localhost:8080/api/v1/video/deleteVideo/${_id}`);
            if(res.data.success){
                toastfn("Video deleted successfully.");
                setVds("changed");
                return;
            }else if(res?.data?.message){
                errortoastfn(res.data.message);
            }
        } catch (error) {
            console.log(error);
            errortoastfn("Some internal error occured . please try again latter");
        }
    }
  return (
    <div className= {!type ? 'col-lg-4 col-sm-6 col-12 mt-2' : "col-md-6 col-12 mt-2"}>
        <div className="card vdcard">
            <iframe src={`${video}`} frameborder="0" className='vdiframe' title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </div>
        <div className='d-flex justify-content-between p-2'>
            <Link to={`/dashboard/allnews/updatevideo/${_id}`}><button type="button" className="btn btn-dark crdbtn" style={{'backgroundColor' : "#ee6c02" , 'display' : "none"}}>Update</button></Link>
            <Link> <button type="button" className="btn btn-dark crdbtn" onClick={()=>deleteNews( _id)}>Delete</button></Link>
        </div>
    </div>
  )
}
export default VideoCard2
