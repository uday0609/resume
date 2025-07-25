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
import Candidates from './components/pages/Candidates';
import Vacancy from './components/pages/Vacancy';
import Footer from './components/pages/Footer';
import React,{useEffect,useState} from 'react';
import FloatingButton from './components/pages/FloatingButton';
import FAQBotModal from './components/pages/FAQBotModal'
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
    const [botOpen, setBotOpen] = useState(false);
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
        <Route path='/vacancies' element={<Vacancy />} />
        <Route path="/admin" element={<Main />}>
          <Route index element={<Dashboard/>}/>
          {/* <Route path="home" element={<Home/>}/> */}
          <Route path="Home"element={<Dashboard />} />
          <Route path='Jobs' element={<Job_Posts/>}/>
          <Route path='Candidates' element={<Candidates/>}/>
           <Route path="add_job" element={<JobForm />} />
        
        </Route>

      </Routes>
      {!hideNavbarAndFooter && <Footer />}
       <FloatingButton onClick={() => setBotOpen(true)} />
      <FAQBotModal isOpen={botOpen} onClose={() => setBotOpen(false)} />
    </>
  );
} 
export default App;
