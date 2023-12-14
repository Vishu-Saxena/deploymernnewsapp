import React from 'react'
import NewsCard2 from './subcomponent/NewsCard2';
import { useNewsContex } from '../context/AllnewsContex';

const NewsHome = () => {
  const {sports , science , entertainment , business , health , global} = useNewsContex();
    return (
        <>
        <div className='container-fluid mb-3'>
        <div className="row mt-3" >
          <h1 style={{"color" : '#ee6c02'}} > <span className='text-dark'> Spo</span>rts</h1>
          {sports&& sports.slice(0,8).map((news , indx)=>{
            return  <NewsCard2 key={indx} news = {news}/>
          }) }
          </div>
        <div className="row mt-3">
          <h1 style={{"color" : '#ee6c02'}}> <span className='text-dark'>Busi</span>ness</h1>
          {business && business.slice(0,8).map((news , indx)=>{
            return  <NewsCard2 key={indx} news = {news}/>
          }) }
          </div>
        <div className="row mt-3">
          <h1 style={{"color" : '#ee6c02'}}> <span className='text-dark'>Entert</span>ainment</h1>
          { entertainment && entertainment.slice(0,8).map((news , indx)=>{
            return  <NewsCard2 key={indx} news = {news}/>
          }) }
          </div>
        <div className="row mt-3">
          <h1 style={{"color" : '#ee6c02'}}><span className='text-dark'>Sci</span>ence</h1>
          {science && science.slice(0,8).map((news , indx)=>{
            return  <NewsCard2 key={indx} news = {news}/>
          }) }
          </div>
        <div className="row mt-3">
          <h1 style={{"color" : '#ee6c02'}}> <span className='text-dark'>U</span>SA</h1>
          { global && global.slice(0,8).map((news , indx)=>{
            return  <NewsCard2 key={indx} news = {news}/>
          }) }
          </div>
        </div>
        </>
      )
}

export default NewsHome
