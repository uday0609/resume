import './App.css';
// import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from './components/pages/Header';
import Home from './components/pages/Home';
import Aboutus from './components/pages/Aboutus';
import Resume_tester from './components/pages/Resume_tester';
import Dashboard from './components/pages/Dashboard';
// import Main from './components/layout/Main';
import Main from './components/layout1/Main';
import Job_Posts from './components/pages/Job_Posts';
import Add_Jobs from './components/pages/Add_Jobs';
import JobForm from './components/pages/JobForm';
// import Footer from './components/pages/Footer';
import React,{useEffect} from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
function App() {
   useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);
  return (
    <BrowserRouter>
        <AppWithRouter/>
    </BrowserRouter>
  );
}
function AppWithRouter() {
  const location = useLocation();
  // console.log(location.pathname);
  const hideNavbarAndFooter = [ "/admin","/login"].some((path) =>
    location.pathname.startsWith(path)
  );
  console.log("Hide Navbar and Footer:", hideNavbarAndFooter); 
  return(
    <>
      {!hideNavbarAndFooter && <Header />}
      {/* <Header/> */}
      <Routes>
        <Route index element={<Home />} />
        <Route path='/about' element={<Aboutus />} />
        <Route path='/tester' element={<Resume_tester />} />
        <Route path="/admin" element={<Main />}>
          <Route index element={<Dashboard/>}/>
          {/* <Route path="home" element={<Home/>}/> */}
          <Route path="Home"element={<Dashboard />} />
          <Route path='Jobs' element={<Job_Posts/>}/>
           <Route path="add_job" element={<JobForm />} />
          {/* <Route path='Add_Jobs' element={<Add_Jobs/>}/> */}
          


        </Route>

      </Routes>
      

      {/* {!hideNavbarAndFooter && <Footer />} */}
    </>
  );
} 
export default App;
