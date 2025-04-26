import React, { useEffect } from 'react'
import { useAuthStore } from './stores/useAuthStore'
import { Navigate, Route, Routes } from 'react-router-dom';
import Root from './pages/Root';
import Home from './pages/Home';
import Project from './pages/Project';

const App = () => {

  const { user, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [])

  return (
    <div>
      <Routes>
        <Route path='/' element={!user ? <Root /> : <Navigate to='/home'/>} />
        <Route path='/home' element={user ? <Home /> : <Navigate to='/'/>} />
        <Route path='/:projectId' element={user ? <Project /> : <Navigate to='/'/>} />
      </Routes>
    </div>
  )
}

export default App