//https://www.youtube.com/watch?v=-42K44A1oMA

import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home';
import CreateBooks from './pages/CreateBooks';
import ShowBook from './pages/ShowBook';
import EditBook from './pages/EditBook';
import DeleteBook from './pages/DeleteBook';
import Register from './pages/Register';
import Login from './pages/Login';
import FrontPage from './pages/FrontPage';


const App = () => {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/frontpage" element={<FrontPage />}/>
      <Route path='/' element={<Home />}/>
      <Route path='/books/create' element={<CreateBooks />}/>
      <Route path='books/details/:id' element={<ShowBook />}/>
      <Route path='books/edit/:id' element={<EditBook />}/>
      <Route path='books/delete/:id' element={<DeleteBook />}/>
    </Routes>
  )
}

export default App