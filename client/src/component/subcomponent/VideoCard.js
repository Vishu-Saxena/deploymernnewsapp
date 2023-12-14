import '../../style/video.css'

const VideoCard = (props) => {
    const {title ,  video} = props.vdo;
    const type = props.type;
  return (
    <div className= {!type ? 'col-lg-4 col-sm-6 col-12 mt-2' : "col-md-6 col-12 mt-2"}>
            <div className="card vdcard">
                <iframe src={`${video}`} frameborder="0" className='vdiframe' title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>
        </div>
  )
}

export default VideoCard
