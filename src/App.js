import logo from './logo.svg';
import './App.css';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import Header from './Header';
import Library from './Library';
import {BrowserRouter,Routes,Route, Navigate} from 'react-router-dom';
import axios from 'axios';
import SavedData from './SavedData';
import { useUser } from "./UserProvider";
import { useRef } from 'react';


function ProtectedRoute({children}){
  const{getUser} = useUser();
  if(getUser && getUser.status == "success"){
    return children;
  }else{
    return(
    <Navigate to={"/login"}/>
    )
  }
}

function App() {
const audioRef = useRef();
const startPlayerHandler=()=>{
  audioRef.current.play();
}

const stopPlayerHandler=()=>{
  audioRef.current.pause();
}
  axios.interceptors.request.use(async(config)=>{
    config.headers['projectid'] = "f104bi07c490";
    return config;
  })

  return (
    <div>
      <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element ={<Home/>}/>
        <Route path="/SavedData" element={<SavedData/>}/>
        
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/library" element={<ProtectedRoute><Library/></ProtectedRoute>}/>
        

      </Routes>
      </BrowserRouter>
      {/*<div>
        <audio ref={audioRef} src='https://newton-project-resume-backend.s3.amazonaws.com/audio/64cf908947ae38c3e33a1994.mp3' controls/>
        <button onClick={startPlayerHandler}>Play</button>
        <button onClick={stopPlayerHandler}>pause</button>
      </div>*/}
    </div>
  );
}

export default App;