// import React,{useState} from 'react';
import './App.css';
import { BrowserRouter as Router, Route,Routes } from "react-router-dom"
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Task from './pages/Task/task';
import Edit from './pages/Task/editTask';


function App() {

  // const [currentForm,setCurrentForm] =useState("login")

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/register'  element={<Register/>} />
          <Route path='/login'  element={<Login/>} />
          <Route path='/'  element={<Login/>} />
          <Route path='/task'  element={<Home/>} />
          <Route path='/home'  element={<Task/>} />
          <Route path='/edit'  element={<Edit/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
