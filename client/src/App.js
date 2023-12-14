import Home from "./component/Home";
import Navbar from "./component/Navbar";
import "./App.css"
import { Route, Routes } from "react-router-dom";

import News from "./component/News";
import Search from "./component/Search";
import Footer from "./component/Footer";
import SignUp from "./component/subcomponent/signUp";
import Login from "./component/subcomponent/Login";
import AdminDash from "./component/AdminDash";
import Dashboard from "./component/Dashboard";
import NewsUpdate from "./component/NewsUpdate";
import DetailnedNews from "./component/DetailnedNews";
import Videos from "./component/subcomponent/Videos";
import axios from "axios";

function App() {
  // const {generalNews , name} = useNewsContex();
  // const Enews = useEntertainmentNews();
  // const usa = useUsaNews();
  // const sports = useSportNews();
  // const science = useScienceNews();
  // const Busines = useBusinesContext();
  // // console.log(generalNews , Enews , usa , sports ,science , Busines);
  axios.defaults.withCredentials= true;
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/sports" element={<News/>}/>
      <Route path="/business" element={<News/>}/>
      <Route path="/Usa" element={<News/>}/>
      <Route path="/entertainment" element={<News/>}/>
      <Route path="/headlines" element={<News/>}/>
      <Route path="/videos" element={<Videos/>}/>
      <Route path="/Science" element={<News/>}/>
      <Route path="/health" element={<News/>}/>
      <Route path="/others" element={<News/>}/>
      <Route path="/search" element={<Search/>}/>
      <Route path="/sign-up" element={<SignUp/>}/>
      <Route path="/sign-in" element={<Login/>}/>
      <Route path="/admin-sign-in" element={<Login/>}/>
      <Route path="/admin-sign-up" element={<SignUp/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/dashboard/readlater" element={<Dashboard/>}/>
      <Route path="/dashboard/add-itm" element={<Dashboard/>} />
      <Route path="/dashboard/add-video" element={<Dashboard/>} />
      <Route path="/dashboard/delete" element={<Dashboard/>} />
      <Route path="/dashboard/allnews" element={<Dashboard/>} />
      <Route path="/dashboard/allvideos" element={<Dashboard/>} />
      <Route path="/dashboard/allnews/updatenews/:id" element={<NewsUpdate/>} />
      <Route path="/news/:category/:id" element={<DetailnedNews/>}/>
      <Route path="*" element={<Home/>}/>
    </Routes>
    <Footer/>
    </>
  );
}

export default App;
