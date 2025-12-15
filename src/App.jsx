
import { Route, Routes } from 'react-router'
import './App.css'
import { Home } from './pages/Home'
import { AddCard } from './pages/AddCard'
import { Topic } from './pages/Topic'
import '@fontsource/inter';

import { MyMenu } from './components/MyMenu'
import { Dashboard } from './pages/Dashboard'
import { useContext } from 'react'
import { MyAuthContext } from './context/AuthContext'

function App() {
const {hasAccess}=useContext(MyAuthContext)

  return (
    <div className='app'>
      <MyMenu/>
    
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/dashboard' element={hasAccess ? <Dashboard/> : <Home/>}/>
      <Route path='/topic/:id/:name' element={<Topic/>}/>
      <Route path='/addcard/:id/:name' element={hasAccess ?<AddCard /> : <Home/>}/>
    </Routes>
    </div>
  )
}

export default App
