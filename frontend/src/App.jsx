import React, { useEffect } from 'react'
import { useAuthStore } from './stores/useAuthStore'
import { Navigate, Route, Routes } from 'react-router-dom';
import Root from './pages/Root';
import Dashboard from './pages/Dashboard';
import TaskManagement from './pages/TaskManagement';

const App = () => {

  const { user, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [])

  return (
    <div>
      <Routes>
        <Route path='/' element={!user ? <Root /> : <Navigate to='/dashboard'/>} />
        <Route path='/dashboard' element={user ? <Dashboard /> : <Navigate to='/'/>} />
        <Route path='/tasks' element={user ? <TaskManagement /> : <Navigate to='/'/>} />
      </Routes>
    </div>
  )
}

export default App