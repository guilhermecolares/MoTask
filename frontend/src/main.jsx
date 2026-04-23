import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import './index.css'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Profile from './pages/Profile.jsx'
import Create from './pages/Create.jsx'
import Tasks from './pages/Tasks.jsx'
import Schedule from './pages/Schedule.jsx'
import AuthPages from './components/AuthPages.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route index element={<Home />} />

          <Route path='tasks' element={
            <AuthPages>
              <Tasks />
            </AuthPages>
            }/>
          <Route path='create' element={
            <AuthPages>
              <Create />
            </AuthPages>
            }/>
          <Route path='schedule' element={
            <AuthPages>
              <Schedule />
            </AuthPages>
            }/>
        </Route>

        <Route path='profile' element={
          <AuthPages>
            <Profile />
          </AuthPages>
          }/>
        <Route path='login' element={<Login />}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)