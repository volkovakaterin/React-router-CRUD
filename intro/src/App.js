import './index.css';
import {Routes, Route} from'react-router-dom';
import React, { useState } from 'react';
import Home from './components/Home';
import Post from './components/Post';
import Change from './components/Change';
import Created from './components/Created';

export default function App() {
  const [lookID, setLookID] = useState('');
  const lookPostID =(id)=>{
setLookID(id);
  }
      return (
        
          <>
          <Routes>     
              <Route path="/" element={<Home onLookPost = {lookPostID}/>} /> 
              <Route path="/post/new" element={<Created/>} />
              <Route path= {`/post/${lookID}`} element={<Post lookID = {lookID}/>} />  
              <Route path= {`/post/${lookID}/change`} element={<Change changeID = {lookID}/>} /> 

        </Routes>         
          </>
      )
    }
  
