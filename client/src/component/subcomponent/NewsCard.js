import { Link } from "react-router-dom";
import "../../style/NewsCard.css"
// import {dumy}  from './images/news.jpg'
const NewsCard = (props) => {
    const {news} = props;
    const {title , description , urlToImage , url} = news;
    
  return (
    
      <div className=" col-lg-3 col-md-4 col-sm-6 col-12 mt-2">
        <Link to={url} target="_blank" style={{'color' : "black" , 'textDecoration' : "none"}}>
          <div className="card nwscrd">
              <img src={urlToImage ? urlToImage : './images/news.jpg' } className="card-img-top" alt="..." />

              <div className="card-body ">
                  <h5 className="card-title titletext">{title}</h5>
                  <p className="card-text descrip text-secondary">{description ? description.substring(0,70)+'...' : "Click to read more"}</p>
              </div>
          </div>
          </Link>
      </div>
  )
}

export default NewsCard
