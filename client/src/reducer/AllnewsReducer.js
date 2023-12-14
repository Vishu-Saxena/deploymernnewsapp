const AllnewsReducer = (state ,action)=>{
    console.log(state , action);

    switch (action.type) {
        case 'ALL':
            return{
                ...state,
                sports : action.payload.filter((news)=> news.category === "sports" ),
                science : action.payload.filter((news)=> news.category === "science" ),
                entertainment : action.payload.filter((news)=> news.category === "entertainment" ),
                business : action.payload.filter((news)=> news.category === 'business'),
                global : action.payload.filter((news)=> news.category === 'international'),
                health : action.payload.filter((news)=> news.category === 'science'),
                others : action.payload.filter((news)=> news.category === 'others')

            }
        case "ALLVIDEO":
            return{
                ...state,
                videos : action.payload
            }
            case 'HEADLINE':
                return{
                    ...state , 
                    headlines : action.payload
                }
        default:
            return state;
    }
}
export default AllnewsReducer;