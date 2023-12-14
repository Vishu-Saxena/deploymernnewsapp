import React from 'react'
import Headline from './subcomponent/Headline'
import NewsHome from './NewsHome'
import { useAuthContext } from '../context/AuthuserContext'
// import { useAuthContext } from '../context/AuthuserContext'

const Home = () => {
  const {userDetails} = useAuthContext();
  console.log(userDetails);
  return (
    <>
      <Headline/>
      <NewsHome/>
    </>
  )
}

export default Home
