import { useLocation, useNavigate } from 'react-router-dom';
import { useNewsContex } from '../context/AllnewsContex';
import '../style/News.css'
import {useState } from 'react';
import NewsCard2 from './subcomponent/NewsCard2';

const News = () => {
    
    const path = useLocation().pathname;
    const category = path.split('/')[1];
    const[newses , setNewses] = useState([]);
    console.log(newses);
    const {sports , science , entertainment , business , health , global ,headlines , others} = useNewsContex();
    let NewsToShow = [];
    switch (path) {
      case '/sports':
        NewsToShow = sports;
        break;
      case '/business':
        NewsToShow = business;
        break;
      case '/science':
        NewsToShow = science;
        break;
      case '/entertainment':
        NewsToShow = entertainment;
        break;
      case '/Usa':
        NewsToShow = global;
        break;
      case '/health':
        NewsToShow = health;
        break;
      case '/others':
        NewsToShow = others;
        break;
      default:
        NewsToShow = [...headlines , ...science];
        break;
    }
    console.log(NewsToShow);
  return (
    <div className='container-fluid my-3'>
      <h1 style={{"color" : '#ee6c02' , 'textTransform' : category === "Usa" ? "uppercase" : "capitalize"}}>{ <> <span className='text-dark'>{category.substring(0,category.length/2)}</span>{category.substring(category.length/2 , category.length)} </> } </h1>
      <div className="row">
        {NewsToShow.map((news , indx)=>{
          return <NewsCard2  key={indx} news = {news}/>
        })}
      </div>
    </div>
  )
}
export default News
