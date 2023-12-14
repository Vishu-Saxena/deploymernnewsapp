import React from 'react'
import { useNewsContex } from '../../context/AllnewsContex'
import VideoCard from './VideoCard';

const Videos = () => {

    const{videos} = useNewsContex();
    console.log(videos);
  return (
    <div className='container-fluid my-3'>
        <h1 style={{"color" : '#ee6c02'}}>{ <> <span className='text-dark'>Video</span> News</> } </h1>
        <div className="row">
        {!videos ? <h5 className='text-center'> Loading... </h5>  : !videos.length ? <h3 className='text-center mt-4'>No news has been uploaded .</h3> : videos.map((ele)=>  <VideoCard className="my-2" vdo={ele}/> )}
        {/* {!videos ? <h5 className='text-center'> Loading... </h5>  : !videos.length ? <h3 className='text-center mt-4'>No news has been uploaded .</h3> : videos.map((ele)=>  <VideoCard className="my-2" vdo={ele}/> )} */}

        </div>
    </div>
  )
}

export default Videos
