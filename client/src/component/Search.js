
import { useSearchContext } from '../context/SearchContext'

import { useNewsContex } from '../context/AllnewsContex';
import { useNavigate } from 'react-router-dom';
import NewsCard2 from './subcomponent/NewsCard2';
import VideoCard from './subcomponent/VideoCard';
import { TfiFaceSad } from "react-icons/tfi";

const Search = (props) => {
    const {search } = useSearchContext();
    const {sports , science , entertainment , business , health , global , others , videos} = useNewsContex();
    console.log(search);
    const navigate = useNavigate();
    if(!search){
      navigate('/');
      return;
  }
  
    
    console.log(sports , science , entertainment , business , health , global , others , videos);

    let newsSet = [];
    if(sports || science || entertainment || business || health || global || others || videos){
      newsSet = [...sports , ...business , ...entertainment , ...global , ...science ,...health , ...others ];
    }
    console.log(newsSet);

    const searchedNews1 = newsSet.filter((nws)=> nws.title.toLowerCase().includes(search.toLowerCase()));
    const searchedNews2 = newsSet.filter((nws)=> nws.category.toLowerCase().includes(search.toLowerCase()));
    const searchedNews3 = newsSet.filter((nws)=> nws.discription.toLowerCase().includes(search.toLowerCase()));

    const searchedNews = [...searchedNews1 , ...searchedNews2 , ...searchedNews3];
    console.log(searchedNews);

    // removing duplicacy from searched news list
    const ids = searchedNews.map(({ _id }) => _id);
    const filtered = searchedNews.filter(({ _id }, index) => !ids.includes(_id, index + 1));

    console.log(filtered);

    // filtering video news
    const videosnews1 = videos.filter((ele)=>ele.title.toLowerCase().includes(search.toLowerCase()));
    const videosnews2 = videos.filter((ele)=>ele.category.toLowerCase().includes(search.toLowerCase()));

    const videosnews = [...videosnews1 , ...videosnews2]
    console.log(videosnews);

     // removing duplicacy from videos searched news list
     const vids = videosnews.map(({ _id }) => _id);
     const videofiltered = videosnews.filter(({ _id }, index) => !vids.includes(_id, index + 1));
    
    let empty = filtered.length + videofiltered.length;

   
    
  return (
    <div className='container-fluid' style={{'minHeight' : "22rem"}}>
      <div className="row my-3">
        <h5>Showing results for <span style={{'color':'#fd7e14'}}  > {search} </span> </h5>

        {empty ? filtered && filtered.map((ele , index)=> <NewsCard2 key={index} news={ele}/> ) : <h3 className='text-center'> No News found for this search <TfiFaceSad className='mb-1' style={{'color':'#fd7e14'}} /> </h3> }
        {empty ? videofiltered && videofiltered.map((ele , index)=> <VideoCard key={index} vdo={ele}/> ) :"" }

      </div>
    </div>
  )
}

export default Search
